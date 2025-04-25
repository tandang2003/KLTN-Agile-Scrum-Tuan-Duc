package com.kltn.server.service.entity;

import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
@RequestScope
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public User getCurrentUser() {
        String uniId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return userRepository.findByUniId(uniId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public UserResponse getCurrUser() {

//        UserResponse userResponse = UserResponse.builder().id(user.getId()).uniId(user.getUniId()).name(user.getName()).className(user.getClassName()).build();
        UserResponse userResponse = userMapper.toUserResponse(getCurrentUser());
        return userResponse;
    }

    public UserResponse getUserWorkspaces() {
//        User user = (User) auth.getPrincipal();
//        UserResponse userResponse = UserResponse.builder().id(user.getId()).uniId(user.getUniId()).name(user.getName()).className(user.getClassName()).build();
        UserResponse userResponse = userMapper.toUserWorkspaceResponse(getCurrentUser());
        return userResponse;
    }

    public User findByUniID(String uniId) {
        return userRepository.findByUniId(uniId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }
}
