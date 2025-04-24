package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.Role;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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
//        private String password;
        private String email;
        private String uniId;
//        private String uniPassword;
        private String role;

        public UserDetailDTO(String id, String name, String email, String uniId, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.uniId = uniId;
//            this.uniPassword = uniPassword;
            this.role = role;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getUniId() {
            return uniId;
        }

        public void setUniId(String uniId) {
            this.uniId = uniId;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
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
