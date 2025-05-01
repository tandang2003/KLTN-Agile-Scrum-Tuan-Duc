package com.kltn.server.config.security;

import com.kltn.server.config.properties.ApplicationProps;
import com.kltn.server.config.security.filter.CustomAuthenticationFilter;
import com.kltn.server.config.security.provider.BasicAuthenticationProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtDecoder accessTokenDecoder;

    @Autowired
    private BasicAuthenticationProvider basicAuthenticationProvider;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Autowired
    private CustomAccessDenyHandler customAccessDenyHandler;

    @Autowired
    private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
    @Autowired
    private CustomConverterJwtToUser customConverterJwtToUser;
    @Autowired
    private CustomLogoutHandler customLogoutHandler;
    @Autowired
    private CustomLogoutSuccessHandler customLogoutSuccessHandler;
    @Autowired
    private ApplicationProps applicationProps;

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(basicAuthenticationProvider));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setAuthenticationFailureHandler(customAuthenticationFailureHandler);
        http.securityContext(contextConfig -> {
                    contextConfig.requireExplicitSave(false);
                })
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(logoutConfig -> {
                    logoutConfig
                            .logoutUrl("/auth/logout")
                            .addLogoutHandler(customLogoutHandler)
                            .logoutSuccessHandler(customLogoutSuccessHandler)
                            .deleteCookies("refresh_token");
                })
                .addFilterBefore(customAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(ssm -> ssm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(authorizeRequests -> {
//                    authorizeRequests.requestMatchers("user/**").authenticated();
                    authorizeRequests.requestMatchers(applicationProps.getWhitelist().toArray(String[]::new )).permitAll();
                    authorizeRequests.anyRequest().authenticated();
                })
                .oauth2ResourceServer(oauth2 -> {
                    oauth2.jwt(jwt -> {
                                jwt.decoder(accessTokenDecoder);
                                jwt.jwtAuthenticationConverter(customConverterJwtToUser);
                            })
                            .authenticationEntryPoint(customAuthenticationEntryPoint);
                })
                .exceptionHandling(exc -> {
                    exc.accessDeniedHandler(customAccessDenyHandler);
                    exc.authenticationEntryPoint(customAuthenticationEntryPoint);
                });

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
