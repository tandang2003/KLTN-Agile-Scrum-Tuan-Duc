package com.kltn.server.error;

import java.util.List;
import java.util.Map;

public class AppMethodArgumentNotValidException extends RuntimeException {
    List<Map<String, String>> errors;

    public AppMethodArgumentNotValidException(List<Map<String, String>> errors) {
        super(null, null);
        this.errors = errors;
    }

    public List<Map<String, String>> getErrors() {
        return errors;
    }

    public static AppMethodArgumentNotValidExceptionBuilder builder() {
        return new AppMethodArgumentNotValidExceptionBuilder();
    }

    public static class AppMethodArgumentNotValidExceptionBuilder {
        private List<Map<String, String>> error;

        public AppMethodArgumentNotValidException build() {
            return new AppMethodArgumentNotValidException(error);
        }

        public AppMethodArgumentNotValidException.AppMethodArgumentNotValidExceptionBuilder error(List<Map<String, String>> error) {
            this.error = error;
            return this;
        }
    }

}
