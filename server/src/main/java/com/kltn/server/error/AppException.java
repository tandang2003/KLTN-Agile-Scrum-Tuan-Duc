package com.kltn.server.error;

public class AppException extends RuntimeException {
    Error error;

    private AppException(Error error) {
        this.error = error;
    }

    public void message(String message) {
        this.error.setMessage(message);
    }

    public static AppExceptionBuilder builder() {
        return new AppExceptionBuilder();
    }


    public static class AppExceptionBuilder {
        private Error error;

        public AppException build() {
            return new AppException(error);
        }

        public AppExceptionBuilder error(Error error) {
            this.error = error;
            return this;
        }

        public AppExceptionBuilder message(String message) {
            this.error.setMessage(message);
            return this;
        }
    }

    public void setMessage(String message) {
        this.error.setMessage(message);
    }

    public Error getError() {
        return error;
    }

    public void setError(Error error) {
        this.error = error;
    }
}
