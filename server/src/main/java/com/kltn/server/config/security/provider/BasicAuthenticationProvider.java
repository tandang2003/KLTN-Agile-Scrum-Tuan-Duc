package com.kltn.server.config.security.provider;

import com.kltn.server.config.security.LoadUserService;
import com.kltn.server.config.security.exception.AuthenticationError;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import com.kltn.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class BasicAuthenticationProvider implements AuthenticationProvider {
    private final LoadUserService loadUserService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public BasicAuthenticationProvider(LoadUserService loadUserService, PasswordEncoder passwordEncoder) {
        this.loadUserService = loadUserService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) {
        String uniId = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        User userDetails = (User) loadUserService.loadUserByUsername(uniId);

        if (passwordEncoder.matches(password, userDetails.getPassword())) {
            authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return authentication;
        } else throw new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
