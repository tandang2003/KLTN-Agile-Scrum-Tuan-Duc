package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdationRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.AppListArgumentNotValidException;
import com.kltn.server.error.AppMethodArgumentNotValidException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.mapper.WorkspaceMapper;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service

public class WorkspaceService {
    private UserRepository userRepository;
    private WorkspaceRepository workspaceRepository;
    private WorkspaceMapper workspaceMapper;
    private UserMapper userMapper;

    public WorkspaceService(UserRepository userRepository, UserMapper userMapper, WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceMapper = workspaceMapper;
        this.userMapper = userMapper;
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
    public WorkspaceResponse getWorkspaceById(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
//        int maxSublistSize = Math.min(workspace.getProjects().size(), 5);
        workspace.getProjects().sort(Comparator.comparing(Project::getDtCreated));
//        List<Project> subList = workspace.getProjects().subList(0, maxSublistSize);
//        workspace.setProjects(subList);
        return workspaceMapper.toWorkspaceResponseById(workspace);
    }

    public ApiPaging<WorkspaceResponse> getWorkspaceByOwnerIdPaging(int page, int size) {

        User user = userRepository.findByUniId((String)
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal()
        ).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Page<Workspace> workspaces = workspaceRepository.findAllByOwnerId(user.getId(), PageRequest.of(page, size, WorkspaceRepository.DEFAULT_SORT));
        return ApiPaging.<WorkspaceResponse>builder().items(workspaces.get().map(workspaceMapper::toWorkspaceResponseByIdWithoutProject).toList()).totalItems(workspaces.getTotalElements()).totalPages(workspaces.getTotalPages()).currentPage(workspaces.getNumber()).build();
    }

    public WorkspaceResponse updateWorkspace(String workspaceId, WorkspaceUpdationRequest workspaceUpdationRequest) {
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

    //TODO optimize it
    @Transactional
    public ApiPaging<UserResponse> getStudentInWorkspace(String workspaceId, int page, int size) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        Page<User> users = new PageImpl<>(workspace.getMembers().stream().toList(),
                PageRequest.of(page, size, userRepository.DEFAULT_SORT),
                workspace.getMembers().size());
        if (page * size >= workspace.getMembers().size())
            users = new PageImpl<>(new ArrayList<>());
        return ApiPaging.<UserResponse>builder()
                .items(users.get().map(userMapper::toWorkspaceStudentResponse).toList())
                .totalItems(users.getTotalElements())
                .totalPages(users.getTotalPages())
                .currentPage(page)
                .build();
    }


    public void addStudentToWorkspace(String workspaceId, String[] uniIds) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        List<String> removedUniIds = new ArrayList<>();
        List<String> uniIdsList = Arrays.stream(uniIds).toList();
        for (String uniId : uniIds) {
            Optional<User> user = userRepository.findByUniId(uniId);
            if (user.isPresent()) {
                workspace.getMembers().add(user.get());
                removedUniIds.add(user.get().getUniId());
            }
        }
        if (!removedUniIds.isEmpty()) workspaceRepository.save(workspace);
        if (removedUniIds.size() < uniIdsList.size()) {
            uniIdsList = uniIdsList.stream().filter(uniId -> !removedUniIds.contains(uniId)).toList();

            throw AppListArgumentNotValidException.builder().message(
                    "Invite student to workspace"
            ).error(uniIdsList).build();
        }
        workspaceRepository.save(workspace);
    }

}
