package com.kltn.server.config.provider;

import com.kltn.server.config.LoadUserService;
import com.kltn.server.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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
    public Authentication authenticate(Authentication authentication) {
        String uniId = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();
//                passwordEncoder.encode(authentication.getCredentials().toString());

        User userDetails = (User) loadUserService.loadUserByUsername(uniId);

        if (passwordEncoder.matches(password, userDetails.getPassword())) {
            userDetails.setPassword(null);
            Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
            return auth;
//      Todo: configuration Authentication result
        } else throw new AuthenticationException("Invalid credentials") {
            @Override
            public String getMessage() {
                return "Invalid credentials";
            }
        };
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
