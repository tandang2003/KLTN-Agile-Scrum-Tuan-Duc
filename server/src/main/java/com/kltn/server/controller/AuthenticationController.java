package com.kltn.server.controller;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.service.AuthenticationService;
import com.kltn.server.service.redis.UserTokenService;
import com.kltn.server.util.token.CookieUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final CookieUtils cookieUtils;
    private final UserTokenService userTokenService;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public AuthenticationController(@Qualifier("refreshTokenDecoder") JwtDecoder jwtDecoder, AuthenticationService authenticationService, UserTokenService userTokenService, CookieUtils cookieUtils) {
        this.authenticationService = authenticationService;
        this.cookieUtils = cookieUtils;
        this.userTokenService = userTokenService;
        this.jwtDecoder = jwtDecoder;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login() {
        AuthenticationResponse response = authenticationService.login();
        ResponseCookie refreshCookie = cookieUtils.setRefreshCookies(response.getRefreshToken());
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(
                        ApiResponse
                                .<AuthenticationResponse>builder()
                                .data(response)
                                .build()
                );
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Boolean>> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        authenticationService.register(registerRequest);
        return ResponseEntity.ok().body(ApiResponse.<Boolean>builder().build());
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> refresh(@CookieValue("refresh_token") String refreshToken) {
        Jwt jwt = jwtDecoder.decode(refreshToken);
        if (userTokenService.isRefreshTokenExpired(jwt.getClaim("sail") + SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            throw AppException.builder().error(Error.TOKEN_INVALID).build();
        }
        AuthenticationResponse response = authenticationService.refresh(refreshToken);
        return ResponseEntity.ok()
                .body(
                        ApiResponse
                                .<AuthenticationResponse>builder()
                                .code(HttpStatus.OK.value())
                                .data(response)
                                .build()
                );

    }
}
