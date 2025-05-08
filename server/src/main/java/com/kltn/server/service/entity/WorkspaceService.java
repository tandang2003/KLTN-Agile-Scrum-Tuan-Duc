package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdateRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
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
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.document.ProjectLogRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service

public class WorkspaceService {
    private UserRepository userRepository;
    private WorkspaceRepository workspaceRepository;
    private WorkspaceMapper workspaceMapper;
    private UserMapper userMapper;
    private ProjectMapper projectMapper;
    private ProjectLogRepository projectLogRepository;
    private WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;

    public WorkspaceService(ProjectMapper projectMapper, ProjectLogRepository projectLogRepository, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, UserRepository userRepository, UserMapper userMapper, WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceMapper = workspaceMapper;
        this.userMapper = userMapper;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
        this.projectMapper = projectMapper;
        this.projectLogRepository = projectLogRepository;
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


    public WorkspaceResponse getWorkspaceById(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(
                workspaceId).orElseThrow(
                () -> AppException.builder().error(Error.NOT_FOUND).build());
        return workspaceMapper.toWorkspaceResponseById(workspace);
    }

    public ApiPaging<WorkspaceResponse> getWorkspaceByOwnerIdPaging(int page, int size) {
        User user = userRepository.findByUniId((String)
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal()
        ).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
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

    //    @SendMailEvent(topic = "send-mail")
    @Transactional
    public ApiResponse<Void> addStudentToWorkspace(String workspaceId, String[] uniIds) {
//        String senderId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() ->
                AppException.builder().error(Error.NOT_FOUND).build());
        List<String> removedUniIds = new ArrayList<>();
        List<String> emails = new ArrayList<>();
        List<String> uniIdsList = Arrays.stream(uniIds).toList();
        for (String uniId : uniIds) {
            User user = userRepository.findByUniId(uniId).get();
            if (!workspace.getMembers().contains(user)) {
                try {
                    workspacesUsersProjectsRepository.save(WorkspacesUsersProjects
                            .builder()
                            .id(WorkspacesUsersId.builder()
                                    .userId(user.getId())
                                    .workspaceId(workspace.getId())
                                    .build())
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
            throw AppListArgumentNotValidException.builder().message(
                    "Student have in project"
            ).error(uniIdsList).build();
        }
        return ApiResponse.<Void>builder()
                .message("Invite student to workspace")
                .build();
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
            var project1 = projectLogRepository.findByNkProjectId(project.getId());
            List<Topic> topics;
            if (project1.isPresent())
                topics = project1.get().getTopics();
            else
                topics = new ArrayList<>();
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
}
