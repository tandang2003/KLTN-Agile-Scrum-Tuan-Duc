package com.kltn.server.config.security;

import com.kltn.server.config.security.filter.CustomAuthenticationFilter;
import com.kltn.server.config.security.provider.BasicAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity(debug = true)
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
    private CustomFailureHandler customFailureHandler;

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(basicAuthenticationProvider));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setAuthenticationFailureHandler(customFailureHandler);
        http.securityContext(contextConfig -> {
                    contextConfig.requireExplicitSave(false);
                })
                .addFilterBefore(customAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(ssm -> ssm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
//                .addFilterBefore(customAuthenticationFilter(), BearerTokenAuthenticationFilter.class)
//                .requiresChannel(rcc -> {
//                    rcc.anyRequest().requiresSecure();
//                })
                .authorizeHttpRequests(authorizeRequests -> {
                    authorizeRequests.requestMatchers("user/**").authenticated();
                    authorizeRequests.anyRequest().permitAll();
                })
                .oauth2ResourceServer(oauth2 -> {
                    oauth2.jwt(jwt -> {
                                jwt.decoder(accessTokenDecoder);
                                jwt.jwtAuthenticationConverter(new CustomConverterJwtToUser());

                            })
                            .authenticationEntryPoint(customAuthenticationEntryPoint);
                })
                .exceptionHandling(exc -> {
                    exc.accessDeniedHandler(customAccessDenyHandler);
                    exc.authenticationEntryPoint(customAuthenticationEntryPoint);
                })
        ;


        http.httpBasic(AbstractHttpConfigurer::disable);
        http.formLogin(c->c.disable());
        return http.build();
    }


}
