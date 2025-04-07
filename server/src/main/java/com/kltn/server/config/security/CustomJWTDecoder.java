package com.kltn.server.config.security;

import com.kltn.server.config.security.exception.AuthenticationError;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import java.security.interfaces.RSAPublicKey;
import java.time.Instant;

public class CustomJWTDecoder implements JwtDecoder {

    public JwtDecoder defaultDecoder;

    public CustomJWTDecoder(RSAPublicKey publicKey) {
        this.defaultDecoder = NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

    @Override
    public Jwt decode(String token) {
        Jwt jwt = defaultDecoder.decode(token);
        Instant ttl = jwt.getExpiresAt();
        if (ttl != null && !Instant.now().isAfter(ttl)) {
            return jwt;
        }
        throw new MyAuthenticationException(AuthenticationError.INVALID_CREDENTIALS);
    }
}
