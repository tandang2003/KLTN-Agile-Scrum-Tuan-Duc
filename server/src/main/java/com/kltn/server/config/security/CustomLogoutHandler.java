package com.kltn.server.config.security;

import com.kltn.server.service.redis.UserTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {
    UserTokenService userTokenService;
    JwtDecoder refreshDecoder;

    @Autowired
    public CustomLogoutHandler(UserTokenService userTokenService, @Qualifier("refreshTokenDecoder") JwtDecoder refreshDecoder) {
        this.userTokenService = userTokenService;
        this.refreshDecoder = refreshDecoder;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String refreshToken = getTokenFromCookies(request, "refresh_token");
        Jwt jwt = refreshDecoder.decode(refreshToken);
        userTokenService.saveRefreshTokenExpired(jwt.getClaim("sail"), jwt.getClaim("uniId"), refreshToken);
    }

    private String getTokenFromCookies(HttpServletRequest request, String cookieName) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
