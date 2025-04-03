package com.kltn.server.config;

import com.kltn.server.model.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class InitConfig {
//    @Bean
//    public AuditorAware<User> auditorConfig() {
//        return new AuditorConfig();
//    }

}
