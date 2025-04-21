package com.kltn.server.model.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "user_token", timeToLive = 432000)
public class UserToken {
    @Id
    String refreshToken;
    String accessToken;
    public UserToken(){}
    private UserToken(UserTokenBuilder builder) {
        this.refreshToken = builder.refreshToken;
        this.accessToken = builder.accessToken;
    }

    public static class UserTokenBuilder {
         String refreshToken;
         String accessToken;

        public UserTokenBuilder refreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
            return this;
        }

        public UserTokenBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public UserToken build() {
            return new UserToken(this);
        }
    }

    public static UserTokenBuilder builder() {
        return new UserTokenBuilder();
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }


}
