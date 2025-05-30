package com.kltn.server;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.time.Instant;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class test {
    public static void main(String[] args) {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(10);
        scheduler.setThreadNamePrefix("DynamicScheduler-");
        scheduler.initialize();
        TaskScheduler taskScheduler = scheduler;
        AtomicInteger index = new AtomicInteger();
        Runnable task = () -> System.out.println("Running at: " + index.getAndIncrement());

        // Delay 5 seconds before first execution, then run every 2 seconds
        Instant runAt = Instant.now().plusSeconds(15);

        taskScheduler.schedule(
                task,
                runAt    // delay between executions
        );
    }
}
