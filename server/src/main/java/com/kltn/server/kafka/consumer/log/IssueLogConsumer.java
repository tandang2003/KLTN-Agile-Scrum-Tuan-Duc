package com.kltn.server.kafka.consumer.log;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.mapper.document.ProjectLogMapper;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.LogTask;
import com.kltn.server.repository.document.ChangeLogRepository;
import com.kltn.server.repository.document.ProjectLogRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class IssueLogConsumer {
    private ChangeLogRepository changeLogRepository;

    public IssueLogConsumer(ProjectLogMapper projectLogMapper, ChangeLogRepository changeLogRepository) {
        this.changeLogRepository = changeLogRepository;
    }

    @KafkaListener(topics = "task-create", groupId = "task-create-1")
    public void consumeObj1(ChangeLogRequest project) {
        var projectLog = ChangeLog.builder()
                .type(project.type())
                .idRef(project.idRef())
                .entityTarget(project.entityTarget())
                .change(project.change())
                .propertiesTargets(project.propertiesTargets())
                .build();
        changeLogRepository.save(projectLog);
    }

    @KafkaListener(topics = "task-create", groupId = "task-create-1")
    public void consumeObj2(ChangeLogRequest project) {
        var projectLog = ChangeLog.builder()
                .type(project.type())
                .idRef(project.idRef())
                .entityTarget(project.entityTarget())
                .change((LogTask) project.change())
                .propertiesTargets(project.propertiesTargets())
                .build();
        changeLogRepository.save(projectLog);
    }

    @KafkaListener(topics = "task-create", groupId = "task-create-1")
    public void consumeObj3(ChangeLogRequest project) {
        var projectLog = ChangeLog.builder()
                .type(project.type())
                .idRef(project.idRef())
                .entityTarget(project.entityTarget())
                .change((LogTask) project.change())
                .propertiesTargets(project.propertiesTargets())
                .build();
        changeLogRepository.save(projectLog);
    }
}
