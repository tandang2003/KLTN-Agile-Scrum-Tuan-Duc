package com.kltn.server.schedular;

import com.kltn.server.DTO.request.kafka.SprintPredictRequest;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.TaskScheduler;
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
public class PredictScheduler {
  private ProjectSprintRepository projectSprintRepository;
  private final TaskScheduler predictScheduler;
  // private final Map<String, ScheduledFuture<?>> tasks;
  private KafkaTemplate<String, Object> kafkaTemplate;
  private ClockSimulator clockSimulator;

  private final Map<String, ScheduledFuture<?>> tasks;
  private final Map<String, LocalDateTime> taskEndTimes;

  @Autowired
  public PredictScheduler(ClockSimulator clockSimulator, ProjectSprintRepository projectSprintRepository,
                          @Qualifier("predictThreadScheduler") TaskScheduler predictScheduler,
                          KafkaTemplate<String, Object> kafkaTemplate) {
    this.clockSimulator = clockSimulator;
    this.predictScheduler = predictScheduler;
    this.kafkaTemplate = kafkaTemplate;
    this.projectSprintRepository = projectSprintRepository;
    this.tasks = new ConcurrentHashMap<>();
    this.taskEndTimes = new ConcurrentHashMap<>();
  }

  public synchronized void scheduleSprint(String sprintId, LocalDateTime dtPredict) {
    cancelSprintTask(sprintId);
    Runnable task = () -> {
      sendMessage(sprintId);
    };
    Instant end = dtPredict.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
      .toInstant();
    if (clockSimulator.now()
      .isAfter(end)) {
      sendMessage(sprintId);
      return;
    }

    long delay = Duration.between(clockSimulator.now(), end)
      .getSeconds();
    delay = Math.max(0, delay);
    long timeSpeech = clockSimulator.getTimeSpeech();
    Instant now = clockSimulator.now();
    Instant scheduledTime = now.plusSeconds(delay / timeSpeech);

    ScheduledFuture<?> future = predictScheduler.schedule(task, scheduledTime);
    tasks.put(sprintId, future);
    taskEndTimes.put(sprintId, dtPredict);
  }

  public synchronized void scheduleSprintEnd(String sprintId, LocalDateTime endTime) {
    try {
      scheduleSprint(sprintId, endTime);
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
      scheduleSprint(sprintId, entry.getValue());
    }
  }

  public Set<String> getScheduledSprintIds() {
    return tasks.keySet();
  }

  private void sendMessage(String sprintId) {
    List<ProjectSprint> projectSprints = projectSprintRepository.findBySprintId(sprintId);
    for (ProjectSprint projectSprint : projectSprints) {
      String curUser = "21130171";
      SprintPredictRequest payload = SprintPredictRequest.builder()
        .projectId(projectSprint.getProject().getId())
        .sprintId(projectSprint.getSprint().getId())
        .build();

      ProducerRecord<String, Object> record = new ProducerRecord<>("predict", payload);
      record.headers().add("X-Auth-User", curUser.getBytes(StandardCharsets.UTF_8));
      kafkaTemplate.send(record);
    }
  }
}
