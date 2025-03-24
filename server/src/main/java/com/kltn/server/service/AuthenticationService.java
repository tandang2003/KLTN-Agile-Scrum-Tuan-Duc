package com.kltn.server.service;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.UserRepository;
import jakarta.validation.Valid;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private PasswordEncoder pwEncoder;
    private final UserMapper userMapper;
    private UserRepository userRepository;

    @Autowired
    public AuthenticationService(PasswordEncoder pwEncoder, UserMapper userMapper, UserRepository userRepository) {
        this.pwEncoder = pwEncoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    public boolean register(RegisterRequest registerRequest) {
        User user = userMapper.toUser(registerRequest);
        boolean check = userRepository.findAllByUniId(user.getUniId()).isPresent();
        if (!check) {
            user.setPassword(pwEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
