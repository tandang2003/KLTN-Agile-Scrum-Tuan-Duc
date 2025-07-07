package com.kltn.server.service.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.resource.ResourceOfSprintResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.schedular.SprintScheduler;
import com.kltn.server.service.EmailService;
import com.kltn.server.service.entity.relation.WorkspacesUsersProjectsService;
import com.kltn.server.service.mongo.ProjectMongoService;
import com.kltn.server.util.RoleType;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {
  private final ProjectMapper projectMapper;
  private final TopicMapper topicMapper;
  private final com.kltn.server.repository.entity.ProjectRepository projectRepository;
  private final WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
  private final UserService userService;
  private final RoleService roleInit;
  private final SprintService sprintService;
  private final EmailService emailService;
  private final ProjectMongoService projectMongoService;
  private final ChangeLogMapper changeLogMapper;
  private final ResourceMapper resourceMapper;
  private ProjectSprintService projectSprintService;
  @Value("${verify.invite-project-link}")
  private String link;
  private final WorkspacesUsersProjectsService workspacesUsersProjectsService;
  private final SprintScheduler sprintScheduler;

  @Autowired
  public ProjectService(SprintScheduler sprintScheduler, ProjectSprintService projectSprintService,
      WorkspacesUsersProjectsService workspacesUsersProjectsService,
      ProjectMongoService projectMongoService, EmailService emailService, RoleService roleInit,
      UserService userService, TopicMapper topicMapper, ProjectMapper projectMapper,
      WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository,
      com.kltn.server.repository.entity.ProjectRepository projectRepository,
      SprintService sprintService, ChangeLogMapper changeLogMapper, ResourceMapper resourceMapper) {
    this.projectMongoService = projectMongoService;
    this.sprintScheduler = sprintScheduler;
    this.roleInit = roleInit;
    this.topicMapper = topicMapper;
    this.projectMapper = projectMapper;
    this.projectRepository = projectRepository;
    this.userService = userService;
    this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    this.emailService = emailService;
    this.workspacesUsersProjectsService = workspacesUsersProjectsService;
    this.sprintService = sprintService;
    this.changeLogMapper = changeLogMapper;
    this.projectSprintService = projectSprintService;
    this.resourceMapper = resourceMapper;
  }

  // @SendKafkaEvent(topic = "project-log")
  @Transactional
  public ApiResponse<ProjectResponse> createProject(ProjectCreationRequest creationRequest) {
    WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
        .workspaceId(creationRequest.workspaceId())
        .userId(creationRequest.userId())
        .build();

    WorkspacesUsersProjects workspacesUsersProjects = workspacesUsersProjectsRepository.findById(workspacesUsersId)
        .orElseThrow(
            () -> AppException.builder()
                .error(
                    Error.NOT_FOUND)
                .build());

    if (workspacesUsersProjects.getProject() != null) {
      throw AppException.builder()
          .error(Error.ALREADY_EXISTS)
          .build();
    }
    var project = projectMapper.toEntity(creationRequest);
    var savedProject = projectRepository.save(project);

    Workspace workspace = workspacesUsersProjects.getWorkspace();
    List<Sprint> sprints = workspace.getSprints();
    if (sprints != null && !sprints.isEmpty()) {
      projectSprintService.save(savedProject.getId(), sprints.stream()
          .map(Sprint::getId)
          .toList());
      sprints.forEach(sprint -> {
        if (sprint.getDtEnd() != null) {
          sprintScheduler.scheduleSprintWithProject(sprint.getId(), savedProject.getId(),
              LocalDateTime.ofInstant(sprint.getDtEnd(),
                  ZoneId.of("Asia/Ho_Chi_Minh")));
        }
      });
    }
    workspacesUsersProjects.setProject(savedProject);
    workspacesUsersProjects.setRole(roleInit.getRole(RoleType.LEADER.getName()));
    workspacesUsersProjects.setInProject(true);

    workspacesUsersProjectsRepository.save(workspacesUsersProjects);
    List<Topic> topics = topicMapper.toTopicList(creationRequest.tags());

    var projectMongo = com.kltn.server.model.collection.Project.builder()
        .nkProjectId(project.getId())
        .description(project.getDescription())
        .topics(topics)
        .build();
    projectMongoService.save(projectMongo);

    // ChangeLogRequest log = changeLogMapper.projectToCreateLog(project,
    // projectMongo);

    return ApiResponse.<ProjectResponse>builder()
        .message("Create project success")
        .data(projectMapper.toCreationResponse(savedProject, topics))
        // .logData(log)
        .build();
  }

  public ApiResponse<Void> inviteUserToProject(ProjectInvitationRequest invitationRequest) {
    User userInvite = userService.getCurrentUser();
    Project project = projectRepository.findById(invitationRequest.projectId())
        .orElseThrow(() -> AppException.builder()
            .error(Error.NOT_FOUND)
            .build());
    MailRequest mailRequest = MailRequest.builder()
        .confirmationLink(link)
        .variable(
            Map.of("sender", userInvite.getName(), "project.name", project.getName()))
        .templateName("invite-student")
        .build();
    invitationRequest.userId()
        .forEach(userId -> {
          User user = userService.getUserByUniId(userId);

          WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
              .userId(user.getId())
              .workspaceId(
                  invitationRequest.workspaceId())
              .build();
          WorkspacesUsersProjects usersProjects = WorkspacesUsersProjects.builder()
              .role(roleInit.getRole(
                  RoleType.MEMBER.getName()))
              .user(user)
              .project(project)
              .workspace(project.getWorkspace())
              .id(workspacesUsersId)
              .build();
          try {
            workspacesUsersProjectsRepository.save(usersProjects);
            emailService.inviteToProject(mailRequest.rebuild("voffougessissu-3149@yopmail.com",
                Map.of("userId",
                    workspacesUsersId.getUserId(),
                    "workspaceId",
                    workspacesUsersId.getWorkspaceId())));
          } catch (Exception e) {
            throw AppException.builder()
                .error(Error.DB_SERVER_ERROR)
                .build();
          }
        });
    return ApiResponse.<Void>builder()
        .message("Invite student to project")
        .build();
  }

  public ApiResponse<ProjectResponse> getById(String projectId) {
    User user = userService.getCurrentUser();
    Project project = projectRepository.findById(projectId)
        .orElseThrow(() -> AppException.builder()
            .error(Error.NOT_FOUND)
            .build());

    if (user.getRole()
        .getName()
        .equals("teacher")) {
      if (!project.getWorkspace()
          .getOwner()
          .getId()
          .equals(user.getId())) {
        throw AppException.builder()
            .error(Error.NOT_FOUND_SPECIFYING_PROJECT_TEACHER)
            .build();
      }
    } else {
      workspacesUsersProjectsService.getByUserIdAndProjectId(user.getId(), projectId);
    }
    Workspace workspace = project.getWorkspace();
    setCurrentSprint(project, workspace.getSprints());
    var project1 = projectMongoService.getByNkProjectId(projectId);
    List<Topic> topics = project1.getTopics();
    // List<SprintResponse> sprintResponses = getSprintResponses(project);
    ProjectResponse projectResponse = projectMapper.toProjectResponseById(project, topics);
    return ApiResponse.<ProjectResponse>builder()
        .message("Get project by id")
        .data(projectResponse)
        .build();
  }

  public Project getProjectById(String id) {
    return projectRepository.findById(id)
        .orElseThrow(() -> AppException.builder()
            .error(Error.NOT_FOUND_PROJECT)
            .build());
  }

  public ApiResponse<List<UserResponse>> getMembersOfProject(String projectId) {

    Project project = getProjectById(projectId);
    var workspacesUsersProjects = project.getWorkspacesUserProjects();
    List<UserResponse> userResponses = workspacesUsersProjects.stream()
        .map(wup -> userService.transformToUserResponse(
            wup.getUser(), wup.getRole()))
        .toList();
    return ApiResponse.<List<UserResponse>>builder()
        .message("Get members of project")
        .data(userResponses)
        .build();
  }

  public ApiResponse<ResourceOfSprintResponse> getResourceByProjectAndSprint(String projectId, String sprintId) {
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
        .projectId(projectId)
        .sprintId(sprintId)
        .build());
    List<ResourceResponse> dailyResources = projectSprint.getDailyFiles() != null && !projectSprint.getDailyFiles()
        .isEmpty() ? resourceMapper.toResourceResponseList(
            projectSprint.getDailyFiles()) : new ArrayList<>();
    ResourceResponse fileBacklog = projectSprint.getFileBackLog() != null ? resourceMapper.toResourceResponse(
        projectSprint.getFileBackLog()) : null;
    return ApiResponse.<ResourceOfSprintResponse>builder()
        .message("Get resource by project and sprint")
        .data(ResourceOfSprintResponse.builder()
            .daily(dailyResources)
            .fileBacklog(fileBacklog)
            .build())
        .build();
  }

  public void setCurrentSprint(Project project, List<Sprint> sprints) {
    Instant now = ClockSimulator.now().truncatedTo(ChronoUnit.DAYS);
    Sprint previous = null, next = null, current = null;
    long daysPrev = 0, daysNext = Long.MAX_VALUE;

    if (sprints != null && !sprints.isEmpty()) {
      // Sprint nextSprint = sprints.getFirst();
      for (Sprint sprint : sprints) {
        Instant start = sprint.getDtStart().truncatedTo(ChronoUnit.DAYS);
        Instant end = sprint.getDtEnd().truncatedTo(ChronoUnit.DAYS);
        // previous sprint section
        if (end.isBefore(now) && daysPrev > end.until(now, ChronoUnit.DAYS)) {
          previous = sprint;
          daysPrev = end.until(now, ChronoUnit.DAYS);
          continue;
        }
        // next sprint section
        if (start.isAfter(now) && daysNext > start.until(now, ChronoUnit.DAYS)) {
          next = sprint;
          daysNext = end.until(now, ChronoUnit.DAYS);
          continue;
        }
        // current sprint section
        if ((start.isBefore(now) || start.equals(now)) && (end.isAfter(now) || end.equals(now))) {
          current = sprint;
          continue;
        }
      }
      project.setCurrentSprint(current);
      project.setPrevSprint(previous);
      project.setNextSprint(next);
    }
  }
}
