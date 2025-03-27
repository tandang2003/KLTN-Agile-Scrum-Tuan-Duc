package com.kltn.server.DTO.request;

import com.kltn.server.model.base.BaseEntity;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank String email,
        @NotBlank(message = "Please fill your password") String password
) {
    public LoginRequest(LoginRequestBuilder loginRequestBuilder) {
        this(loginRequestBuilder.email, loginRequestBuilder.password);
    }

    public static class LoginRequestBuilder extends BaseEntity.BaseEntityBuilder<LoginRequest, LoginRequestBuilder> {
        String email;
        String password;

        public LoginRequestBuilder email(String email) {
            this.email = email;
            return this;
        }

        public LoginRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        @Override
        protected LoginRequestBuilder self() {
            return this;
        }

        @Override
        public LoginRequest build() {
            return new LoginRequest(this);
        }
    }
}
