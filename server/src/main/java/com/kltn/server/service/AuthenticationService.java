package com.kltn.server.service;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.RoleRepository;
import com.kltn.server.repository.UserRepository;
import com.kltn.server.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final PasswordEncoder pwEncoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private TokenUtils tokenUtils;

    @Autowired
    public AuthenticationService(PasswordEncoder pwEncoder, UserMapper userMapper, UserRepository userRepository, RoleRepository roleRepository, TokenUtils tokenUtils) {
        this.pwEncoder = pwEncoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenUtils = tokenUtils;
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

    public AuthenticationResponse login() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String accessToken = tokenUtils.generateAccessToken(authentication);
        String refreshToken = tokenUtils.generateRefreshToken(authentication);
        User user = (User) authentication.getPrincipal();
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userResponse(userMapper.toUserDetailDTO(user))
                .build();
    }
}
