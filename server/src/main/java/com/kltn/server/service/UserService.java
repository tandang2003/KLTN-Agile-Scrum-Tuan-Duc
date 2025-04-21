package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @SendKafkaEvent(topic = "user-topic")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder().code(200)
                .message("Get all users successfully")
                .data(userMapper.toUserResponseList(userRepository.findAll()))
                .build();
    }

    public UserResponse getCurrUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        UserResponse userResponse = UserResponse.builder().id(user.getId()).uniId(user.getUniId()).name(user.getName()).className(user.getClassName()).build();
        return userResponse;
    }

    public User findByUniID(String uniId) {
        return userRepository.findByUniId(uniId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }
}
