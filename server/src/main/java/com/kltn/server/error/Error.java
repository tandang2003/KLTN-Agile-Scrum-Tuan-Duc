package com.kltn.server.error;

import jakarta.servlet.http.HttpServletResponse;

public enum Error {
    // 4xx Client Errors
    BAD_REQUEST(HttpServletResponse.SC_BAD_REQUEST, "Bad request"),
    UNAUTHORIZED(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access"),
    FORBIDDEN(HttpServletResponse.SC_FORBIDDEN, "Access denied"),
    EXISTED_DATA(HttpServletResponse.SC_CONFLICT, "Data already exists"),
    NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "Resource not found"),
    METHOD_NOT_ALLOWED(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "HTTP method not allowed"),
    CONFLICT(HttpServletResponse.SC_CONFLICT, "Conflict with existing data"),
    PAYLOAD_TOO_LARGE(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE, "Request payload too large"),
    UNSUPPORTED_MEDIA_TYPE(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE, "Unsupported media type"),
    TOO_MANY_REQUESTS(429, "Too many requests, please try again later"),
    INVALID_PARAMETER_REQUEST(422, "Invalid parameter request"),

    CREATE_FAILED(410, "Failure to create resource"),
    INVITED_FAILED(411, "Failure to invite user"),

    ALREADY_EXISTS(409, "User already have project"),

    NOT_FOUND_PROJECT(404, "Project not found"),

    // Authentication & Token Errors
    TOKEN_EXPIRED(440, "Token has expired"),
    TOKEN_INVALID(441, "Invalid token"),
    TOKEN_MISSING(442, "Token is missing"),
    SESSION_EXPIRED(443, "User session has expired"),

    // 5xx Server Errors
    SERVER_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server error"),
    INTERNAL_SERVER_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error"),
    NOT_IMPLEMENTED(HttpServletResponse.SC_NOT_IMPLEMENTED, "Feature not implemented"),
    BAD_GATEWAY(HttpServletResponse.SC_BAD_GATEWAY, "Bad gateway"),
    SERVICE_UNAVAILABLE(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Service temporarily unavailable"),
    GATEWAY_TIMEOUT(HttpServletResponse.SC_GATEWAY_TIMEOUT, "Gateway timeout"),
    PRIVATE_KEY_READ_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error reading private key file"),
    PRIVATE_KEY_GENERATION_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error generating private key"),
    PUBLIC_KEY_READ_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error reading public key file"),
    PUBLIC_KEY_GENERATION_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error generating public key");

    private int code;
    private String message;

    Error(int code, String message) {
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
