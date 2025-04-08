package com.kltn.server.config;

import com.kltn.server.config.security.CustomJWTDecoder;
import com.kltn.server.config.security.LoadUserService;
import com.kltn.server.config.security.provider.BasicAuthenticationProvider;
import com.kltn.server.model.entity.User;
import com.kltn.server.util.TokenKeyUtils;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

@Configuration
@EnableJpaAuditing
public class InitConfig {
    //    @Bean
//    public AuditorAware<User> auditorConfig() {
//        return new AuditorConfig();
//    }
    private TokenKeyUtils tokenKeyUtils;

    @Autowired
    public InitConfig(TokenKeyUtils tokenKeyUtils) {
        this.tokenKeyUtils = tokenKeyUtils;
    }

    public InitConfig() {
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // For JWT
    @Bean
    @Primary
    JwtEncoder accessTokenEncoder() {
        JWK jwk = new RSAKey.Builder(tokenKeyUtils.getAccessPublicKey()).privateKey(tokenKeyUtils.getAccessPrivateKey()).build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    @Primary
    JwtDecoder accessTokenDecoder() {
        return new CustomJWTDecoder(tokenKeyUtils.getAccessPublicKey());
    }

    @Bean
    @Qualifier("refreshTokenEncoder")
    JwtEncoder refreshTokenEncoder() {
        JWK jwk = new RSAKey.Builder(tokenKeyUtils.getRefreshPublicKey()).privateKey(tokenKeyUtils.getRefreshPrivateKey()).build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    @Qualifier("refreshTokenDecoder")
    JwtDecoder refreshTokenDecoder() {
        return new CustomJWTDecoder(tokenKeyUtils.getRefreshPublicKey());
    }
}
