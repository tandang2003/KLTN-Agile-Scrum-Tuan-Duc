package com.kltn.server.controller;

import com.kltn.server.DTO.request.LoginRequest;
import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.config.security.provider.BasicAuthenticationProvider;
import com.kltn.server.service.AuthenticationService;
import com.kltn.server.util.CookieUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final BasicAuthenticationProvider basicAuthenticationProvider;
    private final CookieUtils cookieUtils;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, BasicAuthenticationProvider basicAuthenticationProvider, CookieUtils cookieUtils) {
        this.authenticationService = authenticationService;
        this.basicAuthenticationProvider = basicAuthenticationProvider;
        this.cookieUtils = cookieUtils;
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
                                .code(HttpStatus.OK.value())
                                .data(response)
                                .build()
                );
    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(authenticationService.register(registerRequest), HttpStatus.OK);
    }

}
