package com.kltn.server.config.security.filter;

import com.kltn.server.config.security.exception.MyAuthenticationException;
import com.kltn.server.config.security.provider.ProjectAuthorizationProvider;
import com.kltn.server.config.security.token.ProjectAuthorizationToken;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ProjectRoleAuthorizationFilter extends AbstractAuthenticationProcessingFilter {
    private final JwtDecoder jwtDecoder;

    @Autowired
    public ProjectRoleAuthorizationFilter(@Qualifier("accessTokenDecoder") JwtDecoder jwtDecoder, ProjectAuthorizationProvider projectAuthorizationProvider) {
        super("/project/");
        setAuthenticationManager(new ProviderManager(List.of(projectAuthorizationProvider)));
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String token = request.getHeader("Authorization-Project");
        if (token == null || token.isEmpty()) {
            throw new MyAuthenticationException("Authorization-Project header is missing");
        }
        Jwt jwt = jwtDecoder.decode(token);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            return this.getAuthenticationManager().authenticate(new ProjectAuthorizationToken(jwt, (UsernamePasswordAuthenticationToken) auth));
        }
        throw new MyAuthenticationException("Authentication failed");
    }

    @Override
    protected boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // ✅ Skip only GET /project/{projectId}
        if ("GET".equals(method) && path.matches("^/project/[^/]+$")) {
            return false;
        }

        return super.requiresAuthentication(request, response);
    }
}
