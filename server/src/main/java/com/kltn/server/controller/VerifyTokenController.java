package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/verify")
public class VerifyTokenController {
    TokenService tokenService;

    @Autowired
    public VerifyTokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/invite-token")
    public ResponseEntity<ApiResponse<Void>> verifyInviteToken(@RequestParam(required = true) String token) {
        tokenService.verifyInviteUser(token);
        System.out.println("verify token success");
        return ResponseEntity.ok().body(
                ApiResponse.<Void>builder()
                        .message("verify token success")
                        .build());
    }

}
