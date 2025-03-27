package com.kltn.server.config;

import com.kltn.server.model.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public class AuditorConfig implements AuditorAware<User> {
    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.empty();
    }


//    @Override
//    public Optional<User> getCurrentAuditor() {
//        Optional<UserDetails> op = Optional.of(SecurityContextHolder.getContext())
//                .map(SecurityContext::getAuthentication)
//                .filter(Authentication::isAuthenticated)
//                .map(Authentication::getPrincipal).map(UserDetails.class::cast);
//        if (op.isPresent())
//            return null;
//    }
}
