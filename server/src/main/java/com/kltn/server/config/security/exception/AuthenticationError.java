package com.kltn.server.config.security.exception;

import jakarta.servlet.http.HttpServletResponse;

public enum AuthenticationError {
    INVALID_CREDENTIALS(HttpServletResponse.SC_UNAUTHORIZED, "Invalid credentials"),
    AUTHENTICATED_FAILURE(422, "Email or password invalid");

    private int code;
    private String message;

    AuthenticationError(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
