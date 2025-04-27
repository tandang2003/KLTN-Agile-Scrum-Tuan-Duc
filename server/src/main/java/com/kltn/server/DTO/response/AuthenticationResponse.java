package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.model.base.BaseEntity;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
    @JsonProperty("user")
    private UserDetailDTO userResponse;

    private AuthenticationResponse(AuthenticationResponseBuilder authenticationResponseBuilder) {
        this.accessToken = authenticationResponseBuilder.accessToken;
        this.refreshToken = authenticationResponseBuilder.refreshToken;
        this.userResponse = authenticationResponseBuilder.userResponse;
    }

    public static AuthenticationResponseBuilder builder() {
        return new AuthenticationResponseBuilder();
    }

    public static class AuthenticationResponseBuilder extends BaseEntity.BaseEntityBuilder<AuthenticationResponse, AuthenticationResponseBuilder> {
        public String accessToken;
        private String refreshToken;
        private UserDetailDTO userResponse;

        public AuthenticationResponseBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public AuthenticationResponseBuilder refreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
            return this;
        }

        public AuthenticationResponseBuilder userResponse(UserDetailDTO userResponse) {
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

    public static class UserDetailDTO {
        private String id;
        private String name;
        private String email;
        private String uniId;
        private String role;

        public UserDetailDTO(String id, String name, String email, String uniId, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.uniId = uniId;
            this.role = role;
        }

        public String getId() {
            return id;
        }

    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public UserDetailDTO getUserResponse() {
        return userResponse;
    }
}
