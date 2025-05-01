package com.kltn.server.service.redis;

import com.kltn.server.service.redis.config.RedisConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;

@Component
public class UserTokenService {
    RedisTemplate<String, String> refreshTemplate;
    @Value("${cache.redis.refresh-token.ttl}")
    private long refreshTokenTtl;
    RedisTemplate<String, String> accessTemplate;
    @Value("${cache.redis.access-token.ttl}")
    private long accessTokenTtl;
    @Autowired
    private StringRedisTemplate redisTemplate;
    public UserTokenService(Map<String, RedisTemplate<?, ?>> redisTemplates) {
        this.refreshTemplate = (RedisTemplate<String, String>) redisTemplates.get(RedisConfig.REFRESH_TOKEN.toString());
        this.accessTemplate = (RedisTemplate<String, String>) redisTemplates.get(RedisConfig.ACCESS_TOKEN.toString());
    }

    public void saveRefreshTokenExpired(String sail, String uniId, String refreshToken) {
        refreshTemplate.opsForValue().set(sail + uniId, refreshToken, Duration.ofSeconds(refreshTokenTtl));
    }

    public boolean isRefreshTokenExpired(String key) {
        return refreshTemplate.hasKey(key);
    }


}
