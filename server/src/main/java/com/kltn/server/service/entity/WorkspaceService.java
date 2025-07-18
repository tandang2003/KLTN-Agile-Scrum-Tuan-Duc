package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdateRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.auth.WorkspaceAuthorizationResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.AppListArgumentNotValidException;
import com.kltn.server.error.AppMethodArgumentNotValidException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.CourseMapper;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.mapper.entity.WorkspaceMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.*;
import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.CourseRelation;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.document.ProjectMongoRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import com.kltn.server.repository.entity.relation.UserCourseRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.service.entity.relation.UserCourseService;
import com.kltn.server.service.entity.relation.WorkspacesUsersProjectsService;
import com.kltn.server.util.RoleType;
import com.kltn.server.util.token.TokenUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service

public class WorkspaceService {
  private final UserService userService;
  private final UserCourseRelationRepository userCourseRelationRepository;
  private final CourseMapper courseMapper;
  private final UserCourseService userCourseService;
  private final CourseService courseService;
  //  private UserRepository userRepository;
  private WorkspaceRepository workspaceRepository;
  private WorkspaceMapper workspaceMapper;
  private UserMapper userMapper;
  private ProjectMapper projectMapper;
  private ProjectMongoRepository projectMongoRepository;
  private WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
  private WorkspacesUsersProjectsService workspacesUsersProjectsService;
  private RoleService roleService;
  private TokenUtils tokenUtils;

  @Autowired
  public WorkspaceService(TokenUtils tokenUtils, RoleService roleService,
                          WorkspacesUsersProjectsService workspacesUsersProjectsService,
                          ProjectMapper projectMapper, ProjectMongoRepository projectMongoRepository,
                          WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository,
//                          UserRepository userRepository,
                          UserMapper userMapper,
                          WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper,
                          @Lazy
                          UserService userService, UserCourseRelationRepository userCourseRelationRepository, CourseMapper courseMapper, UserCourseService userCourseService, CourseService courseService) {
    this.tokenUtils = tokenUtils;
    this.roleService = roleService;
//    this.userRepository = userRepository;
    this.workspaceRepository = workspaceRepository;
    this.workspaceMapper = workspaceMapper;
    this.userMapper = userMapper;
    this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    this.projectMapper = projectMapper;
    this.projectMongoRepository = projectMongoRepository;
    this.workspacesUsersProjectsService = workspacesUsersProjectsService;
    this.userService = userService;
    this.userCourseRelationRepository = userCourseRelationRepository;
    this.courseMapper = courseMapper;
    this.userCourseService = userCourseService;
    this.courseService = courseService;
  }

  @Transactional
  public WorkspaceResponse createWorkspace(WorkspaceCreationRequest workspaceCreationRequest) {
    User user = userService.getCurrentUser();
    Workspace workspace = workspaceMapper.toWorkspace(workspaceCreationRequest);
    Course course = courseService.getCourse(workspaceCreationRequest.courseId());
    workspace.setOwner(user);
    workspace.setCourse(course);
    try {
      workspace = workspaceRepository.save(workspace);
    } catch (Exception e) {
      throw AppException.builder().error(Error.CREATE_FAILED).build();
    }
    return workspaceMapper.toWorkspaceCreationResponse(workspace);
  }

  //
  public Workspace getWorkspaceById(String workspaceId) {
    return workspaceRepository.findById(workspaceId)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
  }

  public ApiPaging<WorkspaceResponse> getWorkspaceByOwnerIdPaging(int page, int size) {
    User user = userService.getCurrentUser();
    Page<Workspace> workspaces;
    if (user.getRole().getName().equals("teacher")) {
      workspaces = workspaceRepository.findAllByOwnerId(user.getId(), PageRequest.of(page, size, WorkspaceRepository.DEFAULT_SORT_JPA));
    } else {
      workspaces = workspaceRepository.findAllByMembersId(user.getId(), PageRequest.of(page, size, WorkspaceRepository.DEFAULT_SORT_MANUAL));
    }
    for (Workspace workspace : workspaces) {
      setStatusSprint(workspace);
    }

    return ApiPaging.<WorkspaceResponse>builder()
      .items(workspaces.get().map(workspaceMapper::toWorkspaceResponseForPaging).toList())
      .totalItems(workspaces.getTotalElements())
      .totalPages(workspaces.getTotalPages())
      .currentPage(workspaces.getNumber())
      .build();
  }

  public WorkspaceResponse updateWorkspace(String workspaceId, WorkspaceUpdateRequest workspaceUpdationRequest) {
    Workspace workspace = workspaceRepository.findById(workspaceId)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    if (workspaceUpdationRequest.end().isBefore(workspace.getStart())) {
      Map<String, String> error = new HashMap<>();
      error.put("end", "End date must be after start date");
      List<Map<String, String>> errors = new ArrayList<>();
      errors.add(error);
      throw AppMethodArgumentNotValidException.builder().error(errors).build();
    }
    workspace = workspaceMapper.updateWorkspace(workspace, workspaceUpdationRequest);
    if (!Objects.equals(workspace.getCourse()
      .getId(), workspaceUpdationRequest.courseId()) || !Objects.equals(workspace.getCourse()
      .getCourseId(), workspaceUpdationRequest.courseId())) {
      workspace.setCourse(courseService.getCourse(workspaceUpdationRequest.courseId()));
    }
    workspace = workspaceRepository.save(workspace);
    setStatusSprint(workspace);
    return workspaceMapper.toWorkspaceResponseById(workspace);
  }

  @Transactional
  public ApiPaging<UserResponse> getStudentInWorkspace(String workspaceId, int page, int size) {
    Workspace workspace = workspaceRepository.findById(workspaceId)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    Set<User> members = workspace.getMembers();
    List<User> users = new ArrayList<>(members);
    if (page * size >= users.size()) {
      return ApiPaging.<UserResponse>builder()
        .items(Collections.emptyList())
        .totalItems(members.size())
        .totalPages((int) Math.ceil((double) members.size() / size))
        .currentPage(page)
        .build();
    }
    int start = page * size;
    int end = Math.min(users.size(), (page + 1) * size);
    return ApiPaging.<UserResponse>builder()
      .items(users.subList(start, end).stream().map(userMapper::toWorkspaceStudentResponse).toList())
      .totalItems(members.size())
      .totalPages((int) Math.ceil((double) members.size() / size))
      .currentPage(page)
      .build();
  }

  // @SendMailEvent(topic = "send-mail")
  //  @Transactional
  public ApiResponse<Void> addStudentToWorkspace(String workspaceId, String[] uniIds) {
    Workspace workspace = workspaceRepository.findById(workspaceId)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    List<String> removedUniIds = new ArrayList<>();
    List<String> emails = new ArrayList<>();
    List<String> uniIdsList = Arrays.stream(uniIds).toList();
    for (String uniId : uniIds) {
      User user = userService.getUserByUniId(uniId);
      if (!workspace.getMembers().contains(user)) {
        try {
          workspacesUsersProjectsRepository.save(WorkspacesUsersProjects.builder()
            .id(WorkspacesUsersId.builder().userId(user.getId()).workspaceId(workspace.getId()).build())
            .workspace(workspace)
            .user(user)
            .inWorkspace(true)
            .build());
        } catch (Exception e) {
          throw AppException.builder().error(Error.INVITED_FAILED).build();
        }
        removedUniIds.add(user.getUniId());
        emails.add(user.getEmail());
      }
    }
    if (removedUniIds.size() < uniIdsList.size()) {
      uniIdsList = uniIdsList.stream().filter(uniId -> !removedUniIds.contains(uniId)).toList();
      throw AppListArgumentNotValidException.builder().message("Student have in project").error(uniIdsList).build();
    }
    return ApiResponse.<Void>builder().message("Invite student to workspace").build();
  }

  public ApiResponse<ApiPaging<ProjectResponse>> getListPagingProject(String workspaceId, int page, int size) {
    User user = userService.getCurrentUser();


    if (user.getWorkspaces().stream().noneMatch(workspace -> workspace.getId().equals(workspaceId))) {
      throw AppException.builder().error(Error.NOT_FOUND_WORKSPACE).build();
    }
    Page<Project> projects = workspacesUsersProjectsRepository.getProjecByWorkspaceId(workspaceId, PageRequest.of(page, size, WorkspacesUsersProjectsRepository.DEFAULT_SORT));
    List<ProjectResponse> projectResponses = new ArrayList<>();
    projects.getContent().forEach(project ->
      {
      var project1 = projectMongoRepository.findByNkProjectId(project.getId());
      List<Topic> topics;
      if (project1.isPresent()) topics = project1.get().getTopics();
      else topics = new ArrayList<>();
      projectResponses.add(projectMapper.toProjectResponseForPaging(project, topics));
      });

    return ApiResponse.<ApiPaging<ProjectResponse>>builder()
      .message("Get project by workspace id")
      .data(ApiPaging.<ProjectResponse>builder()
        .items(projectResponses)
        .totalItems(projects.getTotalElements())
        .totalPages(projects.getTotalPages())
        .currentPage(page)
        .build())
      .build();
  }

  public ApiResponse<WorkspaceAuthorizationResponse> getUserInfoInWorkspace(String workspaceId) {
    User user = userService.getCurrentUser();
    Collection<GrantedAuthority> authorities = new ArrayList<>();
    WorkspaceAuthorizationResponse workspaceAuthorizationResponse = WorkspaceAuthorizationResponse.builder().build();

    if (user.getRole().getName().equals(RoleType.TEACHER.getName())) {
      Workspace workspace = getWorkspaceById(workspaceId);
      if (!workspace.getOwner().getId().equals(user.getId())) {
        throw AppException.builder().error(Error.NOT_FOUND).build();
      }
      workspaceAuthorizationResponse.setProjectIds(workspace.getProjects().stream().map(Project::getId).toList());
      Role leaderRole = roleService.getRole(RoleType.LEADER.getName());
      authorities = roleService.mapPermissionsToAuthorities(leaderRole);
    } else {
      WorkspacesUsersProjects usersProjects = workspacesUsersProjectsService.getByWorkspaceAndUserId(workspaceId, user.getId());
      if (usersProjects.isInProject()) {
        workspaceAuthorizationResponse.setProjectId(usersProjects.getProject().getId());
        Role role = usersProjects.getRole();
        authorities = roleService.mapPermissionsToAuthorities(role);
      } else workspaceAuthorizationResponse.setProjectId("");
    }
    String jwt = tokenUtils.generateVerifyToken("project", Map.of("userId", user.getUniId(), "authorities", authorities.stream()
      .map(GrantedAuthority::getAuthority)
      .toList()));
    workspaceAuthorizationResponse.setAuthorizationProject(jwt);
    return ApiResponse.<WorkspaceAuthorizationResponse>builder()
      .message("Get user info in project")
      .data(workspaceAuthorizationResponse)
      .build();
  }

  public WorkspaceResponse getWorkspaceResponseById(String workspaceId) {
    Workspace workspace = getWorkspaceById(workspaceId);
    setStatusSprint(workspace);
    Course course = workspace.getCourse();
    List<Course> prerequisite = course.getDependentCourses()
      .stream()
      .map(CourseRelation::getPrerequisiteCourse)
      .toList()
      ;
    User user = userService.getCurrentUser();
    List<UserCourseRelation> userCourseRelations = new ArrayList<>();
    for (Course prerequisiteCourse : prerequisite) {
      UserCourseRelation userCourseRelation = userCourseService.findUserCourseRelationById(UserCourseRelationId.builder()
        .userId(user.getId())
        .courseId(prerequisiteCourse.getId())
        .build());
      userCourseRelations.add(userCourseRelation);
    }


    return workspaceMapper.toWorkspaceResponseById(workspace, courseMapper.toListUserCourseResponse(userCourseRelations));
  }

  private void setStatusSprint(Workspace workspace) {
    List<Sprint> sprints = workspace.getSprints();
    Instant now = ClockSimulator.now().truncatedTo(ChronoUnit.DAYS);
    Sprint previous = null, next = null, current = null;
    long daysPrev = 0, daysNext = Long.MAX_VALUE;

    if (sprints != null && !sprints.isEmpty()) {
      //      Sprint nextSprint = sprints.getFirst();
      for (Sprint sprint : sprints) {
        Instant start = sprint.getDtStart().truncatedTo(ChronoUnit.DAYS);
        Instant end = sprint.getDtEnd().truncatedTo(ChronoUnit.DAYS);
        //previous sprint section
        if (end.isBefore(now) && daysPrev > end.until(now, ChronoUnit.DAYS)) {
          previous = sprint;
          daysPrev = end.until(now, ChronoUnit.DAYS);
          continue;
        }
        //next sprint section
        if (start.isAfter(now) && daysNext > start.until(now, ChronoUnit.DAYS)) {
          next = sprint;
          daysNext = end.until(now, ChronoUnit.DAYS);
          continue;
        }
        //current sprint section
        if ((start.isBefore(now) || start.equals(now)) && (end.isAfter(now) || end.equals(now))) {
          current = sprint;
          continue;
        }
      }
      workspace.setCurrentSprint(current);
      workspace.setPrevSprint(previous);
      workspace.setNextSprint(next);
    }

  }
}
