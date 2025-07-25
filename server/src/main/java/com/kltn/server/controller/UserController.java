package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.user.UserResponseAll;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.service.entity.UserService;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService, UserMapper userMapper) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<ApiResponse<UserResponse>> getUser() {
    return ResponseEntity.ok()
                         .body(ApiResponse.<UserResponse>builder()
                                          .message("get info user")
                                          .data(userService.getCurrUser())
                                          .build());
  }


  @GetMapping("/check")
  public ResponseEntity<ApiResponse<Void>> searchUser(@RequestParam("uniId") @Length(min = 8,
                                                                                     max = 8,
                                                                                     message = "student id is not valid") String userId) {

    if (userService.checkingUser(userId))
      return ResponseEntity.ok()
                           .body(ApiResponse.<Void>builder()
                                            .message("user is exist")
                                            .build());
    else
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
                           .body(ApiResponse.<Void>builder()
                                            .code(404)
                                            .message("user is not exist")
                                            .build());
  }

  @GetMapping("/workspace/project/check")
  public ResponseEntity<ApiResponse<Void>> checkUserInProject(@RequestParam("uniId") @Length(min = 8,
                                                                                             max = 8,
                                                                                             message = "student id is not valid") String uniId,
                                                              @RequestParam("workspaceId") @NotEmpty String workspaceId) {
    ApiResponse<Void> response = userService.checkingUserWorkspaceProject(uniId, workspaceId);
    return ResponseEntity.status(response.getCode())
                         .body(response);
  }

  @GetMapping("/all")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<List<UserResponseAll>>> getAllUsers() {
    var users = userService.getAllUsers();
    return ResponseEntity.status(users.getCode())
                         .body(users);
  }
}
