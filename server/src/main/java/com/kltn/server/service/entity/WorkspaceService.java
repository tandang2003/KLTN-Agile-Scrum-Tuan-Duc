package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdateRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.auth.WorkspaceAuthorizationResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.AppListArgumentNotValidException;
import com.kltn.server.error.AppMethodArgumentNotValidException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.mapper.entity.WorkspaceMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.document.ProjectMongoRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.service.entity.relation.WorkspacesUsersProjectsService;
import com.kltn.server.util.RoleType;
import com.kltn.server.util.token.TokenUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class WorkspaceService {
    private UserRepository userRepository;
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
    public WorkspaceService(TokenUtils tokenUtils, RoleService roleService, WorkspacesUsersProjectsService workspacesUsersProjectsService, ProjectMapper projectMapper, ProjectMongoRepository projectMongoRepository, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, UserRepository userRepository, UserMapper userMapper, WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper) {
        this.tokenUtils = tokenUtils;
        this.roleService = roleService;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceMapper = workspaceMapper;
        this.userMapper = userMapper;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
        this.projectMapper = projectMapper;
        this.projectMongoRepository = projectMongoRepository;
        this.workspacesUsersProjectsService = workspacesUsersProjectsService;
    }

    @Transactional
    public WorkspaceResponse createWorkspace(WorkspaceCreationRequest workspaceCreationRequest) {
        User user = userRepository.findByUniId((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).get();
        Workspace workspace = workspaceMapper.toWorkspace(workspaceCreationRequest);
        workspace.setOwner(user);
        try {
            workspace = workspaceRepository.save(workspace);
        } catch (Exception e) {
            throw AppException.builder().error(Error.CREATE_FAILED).build();
        }
        return workspaceMapper.toWorkspaceCreationResponse(workspace);
    }

    //
    public Workspace getWorkspaceById(String workspaceId) {
        return workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public ApiPaging<WorkspaceResponse> getWorkspaceByOwnerIdPaging(int page, int size) {
        User user = userRepository.findByUniId((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Page<Workspace> workspaces;
        if (user.getRole().getName().equals("teacher")) {
            workspaces = workspaceRepository.findAllByOwnerId(user.getId(), PageRequest.of(page, size, WorkspaceRepository.DEFAULT_SORT_JPA));
        } else {
            workspaces = workspaceRepository.findAllByMembersId(user.getId(), PageRequest.of(page, size, WorkspaceRepository.DEFAULT_SORT_MANUAL));
        }
        return ApiPaging.<WorkspaceResponse>builder().items(workspaces.get().map(workspaceMapper::toWorkspaceResponseForPaging).toList()).totalItems(workspaces.getTotalElements()).totalPages(workspaces.getTotalPages()).currentPage(workspaces.getNumber()).build();
    }

    public WorkspaceResponse updateWorkspace(String workspaceId, WorkspaceUpdateRequest workspaceUpdationRequest) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        if (workspaceUpdationRequest.end().isBefore(workspace.getStart())) {
            Map<String, String> error = new HashMap<>();
            error.put("end", "End date must be after start date");
            List<Map<String, String>> errors = new ArrayList<>();
            errors.add(error);
            throw AppMethodArgumentNotValidException.builder().error(errors).build();
        }
        workspace = workspaceMapper.updateWorkspace(workspace, workspaceUpdationRequest);
        workspaceRepository.save(workspace);
        return workspaceMapper.toWorkspaceResponseById(workspace);
    }

    @Transactional
    public ApiPaging<UserResponse> getStudentInWorkspace(String workspaceId, int page, int size) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Set<User> members = workspace.getMembers();
        List<User> users = new ArrayList<>(members);
        if (page * size >= users.size()) {
            return ApiPaging.<UserResponse>builder().items(Collections.emptyList()).totalItems(members.size()).totalPages((int) Math.ceil((double) members.size() / size)).currentPage(page).build();
        }
        int start = page * size;
        int end = Math.min(users.size(), (page + 1) * size);
        return ApiPaging.<UserResponse>builder().items(users.subList(start, end).stream().map(userMapper::toWorkspaceStudentResponse).toList()).totalItems(members.size()).totalPages((int) Math.ceil((double) members.size() / size)).currentPage(page).build();
    }

    //    @SendMailEvent(topic = "send-mail")
    @Transactional
    public ApiResponse<Void> addStudentToWorkspace(String workspaceId, String[] uniIds) {
//        String senderId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        List<String> removedUniIds = new ArrayList<>();
        List<String> emails = new ArrayList<>();
        List<String> uniIdsList = Arrays.stream(uniIds).toList();
        for (String uniId : uniIds) {
            User user = userRepository.findByUniId(uniId).get();
            if (!workspace.getMembers().contains(user)) {
                try {
                    workspacesUsersProjectsRepository.save(WorkspacesUsersProjects.builder().id(WorkspacesUsersId.builder().userId(user.getId()).workspaceId(workspace.getId()).build()).workspace(workspace).user(user).inWorkspace(true).build());
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
        String userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUniId(userId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());

        if (user.getWorkspaces().stream().noneMatch(workspace -> workspace.getId().equals(workspaceId))) {
            throw AppException.builder().error(Error.NOT_FOUND_WORKSPACE).build();
        }
        Page<Project> projects = workspacesUsersProjectsRepository.getProjecByWorkspaceId(workspaceId, PageRequest.of(page, size, WorkspacesUsersProjectsRepository.DEFAULT_SORT));
        List<ProjectResponse> projectResponses = new ArrayList<>();
        projects.getContent().forEach(project -> {
            var project1 = projectMongoRepository.findByNkProjectId(project.getId());
            List<Topic> topics;
            if (project1.isPresent()) topics = project1.get().getTopics();
            else topics = new ArrayList<>();
            projectResponses.add(projectMapper.toProjectResponseForPaging(project, topics));
        });

        return ApiResponse.<ApiPaging<ProjectResponse>>builder().message("Get project by workspace id").data(ApiPaging.<ProjectResponse>builder().items(projectResponses).totalItems(projects.getTotalElements()).totalPages(projects.getTotalPages()).currentPage(page).build()).build();
    }

    public ApiResponse<WorkspaceAuthorizationResponse> getUserInfoInWorkspace(String workspaceId) {
        String uniUserId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUniId(uniUserId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
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
            } else  workspaceAuthorizationResponse.setProjectId("");
        }
        String jwt = tokenUtils.generateVerifyToken("project", Map.of(
                "userId", user.getUniId(),
                "authorities", authorities.stream().map(GrantedAuthority::getAuthority).toList()
        ));
        workspaceAuthorizationResponse.setAuthorizationProject(jwt);
        return ApiResponse.<WorkspaceAuthorizationResponse>builder()
                .message("Get user info in project")
                .data(workspaceAuthorizationResponse)
                .build();
    }


    public WorkspaceResponse getWorkspaceResponseById(String workspaceId) {
        return workspaceMapper.toWorkspaceResponseById(getWorkspaceById(workspaceId));
    }
}
