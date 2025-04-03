package com.kltn.server.config;

import com.kltn.server.model.entity.User;
import com.kltn.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class LoadUserService implements UserDetailsService {
    UserRepository userRepository;

    @Autowired
    public LoadUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String uniId) {
        return userRepository.findByUniId(uniId).orElseThrow(RuntimeException::new);
    }
}
