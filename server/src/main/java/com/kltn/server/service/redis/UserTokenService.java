package com.kltn.server.service.redis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
@Component
public class UserTokenService {
    RedisTemplate<String, String> redisTemplate;
    @Value("${cache.redis.refresh-token.ttl}")
    private long refreshTokenTtl;


    public UserTokenService(Map<String, RedisTemplate<?, ?>> redisTemplate) {
        this.redisTemplate = (RedisTemplate<String, String>) redisTemplate.get("refreshToken");
    }

    public void saveToken(String key, String value) {
        redisTemplate.opsForValue().set(key, value, refreshTokenTtl);
    }

    public String getToken(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
