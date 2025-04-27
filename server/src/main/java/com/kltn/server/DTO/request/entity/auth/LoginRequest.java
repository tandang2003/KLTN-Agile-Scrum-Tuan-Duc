package com.kltn.server.DTO.request.entity.auth;

import com.kltn.server.model.base.BaseEntity;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank String uniId,
        @NotBlank(message = "Please fill your password") String password
) {
    public LoginRequest(LoginRequestBuilder loginRequestBuilder) {
        this(loginRequestBuilder.uniId, loginRequestBuilder.password);
    }

    public static class LoginRequestBuilder extends BaseEntity.BaseEntityBuilder<LoginRequest, LoginRequestBuilder> {
        String uniId;
        String password;

        public LoginRequestBuilder uniId(String uniId) {
            this.uniId = uniId;
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

    @Override
    public String uniId() {
        return uniId;
    }

    @Override
    public String password() {
        return password;
    }
}
