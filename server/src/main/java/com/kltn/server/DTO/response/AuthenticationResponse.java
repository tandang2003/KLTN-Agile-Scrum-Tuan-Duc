package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.model.base.BaseEntity;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    @JsonProperty("access_token")
    public String accessToken;
    @JsonIgnore
    private String refreshToken;
    private UserResponse userResponse;

    private AuthenticationResponse(AuthenticationResponseBuilder authenticationResponseBuilder) {
        this.accessToken = authenticationResponseBuilder.accessToken;
        this.refreshToken = authenticationResponseBuilder.refreshToken;
        this.userResponse = authenticationResponseBuilder.userResponse;
    }

    public static class AuthenticationResponseBuilder extends BaseEntity.BaseEntityBuilder<AuthenticationResponse, AuthenticationResponseBuilder> {
        public String accessToken;
        private String refreshToken;
        private UserResponse userResponse;

        public AuthenticationResponseBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public AuthenticationResponseBuilder refreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
            return this;
        }

        public AuthenticationResponseBuilder userResponse(UserResponse userResponse) {
            this.userResponse = userResponse;
            return this;
        }

        @Override
        protected AuthenticationResponseBuilder self() {
            return this;
        }

        @Override
        public AuthenticationResponse build() {
            return new AuthenticationResponse(this);
        }
    }
}
