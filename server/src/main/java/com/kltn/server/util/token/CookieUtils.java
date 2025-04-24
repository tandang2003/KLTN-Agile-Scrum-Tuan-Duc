package com.kltn.server.util.token;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class CookieUtils {
    private final String ACCESS_TOKEN_NAME = "access_token";
    private final String REFRESH_TOKEN_NAME = "refresh_token";

    @Autowired
    private TokenUtils tokenUtils;

//    public ResponseCookie setAccessCookies(String accessToken) {
//        return ResponseCookie.from(ACCESS_TOKEN_NAME, accessToken)
//                .httpOnly(true)
//                .secure(true)
//                .maxAge(tokenUtils.getAccessTokenExpiration()) // Access token live 15 minutes
//                .sameSite("Strict")
//                .build();
//    }

    public ResponseCookie setRefreshCookies(String refreshToken) {
        return ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .maxAge(tokenUtils.getRefreshTokenExpiration()) // Refresh token live 5 days
                .sameSite("Strict")
                .build();
    }

    public ResponseEntity<String> setJwtCookies(HttpServletResponse response,
                                                String accessToken,
                                                String refreshToken) {
//        // Tạo HttpOnly cookie cho Access Token (ngắn hạn)
//        ResponseCookie accessCookie = ResponseCookie.from(ACCESS_TOKEN_NAME, accessToken)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(tokenUtils.getAccessTokenExpiration()) // Access token live 15 minutes
//                .sameSite("Strict")
//                .build();

        // Tạo HttpOnly cookie cho Refresh Token (dài hạn)
        ResponseCookie refreshCookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(tokenUtils.getRefreshTokenExpiration()) // Refresh token live 5 days
                .sameSite("Strict")
                .build();

        // Thêm cookies vào response header
//        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

        return ResponseEntity.ok("Tokens set successfully in cookies!");
    }
}
