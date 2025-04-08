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
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;


@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Autowired
    ObjectMapper mapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        MyAuthenticationException myAuthenticationException = (MyAuthenticationException) exception;
        response.setStatus(myAuthenticationException.getError().getCode());
        String errorMessage = Optional.ofNullable(myAuthenticationException.getCause())
                .map(Throwable::getMessage)
                .orElse(myAuthenticationException.getMessage());
        ApiResponse<Object> res = ApiResponse.builder()
                .code(myAuthenticationException.getError().getCode())
                .error(errorMessage)
//                .message()
                .build();
        mapper.writeValue(response.getWriter(), res);
    }
}
