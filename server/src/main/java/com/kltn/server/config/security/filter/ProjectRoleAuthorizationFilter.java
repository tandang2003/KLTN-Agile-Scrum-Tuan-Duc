package com.kltn.server.config.security.filter;

import com.kltn.server.config.security.exception.AuthenticationError;
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
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

//@Component
public class ProjectRoleAuthorizationFilter extends AbstractAuthenticationProcessingFilter {
    private final JwtDecoder jwtDecoder;


//    @Autowired
    public ProjectRoleAuthorizationFilter(JwtDecoder jwtDecoder) {
//        super("/project/");
        super(new OrRequestMatcher(
                new AntPathRequestMatcher("/project/**"),
                new AntPathRequestMatcher("/sprint/**")
        ));
//        setAuthenticationManager(new ProviderManager(List.of(projectAuthorizationProvider)));
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String token = request.getHeader("Project-Authorization");
        if (token == null || token.isEmpty()) {
            throw new MyAuthenticationException("Authorization-Project header is missing");
        }
        Jwt jwt;
        try {
            jwt = jwtDecoder.decode(token);
        } catch (JwtException ex) {
            throw MyAuthenticationException.builder().error(AuthenticationError.INVALID_CREDENTIALS).build();
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            ProjectAuthorizationToken authToken = new ProjectAuthorizationToken(jwt, (UsernamePasswordAuthenticationToken) auth);
            authToken.setDetails(authenticationDetailsSource.buildDetails(request));
            return this.getAuthenticationManager().authenticate(authToken);
        }
        throw new MyAuthenticationException("Authentication failed");
    }

    @Override
    protected boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // ✅ Skip only GET /project/{projectId}
        if ("GET".equals(method) && path.matches("^/project/[^/]+$"))
            return false;

        if ("POST".equals(method) && path.matches("^/project+$"))
            return false;

        if ("POST".equals(method) && path.matches("^/sprint+$"))
            return false;

        return super.requiresAuthentication(request, response);
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, jakarta.servlet.FilterChain chain, Authentication authResult) {
        try {
            SecurityContextHolder.getContext().setAuthentication(authResult);
            chain.doFilter(request, response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ServletException e) {
            throw new RuntimeException(e);
        }
    }
}
