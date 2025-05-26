package com.kltn.server.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltn.server.DTO.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAccessDenyHandler implements AccessDeniedHandler {
    private final ObjectMapper mapper;

    public CustomAccessDenyHandler(ObjectMapper jacksonObjectMapper) {
        this.mapper = jacksonObjectMapper;
    }


    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(403);
        String errorMessage = Optional.ofNullable(accessDeniedException.getCause()).map(Throwable::getMessage).orElse(accessDeniedException.getMessage());
        ApiResponse<Object> res = ApiResponse.builder().code(HttpStatus.FORBIDDEN.value()).error(errorMessage).message("User not have permission").build();
        response.setStatus(HttpStatus.FORBIDDEN.value());
        mapper.writeValue(response.getWriter(), res);
    }


}
