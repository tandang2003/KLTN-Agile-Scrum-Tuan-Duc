package com.kltn.server.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    ObjectMapper mapper;

    @Autowired
    public CustomAuthenticationEntryPoint(ObjectMapper mapper) {
        this.mapper = mapper;
    }



    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        MyAuthenticationException myAuthenticationException = (MyAuthenticationException) authException;
        response.setStatus(myAuthenticationException.getError().getCode());
        String errorMessage = Optional.ofNullable(authException.getCause())
                .map(Throwable::getMessage)
                .orElse(authException.getMessage());
        ApiResponse<Object> res = ApiResponse.builder()
                .code(HttpStatus.UNAUTHORIZED.value())
                .error(errorMessage)
//                .message()
                .build();
        mapper.writeValue(response.getWriter(), res);

    }


}
