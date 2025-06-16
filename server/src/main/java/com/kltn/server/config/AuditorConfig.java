package com.kltn.server.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorConfig implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext()
                                        .getAuthentication();
    if (authentication != null) {
      return Optional.of(authentication.getPrincipal().toString());
    }
    return Optional.empty();
  }

}
