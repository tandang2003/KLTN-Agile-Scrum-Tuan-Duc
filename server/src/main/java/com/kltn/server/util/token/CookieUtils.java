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

  // public ResponseCookie setAccessCookies(String accessToken) {
  // return ResponseCookie.from(ACCESS_TOKEN_NAME, accessToken)
  // .httpOnly(true)
  // .secure(true)
  // .maxAge(tokenUtils.getAccessTokenExpiration()) // Access token live 15
  // minutes
  // .sameSite("Strict")
  // .build();
  // }

  public ResponseCookie setRefreshCookies(String refreshToken) {
    return ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
        .httpOnly(true)
        .secure(
            false)
        .maxAge(tokenUtils.getRefreshTokenExpiration())
        .path("/")
        .sameSite("Lax") // ✅ More permissive for local development
        .build();
  }

  public ResponseEntity<String> setJwtCookies(HttpServletResponse response,
      String accessToken,
      String refreshToken) {

    // Tạo HttpOnly cookie cho Refresh Token (dài hạn)
    ResponseCookie refreshCookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
        .httpOnly(true)
        .secure(false) // ✅ For HTTP (in dev)
        .path("/") // ✅ Always set path
        .maxAge(tokenUtils.getRefreshTokenExpiration())
        .sameSite("Lax") // ✅ More permissive for local development
        .build();

    // Thêm cookies vào response header
    // response.addHeader("Set-Cookie", accessCookie.toString());
    response.addHeader("Set-Cookie", refreshCookie.toString());

    return ResponseEntity.ok("Tokens set successfully in cookies!");
  }
}
