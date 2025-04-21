package com.kltn.server.config;

import com.kltn.server.config.properties.CacheProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisSentinelConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableRedisRepositories(basePackages="com.kltn.server.repository.redis")
public class RedisConfig {
    @Bean
    public RedisConnectionFactory connectionFactory() {
        return new LettuceConnectionFactory();
    }

    //    @Bean
//    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
//
//        RedisTemplate<byte[], byte[]> template = new RedisTemplate<byte[], byte[]>();
//        template.setConnectionFactory(redisConnectionFactory);
//        return template;
//    }
    @Bean
    public Map<String, RedisTemplate<?, ?>> redisTemplates(RedisConnectionFactory connectionFactory,
                                                           CacheProperties cacheProperties) {
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


    //    cache manager bean
//    @Bean
//    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
//        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration
//                .defaultCacheConfig()
//                .enableTimeToIdle()
//                .disableCachingNullValues();
//
//        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
//        cacheProperties.getRedis().forEach((k, v) -> {
//            RedisSerializationContext.SerializationPair<String> keySerializer =
//                    (RedisSerializationContext.SerializationPair<String>)
//                            RedisSerializationContext.SerializationPair
//                                    .fromSerializer(createSerializer(v.getKeySerializer(), true)
//                                    );
//            RedisCacheConfiguration config = defaultConfig
//                    .serializeKeysWith(keySerializer)
//                    .serializeValuesWith(
//                            RedisSerializationContext
//                                    .SerializationPair
//                                    .fromSerializer(
//                                            createSerializer(v.getValueSerializer(), false)
//                                    )
//                    )
//                    .entryTtl(Duration.ofSeconds(Long.parseLong(v.getTti())));
//            cacheConfigurations.put(k, config);
//        });
//        return RedisCacheManager.builder(connectionFactory)
//                .cacheDefaults(defaultConfig)
//                .transactionAware()
//                .withInitialCacheConfigurations(cacheConfigurations)
//                .build();
//    }
//
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
