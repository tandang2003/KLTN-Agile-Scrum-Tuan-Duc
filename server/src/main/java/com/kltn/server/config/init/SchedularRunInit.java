package com.kltn.server.config.init;

import com.kltn.server.model.entity.Sprint;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.schedular.PredictScheduler;
import com.kltn.server.schedular.PredictSecondScheduler;
import com.kltn.server.schedular.SprintScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.util.List;

@Configuration
public class SchedularRunInit implements CommandLineRunner {
  @Autowired
  private SprintScheduler sprintScheduler;
  @Autowired
  private SprintRepository sprintRepository;
  @Autowired
  private PredictScheduler predictScheduler;
  @Autowired
  private PredictSecondScheduler predictSecondScheduler;

  @Override
  public void run(String... args) throws Exception {
    List<Sprint> sprints = sprintRepository.findAllByDtEndAfter(ClockSimulator.now());
    sprints.forEach(sprint -> {
      sprintScheduler.scheduleSprintEnd(sprint.getId(), sprint.getDtEnd()
        .atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
      // predictScheduler.scheduleSprintEnd(sprint.getId(),
      // sprint.getDtPredict().atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDateTime());
    });
    List<Sprint> predictSprints = sprintRepository.findALlByDtPredictAfter(ClockSimulator.now());
    predictSprints.forEach(sprint -> {
      predictScheduler.scheduleSprintEnd(sprint.getId(), sprint.getDtPredict()
        .atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
    });

    List<Sprint> predictSecondSprints = sprintRepository.findALlByDtPredictSecondAfter(ClockSimulator.now());
    predictSecondSprints.stream().forEach(sprint -> {
      predictSecondScheduler.scheduleSprintEnd(sprint.getId(), sprint.getDtPredictSecond()
        .atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
        .toLocalDateTime());
    });
  }
}
