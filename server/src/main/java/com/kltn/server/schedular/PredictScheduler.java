package com.kltn.server.schedular;

import com.kltn.server.DTO.request.kafka.SprintPredictRequest;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.entity.SprintService;
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
  private final SprintService sprintService;
  private ProjectSprintRepository projectSprintRepository;
  private final TaskScheduler predictScheduler;
  private KafkaTemplate<String, Object> kafkaTemplate;
  private ClockSimulator clockSimulator;

  private final Map<String, ScheduledFuture<?>> tasks;
  //  private final Map<String, LocalDateTime> taskEndTimes;
  private final Map<String, TaskInfo> taskEndTimes = new ConcurrentHashMap<>();

  public void scheduleSprint(String id, Instant predict) {

    if(taskEndTimes.containsKey(id)) {
      TaskInfo taskInfo = taskEndTimes.get(id);
      cancelSprintTask(id);
      if (taskInfo.isSecond)
        scheduleSprintSecond(id, predict.atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
          .toLocalDateTime());
      else   scheduleSprintFirst(id, predict.atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
    }

  }

  private static class TaskInfo {
    LocalDateTime endTime;
    boolean isSecond; // false = first, true = second

    TaskInfo(LocalDateTime endTime, boolean isSecond) {
      this.endTime = endTime;
      this.isSecond = isSecond;
    }
  }

  @Autowired
  public PredictScheduler(ClockSimulator clockSimulator, ProjectSprintRepository projectSprintRepository,
                          @Qualifier("predictThreadScheduler") TaskScheduler predictScheduler,
                          KafkaTemplate<String, Object> kafkaTemplate, SprintService sprintService) {
    this.clockSimulator = clockSimulator;
    this.predictScheduler = predictScheduler;
    this.kafkaTemplate = kafkaTemplate;
    this.projectSprintRepository = projectSprintRepository;
    this.tasks = new ConcurrentHashMap<>();
//    this.taskEndTimes = new ConcurrentHashMap<>();
    this.sprintService = sprintService;
  }

  public synchronized void scheduleSprintFirst(String sprintId, LocalDateTime dtPredict) {
    cancelSprintTask(sprintId);
    Instant end = dtPredict.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
      .toInstant();
    if (ClockSimulator.now()
      .isAfter(end)) {
      sendMessage(sprintId, false);
      Sprint sprint = sprintService.getSprintById(sprintId);
      scheduleSprintSecond(sprintId, sprint.getDtPredictSecond().atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
      return;
    }
    Runnable task = () -> {
      sendMessage(sprintId, false);
      Sprint sprint = sprintService.getSprintById(sprintId);
      scheduleSprintSecond(sprintId, sprint.getDtPredictSecond().atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
    };
    long timeSpeech = ClockSimulator.getTimeSpeech();
    Duration virtualDuration = Duration.between(ClockSimulator.now(), end);
    long adjustedDelaySeconds = virtualDuration.getSeconds() / timeSpeech;

    Instant scheduledTime = Instant.now().plusSeconds(adjustedDelaySeconds);

    ScheduledFuture<?> future = predictScheduler.schedule(task, scheduledTime);
    tasks.put(sprintId, future);
//    tasks.put(sprintId, future);
    taskEndTimes.put(sprintId, new TaskInfo(dtPredict, false));
  }

  public synchronized void scheduleSprintSecond(String sprintId, LocalDateTime dtPredict) {
    cancelSprintTask(sprintId);

    Instant end = dtPredict.atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
      .toInstant();
    if (ClockSimulator.now()
      .isAfter(end)) {
      sendMessage(sprintId, true);
      return;
    }
    Runnable task = () -> {
      sendMessage(sprintId, true);

    };
    long timeSpeech = ClockSimulator.getTimeSpeech();
    Duration virtualDuration = Duration.between(ClockSimulator.now(), end);
    long adjustedDelaySeconds = virtualDuration.getSeconds() / timeSpeech;

    Instant scheduledTime = Instant.now().plusSeconds(adjustedDelaySeconds);

    ScheduledFuture<?> future = predictScheduler.schedule(task, scheduledTime);
    tasks.put(sprintId, future);
    taskEndTimes.put(sprintId, new TaskInfo(dtPredict, true));
  }

//  public synchronized void scheduleSprintEnd(String sprintId, LocalDateTime endTime) {
//    try {
//      scheduleSprint(sprintId, endTime);
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
//  }

  public synchronized void cancelSprintTask(String key) {

    ScheduledFuture<?> future = tasks.get(key);
    if (future != null && !future.isCancelled()) {
      future.cancel(true);

    }
    tasks.remove(key);
    taskEndTimes.remove(key);
  }

  public synchronized void updateTimeSpeech(long newTimeSpeech) {
    clockSimulator.setTimeSpeech(newTimeSpeech);
    System.out.println("reset");

    Map<String, TaskInfo> savedTasks = new HashMap<>(taskEndTimes);

    for (Map.Entry<String, TaskInfo> entry : savedTasks.entrySet()) {
      String sprintId = entry.getKey();
      TaskInfo info = entry.getValue();
      cancelSprintTask(sprintId);
      if (info.isSecond) {
        scheduleSprintSecond(sprintId, info.endTime);
      } else {
        scheduleSprintFirst(sprintId, info.endTime);
      }
    }
  }

//
//  public synchronized void updateTimeSpeech(long newTimeSpeech) {
//    clockSimulator.setTimeSpeech(newTimeSpeech);
//    System.out.println("reset");
//
//    Map<String, LocalDateTime> savedTasks = new HashMap<>(taskEndTimes);
//    for (Map.Entry<String, LocalDateTime> entry : savedTasks.entrySet()) {
//      String[] ids = entry.getKey()
//        .split(":");
//      String sprintId = ids[0];
//      cancelSprintTask(sprintId);
//
//      scheduleSprint(sprintId, entry.getValue());
//    }
//  }

  public Set<String> getScheduledSprintIds() {
    return tasks.keySet();
  }

  private void sendMessage(String sprintId, boolean f) {

    List<ProjectSprint> projectSprints = projectSprintRepository.findBySprintId(sprintId);
    for (ProjectSprint projectSprint : projectSprints) {
      String curUser = "21130171";
      SprintPredictRequest payload = SprintPredictRequest.builder()
        .projectId(projectSprint.getProject().getId())
        .sprintId(projectSprint.getSprint().getId())
        .isResult(f)
        .build();

      ProducerRecord<String, Object> record = new ProducerRecord<>("predict", payload);
      record.headers().add("X-Auth-User", curUser.getBytes(StandardCharsets.UTF_8));
      kafkaTemplate.send(record);
    }
  }
}
