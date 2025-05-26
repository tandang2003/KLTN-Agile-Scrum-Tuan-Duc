package com.kltn.server.service.redis.config;

public enum RedisConfig {

    REFRESH_TOKEN("refresh-token"),

    ACCESS_TOKEN("access-token")
    ;


    private final String key;

    RedisConfig(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    @Override
    public String toString() {
        return key;
    }
}
