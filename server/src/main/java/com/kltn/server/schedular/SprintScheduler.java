package com.kltn.server.schedular;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.entity.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
public class SprintScheduler {
  private ProjectSprintRepository projectSprintRepository;
  private final TaskScheduler taskScheduler;
  //  private final Map<String, ScheduledFuture<?>> tasks;
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

    Runnable task = () -> {
      System.out.println("send messeage");
      kafkaTemplate.send("snapshot", SnapshotRequest.builder()
                                                    .projectId(projectId)
                                                    .sprintId(sprintId)
                                                    .build());
    };
    Instant end = endTime.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
                         .toInstant();
    if (clockSimulator.now()
                      .isAfter(end) ){
      System.out.println("special case");
      kafkaTemplate.send("snapshot", SnapshotRequest.builder()
                                                    .projectId(projectId)
                                                    .sprintId(sprintId)
                                                    .build());
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
}