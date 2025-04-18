package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.UserResponse;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.repository.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
                .logData(MyLog.builder().str("1223").build())
                .build();
    }
}
