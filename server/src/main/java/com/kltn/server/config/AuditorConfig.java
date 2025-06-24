package com.kltn.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Configuration
public class AuditorConfig {
@Bean
  public AuditorAware<String> mongoAuditorConfig() {
    return () -> {
      Authentication authentication = SecurityContextHolder.getContext()
                                                           .getAuthentication();
      if (authentication != null) {
        return Optional.of(authentication.getPrincipal()
                                         .toString());
      }
      return Optional.empty();
    };
  }

  @Bean
  public AuditorAware<String> jpaAuditorConfig() {
    return () -> {
      Authentication authentication = SecurityContextHolder.getContext()
                                                           .getAuthentication();
      if (authentication != null) {
        return Optional.of(authentication.getPrincipal()
                                         .toString());
      }
      return Optional.empty();
    };
  }
}
