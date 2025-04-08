package com.kltn.server.config.security;

import com.kltn.server.config.security.exception.AuthenticationError;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import com.kltn.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class LoadUserService implements UserDetailsService {
    UserRepository userRepository;

    @Autowired
    public LoadUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String uniId) {
        return userRepository.findByUniId(uniId).orElseThrow(() ->
                new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE));
    }
}
