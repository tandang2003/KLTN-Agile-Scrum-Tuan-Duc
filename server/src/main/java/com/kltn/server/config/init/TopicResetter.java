package com.kltn.server.config.init;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class TopicResetter {

  @Value("${spring.kafka.bootstrap-servers}")
  private String bootstrapServers;

  private final List<String> topicNames = Arrays.asList(
    "predict", "snapshot", "task-log", "send-mail"
  );

  @Bean
  public ApplicationRunner resetKafkaTopic() {
    return args -> {
      try (AdminClient adminClient = AdminClient.create(
        Collections.singletonMap("bootstrap.servers", bootstrapServers))) {

        // Delete all topics
        adminClient.deleteTopics(topicNames).all().get();

        // Wait for deletion to propagate
        Thread.sleep(2000);

        // Recreate topics
        for (String topicName : topicNames) {
          NewTopic newTopic = TopicBuilder.name(topicName)
            .partitions(1)
            .replicas(1)
            .build();
          adminClient.createTopics(Collections.singleton(newTopic)).all().get();
        }
      }
    };
  }
}
