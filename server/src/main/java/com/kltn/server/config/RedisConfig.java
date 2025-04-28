package com.kltn.server.config;

import com.kltn.server.config.properties.CacheProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class RedisConfig {
    @Bean
    public RedisConnectionFactory connectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public Map<String, RedisTemplate<?, ?>> redisTemplates(RedisConnectionFactory connectionFactory,
                                                           @Autowired CacheProperties cacheProperties) {
        Map<String, RedisTemplate<?, ?>> redisTemplates = new HashMap<>();
        cacheProperties.getRedis().forEach((k, v) -> {
            RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
            redisTemplate.setConnectionFactory(connectionFactory);
            redisTemplate.setKeySerializer(createSerializer(v.getKeySerializer(), true));
            redisTemplate.setValueSerializer(createSerializer(v.getValueSerializer(), false));
            redisTemplate.afterPropertiesSet();
            redisTemplates.put(k, redisTemplate);
        });
        return redisTemplates;
    }

    private RedisSerializer<?> createSerializer(String className, boolean isKey) {
        if (className == null || className.isBlank())
            return isKey ? new StringRedisSerializer() : new Jackson2JsonRedisSerializer<>(Object.class);
        try {
            Class<?> clazz = Class.forName(className);
            Object instance = clazz.getDeclaredConstructor().newInstance();
            if (!(instance instanceof RedisSerializer<?>))
                throw new IllegalArgumentException("Provided class is not a RedisSerializer: " + className);
            return (RedisSerializer<?>) instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to instantiate RedisSerializer: " + className, e);
        }
    }
}
