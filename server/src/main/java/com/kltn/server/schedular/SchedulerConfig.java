package com.kltn.server.schedular;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class SchedulerConfig {
  @Bean
  @Primary
  public TaskScheduler taskScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(10);
    scheduler.setThreadNamePrefix("DynamicScheduler-");
    scheduler.initialize();
    return scheduler;
  }

  @Bean
  @Qualifier("predictThreadScheduler")
  public TaskScheduler predictThreadScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(10);
    scheduler.setThreadNamePrefix("DynamicScheduler-");
    scheduler.initialize();
    return scheduler;
  }

  @Bean
  @Qualifier("predictSecondThreadScheduler")
  public TaskScheduler predictSecondThreadScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(10);
    scheduler.setThreadNamePrefix("DynamicScheduler-");
    scheduler.initialize();
    return scheduler;
  }
}
