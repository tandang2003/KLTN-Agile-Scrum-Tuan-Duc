package com.kltn.server.DTO.request;

import com.kltn.server.model.base.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Please fill your student ID")
        @Size(min = 8, max = 8, message = "Please fill correct student ID") String uniId,
        @NotBlank(message = "Password is required") String password,
        @NotBlank(message = "Please enter your full name") String name
) {

    private RegisterRequest(RegisterRequestBuilder builder) {
        this(builder.uniId, builder.password, builder.name);
    }

    public static class RegisterRequestBuilder extends BaseEntity.BaseEntityBuilder<RegisterRequest, RegisterRequestBuilder> {
        String uniId;
        String password;
        String name;

        public RegisterRequestBuilder uniId(String uniId) {
            this.uniId = uniId;
            return this;
        }

        public RegisterRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        @Override
        protected RegisterRequestBuilder self() {
            return this;
        }

        @Override
        public RegisterRequest build() {
            return new RegisterRequest(this);
        }
    }

}
