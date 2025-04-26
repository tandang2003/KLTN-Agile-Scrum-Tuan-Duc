package com.kltn.server.service.redis;

import com.kltn.server.service.redis.config.RedisConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class UserTokenService {
    RedisTemplate<String, String> refreshTemplate;
    @Value("${cache.redis.refresh-token.ttl}")
    private long refreshTokenTtl;
    RedisTemplate<String, String> accessTemplate;
    @Value("${cache.redis.access-token.ttl}")
    private long accessTokenTtl;

    public UserTokenService(Map<String, RedisTemplate<?, ?>> redisTemplate) {
        this.refreshTemplate = (RedisTemplate<String, String>) redisTemplate.get(RedisConfig.REFRESH_TOKEN);
        this.accessTemplate = (RedisTemplate<String, String>) redisTemplate.get(RedisConfig.ACCESS_TOKEN);
    }

    public void saveRefreshTokenExpired(String accessToken, String uniId) {
        refreshTemplate.opsForValue().set(accessToken + uniId, accessToken, accessTokenTtl);
    }

    public boolean isRefreshTokenExpired(String key) {
        return refreshTemplate.hasKey(key);
    }

    public String getRefreshToken(String key) {
        return refreshTemplate.opsForValue().get(key);
    }

    public void saveAccessTokenExpired(String accessToken, String uniId) {
        accessTemplate.opsForValue().set(accessToken + uniId, accessToken, accessTokenTtl);
    }

    public boolean isAccessTokenExpired(String key) {
        return accessTemplate.hasKey(key);
    }

    public String getAccessToken(String key) {
        return accessTemplate.opsForValue().get(key);
    }
}
