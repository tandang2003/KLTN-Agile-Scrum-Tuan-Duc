package com.kltn.server.service;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.RoleRepository;
import com.kltn.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final PasswordEncoder pwEncoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthenticationService(PasswordEncoder pwEncoder, UserMapper userMapper, UserRepository userRepository, RoleRepository roleRepository) {
        this.pwEncoder = pwEncoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public boolean register(RegisterRequest registerRequest) {
        User user = userMapper.toUser(registerRequest);
        boolean check = userRepository.findAllByUniId(user.getUniId()).isPresent();
        if (!check) {
            Role role = roleRepository.getByName("student").orElseThrow(() -> new RuntimeException("Default role not found"));
            user.setPassword(pwEncoder.encode(user.getPassword()));
            user.setRole(role);
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
