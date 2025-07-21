package com.kltn.server.schedular;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Service
public class SprintScheduler {
  private ProjectSprintRepository projectSprintRepository;
  private final TaskScheduler taskScheduler;
  // private final Map<String, ScheduledFuture<?>> tasks;
  private KafkaTemplate<String, Object> kafkaTemplate;
  private ClockSimulator clockSimulator;

  private final Map<String, ScheduledFuture<?>> tasks;
  private final Map<String, LocalDateTime> taskEndTimes;

  @Autowired
  public SprintScheduler(ClockSimulator clockSimulator, ProjectSprintRepository projectSprintRepository,
                         TaskScheduler taskScheduler, KafkaTemplate<String, Object> kafkaTemplate) {
    this.clockSimulator = clockSimulator;
    this.taskScheduler = taskScheduler;
    this.kafkaTemplate = kafkaTemplate;
    this.projectSprintRepository = projectSprintRepository;
    this.tasks = new ConcurrentHashMap<>();
    this.taskEndTimes = new ConcurrentHashMap<>();
  }

  public synchronized void scheduleSprintWithProject(String sprintId, String projectId, LocalDateTime endTime) {
    String key = sprintId + ":" + projectId;
    cancelSprintTask(key);

    Runnable task = () ->
      {
      sendMessage(sprintId, projectId);
      };
    Instant end = endTime.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
      .toInstant();
    if (clockSimulator.now()
      .isAfter(end)) {
      sendMessage(projectId, sprintId);
      return;
    }

    long delay = Duration.between(clockSimulator.now(), end)
      .getSeconds();
    delay = Math.max(0, delay);
    long timeSpeech = clockSimulator.getTimeSpeech();
    Instant now = clockSimulator.now();
    Instant scheduledTime = now.plusSeconds(delay / timeSpeech);

    ScheduledFuture<?> future = taskScheduler.schedule(task, scheduledTime);
    tasks.put(key, future);
    taskEndTimes.put(key, endTime);
  }

  public synchronized void scheduleSprintEnd(String sprintId, LocalDateTime endTime) {
    try {
      List<String> projectIds = projectSprintRepository.findProjectIdBySprintId(sprintId)
        .orElseThrow(() -> new RuntimeException("Sprint not found"));

      for (String projectId : projectIds) {
        scheduleSprintWithProject(sprintId, projectId, endTime);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public synchronized void cancelSprintTask(String key) {
    ScheduledFuture<?> future = tasks.get(key);
    if (future != null && !future.isCancelled()) {
      future.cancel(true);
      tasks.remove(key);
      taskEndTimes.remove(key);
    }
  }

  public synchronized void updateTimeSpeech(long newTimeSpeech) {
    clockSimulator.setTimeSpeech(newTimeSpeech);
    System.out.println("reset");

    Map<String, LocalDateTime> savedTasks = new HashMap<>(taskEndTimes);
    for (String key : savedTasks.keySet()) {
      cancelSprintTask(key);
    }

    for (Map.Entry<String, LocalDateTime> entry : savedTasks.entrySet()) {
      String[] ids = entry.getKey()
        .split(":");
      String sprintId = ids[0];
      String projectId = ids[1];
      scheduleSprintWithProject(sprintId, projectId, entry.getValue());
    }
  }

  public Set<String> getScheduledSprintIds() {
    return tasks.keySet();
  }

  private void sendMessage(String projectId, String sprintId) {
    String curUser = "21130171";
//      SecurityContextHolder.getContext()
//        .getAuthentication()
//        .getPrincipal()
//        .toString();

    SnapshotRequest payload = SnapshotRequest.builder()
      .projectId(projectId)
      .sprintId(sprintId)
      .build()
      ;

    ProducerRecord<String, Object> record = new ProducerRecord<>("snapshot", payload);
    record.headers().add("X-Auth-User", curUser.getBytes(StandardCharsets.UTF_8));
    kafkaTemplate.send(record);
  }
}