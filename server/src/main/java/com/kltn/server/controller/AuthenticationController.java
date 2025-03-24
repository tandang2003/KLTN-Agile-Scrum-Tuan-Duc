package com.kltn.server.controller;

import com.kltn.server.DTO.request.LoginRequest;
import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    //    @PostMapping("/login")
//    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest) {
//
//        return ResponseEntity.ok(login(loginRequest));
//    }
    @PostMapping("/register")
    public ResponseEntity<Boolean> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(authenticationService.register(registerRequest), HttpStatus.OK);
    }

}
