package com.kltn.server.config.security.exception;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import org.springframework.security.core.AuthenticationException;

public class MyAuthenticationException extends AuthenticationException {
    private AuthenticationError error;

    public MyAuthenticationException(AuthenticationError error) {
        super(error.getMessage());
        this.error = error;
    }

    public static MyAuthenticationExceptionBuilder builder() {
        return new MyAuthenticationExceptionBuilder();
    }

    public static class MyAuthenticationExceptionBuilder {
        private AuthenticationError error;

        public MyAuthenticationException build() {
            return new MyAuthenticationException(error);
        }

        public MyAuthenticationExceptionBuilder error(AuthenticationError error) {
            this.error = error;
            return this;
        }
    }

    public MyAuthenticationException(String msg) {
        super(msg);
        this.error = AuthenticationError.AUTHENTICATED_FAILURE;
        error.setMessage(msg);
    }

    public AuthenticationError getError() {
        return error;
    }

    public void setError(AuthenticationError error) {
        this.error = error;
    }
}
