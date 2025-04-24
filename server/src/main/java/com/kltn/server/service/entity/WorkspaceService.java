package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.WorkspaceMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService {
    private UserRepository userRepository;
    private WorkspaceRepository workspaceRepository;
    private WorkspaceMapper workspaceMapper;

    public WorkspaceService(UserRepository userRepository, WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceMapper = workspaceMapper;
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
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(
                () -> AppException.builder().error(Error.NOT_FOUND).build());
        return workspaceMapper.toWorkspaceResponseById(workspace);
    }
}
