package com.kltn.server.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltn.server.DTO.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    ObjectMapper mapper;

    @Autowired
    public CustomLogoutSuccessHandler(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        request.getSession().invalidate();
        response.setStatus(HttpServletResponse.SC_OK);
        ApiResponse<Object> apiResponse = ApiResponse.builder().message("Successfully logged out").code(HttpServletResponse.SC_OK).build();
        mapper.writeValue(response.getWriter(), apiResponse);
    }
}
