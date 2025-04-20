package com.kltn.server.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@ConfigurationProperties(prefix = "cache")
public class CacheProperties {
    private Map<String, CacheModel> redis;

    public Map<String, CacheModel> getRedis() {
        return redis;
    }

    public void setRedis(Map<String, CacheModel> redis) {
        this.redis = redis;
    }
}
