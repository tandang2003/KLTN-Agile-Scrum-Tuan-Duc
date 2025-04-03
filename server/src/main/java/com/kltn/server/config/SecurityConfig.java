package com.kltn.server.config;

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
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    //    private PasswordEncoder pwEncoder;
    @Autowired
    private TokenKeyUtils tokenKeyUtils;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.securityContext(contextConfig -> {
                    contextConfig.requireExplicitSave(false);
                })
                .sessionManagement(ssm -> ssm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
//                .addFilterBefore(customAuthenticationFilter(), BearerTokenAuthenticationFilter.class)
//                .requiresChannel(rcc -> {
//                    rcc.anyRequest().requiresSecure();
//                })

                .authorizeHttpRequests(authorizeRequests -> {
                    authorizeRequests.anyRequest().permitAll();
                });


        http.httpBasic(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // For Filter
//    public CustomAuthenticationFilter customAuthenticationFilter() {
//        ProviderManager providerManager = new ProviderManager(List.of(basicAuthenticationProvider));
//        providerManager.setEraseCredentialsAfterAuthentication(true);
//        return new CustomAuthenticationFilter("/auth/authentication", providerManager);
//    }

    //    For ProviderManager
//    @Bean
//    public ProviderManager providerManager() {
//        ProviderManager providerManager = new ProviderManager(List.of(basicAuthenticationProvider));
//        providerManager.setEraseCredentialsAfterAuthentication(true);
//        return providerManager;
//    }

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
        return NimbusJwtDecoder.withPublicKey(tokenKeyUtils.getAccessPublicKey()).build();
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
        return NimbusJwtDecoder.withPublicKey(tokenKeyUtils.getRefreshPublicKey()).build();
    }
}
