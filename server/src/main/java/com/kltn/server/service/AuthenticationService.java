package com.kltn.server.service;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
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

    public void register(RegisterRequest registerRequest) {
        User user = userMapper.toUser(registerRequest);
        boolean check = userRepository.findAllByUniId(user.getUniId()).isPresent();
        if (!check) {
            Role role = roleRepository.getByName("student").orElseThrow(() -> AppException.builder().error(Error.SERVER_ERROR).build());
            user.setPassword(pwEncoder.encode(user.getPassword()));
            user.setRole(role);
            userRepository.save(user);
            return;
        }
        throw AppException.builder()
                .error(Error.EXISTED_DATA)
                .build();
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
