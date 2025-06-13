package com.kltn.server.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltn.server.DTO.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;


@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    ObjectMapper mapper;

    @Autowired
    public CustomAuthenticationFailureHandler(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
//        MyAuthenticationException myAuthenticationException = (MyAuthenticationException) exception;
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        String errorMessage = Optional.ofNullable(exception.getCause())
                .map(Throwable::getMessage)
                .orElse(exception.getMessage());
        ApiResponse<Object> res = ApiResponse.builder()
                .code(HttpStatus.UNAUTHORIZED.value())
                .error(errorMessage)
                .build();
        mapper.writeValue(response.getWriter(), res);
    }
}
