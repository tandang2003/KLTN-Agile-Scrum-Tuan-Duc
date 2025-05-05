package com.kltn.server.config;

import com.kltn.server.config.properties.CacheProperties;
import com.kltn.server.config.security.CustomJWTValidation;
import com.kltn.server.util.token.TokenKeyUtils;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

@Configuration
@EnableAspectJAutoProxy
@EnableJpaAuditing
public class InitConfig {

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
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withPublicKey(tokenKeyUtils.getAccessPublicKey()).build();
        decoder.setJwtValidator(tokenValidator());
        return decoder;
    }

    @Bean
    OAuth2TokenValidator<Jwt> tokenValidator() {
        return new CustomJWTValidation();
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
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withPublicKey(tokenKeyUtils.getRefreshPublicKey()).build();
        decoder.setJwtValidator(tokenValidator());
        return decoder;
    }

    @Bean
    @Qualifier("verifyTokenEncoder")
    JwtEncoder verifyTokenEncoder() {
        JWK jwk = new RSAKey.Builder(tokenKeyUtils.getVerifyPublicKey()).privateKey(tokenKeyUtils.getVerifyPrivateKey()).build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    @Qualifier("verifyTokenDecoder")
    JwtDecoder verifyTokenDecoder() {
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withPublicKey(tokenKeyUtils.getVerifyPublicKey()).build();
//        decoder.setJwtValidator(tokenValidator());
        return decoder;
    }

}
