package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
    }
//    @GetMapping
//    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
//        return ResponseEntity.ok().body((ApiResponse<List<UserResponse>>) userService.getAllUsers());
//    }

    @GetMapping
    public ResponseEntity<ApiResponse<UserResponse>> getUser() {
        return ResponseEntity.ok().body(ApiResponse.<UserResponse>builder().message("get info user").data(userService.getCurrUser()).build());
    }

    @GetMapping("/workspace")
    public ResponseEntity<ApiResponse<UserResponse>> userWorkspace() {
        return ResponseEntity.ok().body(ApiResponse.<UserResponse>builder().message("get info user").data(userService.getCurrUser()).build());
    }
}
