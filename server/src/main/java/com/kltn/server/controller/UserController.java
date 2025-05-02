package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.service.entity.UserService;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok().body(ApiResponse.<UserResponse>builder().message("get info user").data(userService.getCurrUser()).build());
    }

//    @GetMapping(value = "/workspace")
//    public ResponseEntity<ApiResponse<UserResponse>> userWorkspace() {
//        return ResponseEntity.ok().body(ApiResponse.<UserResponse>builder().message("get info workspace of user").data(userService.getUserWorkspaces()).build());
//    }

    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Void>> searchUser(@RequestBody
                                                        @Length(
                                                                min = 8,
                                                                max = 8,
                                                                message = "student id is not valid"
                                                        )
                                                        String userId) {
        if (userService.checkingUser(userId))
            return ResponseEntity.ok().body(ApiResponse.<Void>builder().message("user is exist").build());
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.<Void>builder().code(404).message("user is not exist").build());
    }


}
