package com.kltn.server.service;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.UserMapper;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.entity.RoleRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.util.token.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthenticationService {
    private final PasswordEncoder pwEncoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private TokenUtils tokenUtils;
    private final JwtDecoder refreshTokenDecoder;
    private final RedisTemplate<?, ?> redisTemplate;

    @Autowired
    public AuthenticationService(PasswordEncoder pwEncoder, UserMapper userMapper, UserRepository userRepository,
                                 RoleRepository roleRepository, TokenUtils tokenUtils, @Qualifier("refreshTokenDecoder") JwtDecoder refreshTokenDecoder, Map<String, RedisTemplate<?, ?>> redisTemplateMap) {
        this.pwEncoder = pwEncoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenUtils = tokenUtils;
        this.refreshTokenDecoder = refreshTokenDecoder;
        this.redisTemplate = redisTemplateMap.get("refreshToken");
    }

    public void register(RegisterRequest registerRequest) {
        User user = userMapper.toUser(registerRequest);
        boolean check = userRepository.findAllByUniId(user.getUniId()).isPresent();
        if (!check) {
            Role role = roleRepository.getByName("student")
                    .orElseThrow(() -> AppException.builder().error(Error.SERVER_ERROR).build());
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

    public AuthenticationResponse refresh(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw AppException.builder()
                    .error(Error.TOKEN_MISSING)
                    .build();
        }
        Jwt jwt = refreshTokenDecoder.decode(refreshToken);
        User user = userRepository.findByUniId(jwt.getClaim("uniId")).orElseThrow(() -> AppException.builder().error(Error.TOKEN_INVALID).build());
        String accessToken = tokenUtils.generateAccessToken(user);
//        User user = (User) authentication.getPrincipal();
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .userResponse(userMapper.toUserDetailDTO(user))
                .build();
//        return null;
    }
}
