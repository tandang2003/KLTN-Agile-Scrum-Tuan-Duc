package com.kltn.server.config.security;


import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomConverterJwtToUser implements Converter<Jwt, UsernamePasswordAuthenticationToken> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UsernamePasswordAuthenticationToken convert(Jwt source) {
        JwtGrantedAuthoritiesConverter defaultConverter = new JwtGrantedAuthoritiesConverter();
        Collection<GrantedAuthority> defaultAuthorities = defaultConverter.convert(source);
        User user = userRepository.findByUniId(source.getClaim("uniId")).orElseThrow(() -> {
            return new RuntimeException("User not found");
        });
        List<String> roles = source.getClaimAsStringList("authorities");
        List<GrantedAuthority> roleAuthorities = roles.stream()
                .map(SimpleGrantedAuthority::new) // Prefix "ROLE_"
                .collect(Collectors.toList());
        roleAuthorities.addAll(defaultAuthorities);
        return new UsernamePasswordAuthenticationToken(user, null, roleAuthorities);
    }
}
