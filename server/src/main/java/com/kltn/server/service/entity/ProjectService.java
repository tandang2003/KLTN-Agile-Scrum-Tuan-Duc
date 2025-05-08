package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.auth.ProjectAuthorizationResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.config.RoleInit;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.*;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.document.ProjectLogRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.service.EmailService;
import com.kltn.server.util.RoleType;
import com.kltn.server.util.token.TokenUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {
    private final ProjectMapper projectMapper;
    private final TopicMapper topicMapper;
    private final ProjectRepository projectRepository;
    private final WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
    private final UserRepository userRepository;
    private final RoleInit roleInit;
    private final EmailService emailService;
    private final ProjectLogRepository projectLogRepository;
    @Value("${verify.invite-project-link}")
    private String link;
    private final TokenUtils tokenUtils;

    @Autowired
    public ProjectService(TokenUtils tokenUtils, ProjectLogRepository projectLogRepository, EmailService emailService, RoleInit roleInit, UserRepository userRepository, TopicMapper topicMapper, ProjectMapper projectMapper, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, ProjectRepository projectRepository) {
        this.projectLogRepository = projectLogRepository;
        this.roleInit = roleInit;
        this.topicMapper = topicMapper;
        this.projectMapper = projectMapper;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
        this.emailService = emailService;
        this.tokenUtils = tokenUtils;
    }

    @SendKafkaEvent(topic = "project-created")
    @Transactional
    public ApiResponse<ProjectResponse> createProject(ProjectCreationRequest creationRequest) {
        WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder().workspaceId(creationRequest.workspaceId()).userId(creationRequest.userId()).build();

        WorkspacesUsersProjects workspacesUsersProjects = workspacesUsersProjectsRepository.findById(workspacesUsersId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
//      insert workspace
        var project = projectMapper.toEntity(creationRequest);
        var savedProject = projectRepository.save(project);

        if (workspacesUsersProjects.getProject() != null) {
            throw AppException.builder().error(Error.ALREADY_EXISTS).build();
        }
        workspacesUsersProjects.setProject(savedProject);
        workspacesUsersProjects.setRole(roleInit.getRole(RoleType.LEADER.getName()));
        workspacesUsersProjects.setInProject(true);

        workspacesUsersProjectsRepository.save(workspacesUsersProjects);
        List<Topic> topics = topicMapper.toTopicList(creationRequest.tags());
        var logProject = ProjectLogRequest.builder().projectId(project.getId()).description(project.getDescription()).tags(topics).build();

        return ApiResponse.<ProjectResponse>builder().message("Create project success").data(projectMapper.toCreationResponse(savedProject, topics)).logData(logProject).build();
    }

    //TODO insert mail, optimize
    public ApiResponse<Void> inviteUserToProject(ProjectInvitationRequest invitationRequest) {
        String userInviteId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User userInvite = userRepository.findByUniId(userInviteId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Project project = projectRepository.findById(invitationRequest.projectId()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        MailRequest mailRequest = MailRequest.builder().confirmationLink(link).variable(Map.of("sender", userInvite.getName(), "project.name", project.getName())).templateName("invite-student").build();
        invitationRequest.userId().forEach(userId -> {
            User user = userRepository.findByUniId(userId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());

            WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder().userId(user.getId()).workspaceId(invitationRequest.workspaceId()).build();
            WorkspacesUsersProjects usersProjects = WorkspacesUsersProjects.builder().role(roleInit.getRole(RoleType.MEMBER.getName())).user(user).project(project).workspace(project.getWorkspace()).id(workspacesUsersId).build();
            try {
                workspacesUsersProjectsRepository.save(usersProjects);
                emailService.inviteToProject(mailRequest.rebuild(user.getEmail(), Map.of("userId", workspacesUsersId.getUserId(), "workspaceId", workspacesUsersId.getWorkspaceId())));
            } catch (Exception e) {
                throw AppException.builder().error(Error.SERVER_ERROR).build();
            }
        });
        return ApiResponse.<Void>builder().message("Invite student to project").build();
    }

    public ApiResponse<ProjectAuthorizationResponse> getById(String projectId) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUniId(userId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Project project = projectRepository.findById(projectId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
//        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Collection<GrantedAuthority> authorities;
        if (user.getRole().getName().equals("teacher")) {
            Workspace workspace = project.getWorkspace();
            if (!workspace.getOwner().equals(user)) {
                throw AppException.builder().error(Error.NOT_FOUND_SPECIFYING_PROJECT_TEACHER).build();
            }
            Role role = roleInit.getRole(RoleType.LEADER.getName());
            authorities = new ArrayList<>(role.getPermissions().stream().map(p -> new SimpleGrantedAuthority(p.getName())).toList());
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
        } else {
            WorkspacesUsersProjects usersProjects = workspacesUsersProjectsRepository.findByUserIdAndProjectId(user.getId(), projectId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND_USER_PROJECT_RELATION).build());
            authorities = new ArrayList<>(usersProjects.getRole().getPermissions().stream().map(p -> new SimpleGrantedAuthority(p.getName())).toList());
            authorities.add(new SimpleGrantedAuthority("ROLE_" + usersProjects.getRole().getName().toUpperCase()));
        }
        var project1 = projectLogRepository.findByNkProjectId(projectId);
        List<Topic> topics;
        if (project1.isPresent())
            topics = project1.get().getTopics();
        else
            topics = new ArrayList<>();
        List<SprintResponse> sprintResponses = getSprintResponses(project);
        ProjectResponse projectResponse = projectMapper.toProjectResponseById(project, topics, sprintResponses);
        String jwt = tokenUtils.generateVerifyToken(
                "project", Map.<String, Object>ofEntries(Map.entry("userId", user.getUniId()), Map.entry("authorities", authorities.stream().map(GrantedAuthority::getAuthority).toList()))
        );
        ProjectAuthorizationResponse projectAuthorizationResponse = ProjectAuthorizationResponse.builder().authorizationProject(jwt).project(projectResponse).build();
        return ApiResponse.<ProjectAuthorizationResponse>builder().message("Get project by id").data(projectAuthorizationResponse).build();

    }

    private List<SprintResponse> getSprintResponses(Project project) {
        List<ProjectSprint> projectSprints = project.getProjectSprints();
        List<SprintResponse> sprintResponses = new ArrayList<>();
        if (projectSprints != null && !projectSprints.isEmpty()) {

            projectSprints.forEach(ps -> {
                Sprint sprint = ps.getSprint();
                sprintResponses.add(SprintResponse.builder().id(sprint.getId()).
                        process(
                                Map.of(
                                        "planning", ps.getDtPlanning() != null ? ps.getDtPlanning().toString() : "",
                                        "review", ps.getDtPreview() != null ? ps.getDtPreview().toString() : ""
                                )).
                        start(sprint.getDtStart()).
                        end(sprint.getDtEnd()).
                        build());
            });
        }
        return sprintResponses;
    }

    public Project getProjectById(String id) {
        return projectRepository.findById(id).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }


}
