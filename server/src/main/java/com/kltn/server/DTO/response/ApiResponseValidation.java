package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseValidation {
    private int code;
    private String message;
    private FieldError[] error;

    public ApiResponseValidation() {
    }

    public ApiResponseValidation(int code, String message, FieldError[] error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }


    public static class FieldError {
        private String field;
        private String message;

        public FieldError(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public FieldError() {
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public FieldError[] getError() {
        return error;
    }

    public void setError(FieldError[] error) {
        this.error = error;
    }
}
