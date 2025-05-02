package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    @JsonIgnore
    private transient Object logData;
    private Object error;


    private ApiResponse(ApiResponseBuilder<T> tApiResponseBuilder) {
        this.error = tApiResponseBuilder.error;
        this.code = tApiResponseBuilder.code == 0 ? 200 : tApiResponseBuilder.code;
        this.message = tApiResponseBuilder.message;
        this.logData = tApiResponseBuilder.logData;
        this.data = tApiResponseBuilder.data;
    }

    public static <T> ApiResponseBuilder<T> builder() {
        return new ApiResponseBuilder<>();
    }

    public static class ApiResponseBuilder<T> {
        private int code;
        private String message;
        private T data;
        private Object error;
        private transient Object logData;

        public ApiResponseBuilder<T> code(int code) {
            this.code = code;
            return this;
        }


        public ApiResponseBuilder<T> message(String message) {
            this.message = message;
            return this;
        }

        public ApiResponseBuilder<T> data(T data) {
            this.data = data;
            return this;
        }

        public ApiResponse<T> build() {
            return new ApiResponse<>(this);
        }

        public ApiResponseBuilder<T> error(Object error) {
            this.error = error;
            return this;
        }

        public ApiResponseBuilder<T> logData(Object logData) {
            this.logData = logData;
            return this;
        }
    }

    public Object getLogData() {
        return logData;
    }

    public void setLogData(Object logData) {
        this.logData = logData;
    }

    public void setError(Object error) {
        this.error = error;
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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Object getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
