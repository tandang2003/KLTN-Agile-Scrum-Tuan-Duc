package com.kltn.server.error;

import java.util.List;
import java.util.Map;

public class AppListArgumentNotValidException extends RuntimeException {
    String message;
    List<String> errors;
    int status;

    private AppListArgumentNotValidException(AppListArgumentNotValidExceptionBuilder builder) {
        this.errors = builder.errors;
        this.message = builder.message;
        this.status = builder.status;

    }

    public List<String> getErrors() {
        return errors;
    }

    public int getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public static AppListArgumentNotValidExceptionBuilder builder() {
        return new AppListArgumentNotValidExceptionBuilder();
    }

    public static class AppListArgumentNotValidExceptionBuilder {
        private String message;
        private List<String> errors;
        private int status = 409;

        public AppListArgumentNotValidException build() {
            return new AppListArgumentNotValidException(this);
        }

        public AppListArgumentNotValidException.AppListArgumentNotValidExceptionBuilder error(List<String> errors) {
            this.errors = errors;
            return this;
        }

        public AppListArgumentNotValidException.AppListArgumentNotValidExceptionBuilder message(String message) {
            this.message = message;
            return this;
        }

        public AppListArgumentNotValidException.AppListArgumentNotValidExceptionBuilder status(int status) {
            this.status = status;
            return this;
        }
    }

}
