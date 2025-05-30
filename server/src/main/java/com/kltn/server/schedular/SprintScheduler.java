package com.kltn.server.schedular;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
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
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
public class SprintScheduler {
    private ProjectSprintRepository projectSprintRepository;
    private final TaskScheduler taskScheduler;
    private final Map<String, ScheduledFuture<?>> tasks;
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.time-speech}")
    private long timeSpeech;

    @Autowired
    public SprintScheduler(ProjectSprintRepository projectSprintRepository, TaskScheduler taskScheduler, KafkaTemplate<String, Object> kafkaTemplate) {
        this.taskScheduler = taskScheduler;
        this.kafkaTemplate = kafkaTemplate;
        this.projectSprintRepository = projectSprintRepository;
        this.tasks = new ConcurrentHashMap<>();
    }

    public void scheduleSprintWithProject(String sprintId, String projectId, LocalDateTime endTime) {
        String key = sprintId + projectId;
        cancelSprintTask(key);
        Runnable task = () -> {
            kafkaTemplate.send("snapshot", SnapshotRequest.builder().projectId(projectId).sprintId(sprintId).build());
        };
        long delay = Duration.between(LocalDateTime.now(), endTime).getSeconds();
        delay = Math.max(0, delay);
        Instant now = Instant.now().plusSeconds(delay / timeSpeech);
        ScheduledFuture<?> future = taskScheduler.schedule(task, now);
        tasks.put(key, future);
    }

    public void scheduleSprintEnd(String sprintId, LocalDateTime endTime) {
        try {
            List<String> projectId = projectSprintRepository.findProjectIdBySprintId(sprintId).orElseThrow(() -> new RuntimeException("Sprint not found"));
            projectId.forEach(prj -> {
                scheduleSprintWithProject(sprintId, prj, endTime);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void cancelSprintTask(String key) {
        ScheduledFuture<?> future = tasks.get(key);
        if (future != null && !future.isCancelled()) {
            future.cancel(true);
            tasks.remove(key);
        }
    }

    public Set<String> getScheduledSprintIds() {
        return tasks.keySet();
    }
}