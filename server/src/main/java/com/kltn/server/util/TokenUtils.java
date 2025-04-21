package com.kltn.server.util;

import com.kltn.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class TokenUtils {

    @Value("${spring.application.security.access-token.time-of-life}")
    private String accessTokenTOL;

    @Value("${spring.application.security.refresh-token.time-of-life}")
    private String refreshTokenTOL;

    @Autowired
    private JwtEncoder accessJwtEncoder;
    @Autowired
    @Qualifier("refreshTokenEncoder")
    private JwtEncoder refreshJwtEncoder;

    public String generateAccessToken(Object authentication) {
        UserDetails userDetails;
        if (authentication instanceof Authentication)
            userDetails = (UserDetails) ((Authentication) authentication).getPrincipal();
        else userDetails
                = (UserDetails) authentication;
        String subject = userDetails.getUsername();
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("myApp")
                .issuedAt(now)
                .expiresAt(now.plus(getAccessTokenExpiration(), ChronoUnit.SECONDS))
                .subject(subject)
                .claim("authorities", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .claim("uniId", ((User) userDetails).getUniId())
                .build();

        return accessJwtEncoder
                .encode(JwtEncoderParameters.from(claimsSet))
                .getTokenValue();
    }

    public String generateRefreshToken(Authentication authentication) {
        UserDetails user = (UserDetails) authentication.getPrincipal();
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("myApp")
                .issuedAt(now)
                .expiresAt(now.plus(getRefreshTokenExpiration(), ChronoUnit.SECONDS))
                .subject(user.getUsername())
                .claim("uniId", ((User) user).getUniId())
                .build();

        return refreshJwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    public long getAccessTokenExpiration() {
        return Duration.parse("PT" + accessTokenTOL.toUpperCase()).getSeconds();
    }

    public long getRefreshTokenExpiration() {
        return Duration.parse("PT" + refreshTokenTOL.toUpperCase()).getSeconds();
    }
}
