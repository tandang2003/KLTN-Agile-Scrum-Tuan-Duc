package com.kltn.server.config.init;

import com.kltn.server.model.entity.Sprint;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.schedular.SprintScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;

@Configuration
public class SchedularRunInit implements CommandLineRunner {
    @Autowired
    private SprintScheduler sprintScheduler;
    @Autowired
    private SprintRepository sprintRepository;


    @Override
    public void run(String... args) throws Exception {
        List<Sprint> sprints = sprintRepository.findAllByDtEndAfter(ClockSimulator.now());
        sprints.forEach(sprint -> {
            sprintScheduler.scheduleSprintEnd(sprint.getId(), sprint.getDtEnd().atZone(java.time.ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDateTime());
        });
    }
}
