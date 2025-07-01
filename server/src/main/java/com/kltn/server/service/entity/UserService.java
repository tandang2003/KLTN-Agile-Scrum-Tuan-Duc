package com.kltn.server.service.entity;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.user.UserResponseAll;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.WorkspaceRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

@Service
@RequestScope
public class UserService {
  private final UserRepository userRepository;
  private final WorkspaceRepository workspaceRepository;
  private final WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
  private final UserMapper userMapper;

  @Autowired
  public UserService(WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, UserRepository userRepository,
                     UserMapper userMapper, WorkspaceRepository workspaceRepository) {
    this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    this.userRepository = userRepository;
    this.userMapper = userMapper;
    this.workspaceRepository = workspaceRepository;
  }

  public User getCurrentUser() {
    String uniId = SecurityContextHolder.getContext()
                                        .getAuthentication()
                                        .getPrincipal()
                                        .toString();
    return getUserByUniId(uniId);
  }

  public UserResponse getCurrUser() {
    return userMapper.toUserDetailResponse(getCurrentUser());
  }

  public boolean checkingUser(String userId) {
    User user = userRepository.findByUniId(userId)
                              .orElse(null);
    return user != null;
  }
public User save(User user) {

      return userRepository.save(user);

  }
  public ApiResponse<Void> checkingUserWorkspaceProject(String uniId, String workspaceId) {
    User user = getUserByUniId(uniId);
    if (!workspaceRepository.existsById(workspaceId)) {
      throw AppException.builder()
                        .error(Error.NOT_FOUND)
                        .build();
    }
    WorkspacesUsersProjects workspacesUsersProjects = workspacesUsersProjectsRepository.findById(
                                                                                         WorkspacesUsersId.builder()
                                                                                                          .workspaceId(workspaceId)
                                                                                                          .userId(user.getId())
                                                                                                          .build())
                                                                                       .orElse(null);
    if (workspacesUsersProjects != null) {
      if (workspacesUsersProjects.getProject() != null) {
        return ApiResponse.<Void>builder()
                          .code(409)
                          .message("User already in project")
                          .build();
      }
      else {
        return ApiResponse.<Void>builder()
                          .code(200)
                          .message("User is accepted")
                          .build();
      }
    }
    else {
      return ApiResponse.<Void>builder()
                        .code(404)
                        .message("User is in workspace")
                        .build();
    }
  }

  public User getUserById(String id) {
    return userRepository.findById(id)
                         .orElseThrow(() -> AppException.builder()
                                                        .error(Error.NOT_FOUND)
                                                        .build());
  }

  public User getUserByUniId(String id) {
    return userRepository.findByUniId(id)
                         .orElseThrow(() -> AppException.builder()
                                                        .error(Error.NOT_FOUND)
                                                        .build());
  }

  public UserResponse transformToUserResponse(User user, Role role) {
    user.setRole(role);
    return userMapper.toUserResponse(user);
  }

  public ApiResponse<List<UserResponseAll>> getAllUsers() {
    List<User> users = userRepository.findAll();
    List<UserResponseAll> userResponses = users.stream()
                                               .map(userMapper::toUserResponseForAdmin)
                                               .toList();
    return ApiResponse.<List<UserResponseAll>>builder()
                      .code(200)
                      .data(userResponses)
                      .message("List of all users")
                      .build();
  }
}
