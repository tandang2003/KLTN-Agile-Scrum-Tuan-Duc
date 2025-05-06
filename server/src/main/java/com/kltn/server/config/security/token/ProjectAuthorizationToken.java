package com.kltn.server.config.security.token;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;

public class ProjectAuthorizationToken extends JwtAuthenticationToken {
    private UsernamePasswordAuthenticationToken authentication;

    public ProjectAuthorizationToken(Jwt jwt, UsernamePasswordAuthenticationToken authentication) {
        super(jwt, authentication.getAuthorities());
        this.authentication = authentication;
    }

    //    public ProjectAuthorizationToken(Jwt jwt) {
//        super(jwt);
//    }
    public UsernamePasswordAuthenticationToken getAuthentication() {
        return authentication;
    }
}
