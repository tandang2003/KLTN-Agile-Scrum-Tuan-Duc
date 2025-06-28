package com.kltn.server;

import com.kltn.server.config.properties.CacheProperties;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.*;
import com.kltn.server.repository.document.ChangeLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.Instant;

@SpringBootApplication
@EnableConfigurationProperties(CacheProperties.class)
@EnableScheduling
@EnableMongoAuditing(auditorAwareRef = "mongoAuditorConfig")
@EnableJpaAuditing(auditorAwareRef = "jpaAuditorConfig")
public class ServerApplication {

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

}
