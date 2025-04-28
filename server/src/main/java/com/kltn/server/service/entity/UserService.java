package com.kltn.server.service.entity;

import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
@RequestScope
public class UserService {
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, WorkspaceRepository workspaceRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.workspaceRepository = workspaceRepository;
    }

    public User getCurrentUser() {
        String uniId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return userRepository.findByUniId(uniId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public UserResponse getCurrUser() {
        UserResponse userResponse = userMapper.toUserResponse(getCurrentUser());
        return userResponse;
    }

    public UserResponse getUserWorkspaces() {
        User user = getCurrentUser();
        Page<Workspace> w = workspaceRepository.findAllByOwnerId(user.getId(), PageRequest.of(0, 10, WorkspaceRepository.DEFAULT_SORT));
        ApiPaging<WorkspaceResponse> workspaceResponseApiPaging = ApiPaging
                .<WorkspaceResponse>builder()
                .totalItems(w.getTotalElements())
                .currentPage(w.getNumber())
                .totalPages(w.getTotalPages())
                .items(w.get().map(userMapper::workspaceToWorkspaceResponse).toList())
                .build();
        return userMapper.toUserWorkspaceResponse(user, workspaceResponseApiPaging);
    }

}
