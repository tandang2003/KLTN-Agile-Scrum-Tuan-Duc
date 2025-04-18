package com.kltn.server.config.security;

import com.kltn.server.config.security.exception.AuthenticationError;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import com.kltn.server.error.AppException;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.BearerTokenError;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class CustomJWTValidation implements OAuth2TokenValidator<Jwt> {

    @Override
    public OAuth2TokenValidatorResult validate(Jwt token) {
        Instant ttl = token.getExpiresAt();
        if (ttl != null && !Instant.now().isAfter(ttl)) {
            return OAuth2TokenValidatorResult.success();
        }
        AuthenticationError error = AuthenticationError.INVALID_CREDENTIALS;
        throw new MyAuthenticationException(error);
    }
}
