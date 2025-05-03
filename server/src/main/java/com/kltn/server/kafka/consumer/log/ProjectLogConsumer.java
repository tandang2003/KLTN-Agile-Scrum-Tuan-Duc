package com.kltn.server.kafka.consumer.log;

import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.mapper.document.ProjectLogMapper;
import com.kltn.server.model.collection.Project;
import com.kltn.server.repository.document.ProjectLogRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProjectLogConsumer {
    private ProjectLogRepository projectLogRepository;
    private ProjectLogMapper projectLogMapper;

    public ProjectLogConsumer(ProjectLogMapper projectLogMapper, ProjectLogRepository projectLogRepository) {
        this.projectLogRepository = projectLogRepository;
        this.projectLogMapper = projectLogMapper;
    }

//    @KafkaListener(topics = "project-created", groupId = "create-1")
//    public void consumeObj1(ProjectLogRequest project) {
//        var projectLog = projectLogMapper.toDocument(project);
//        projectLogRepository.save(projectLog);
//    }
//
//    @KafkaListener(topics = "project-created", groupId = "create-1")
//    public void consumeObj2(ProjectLogRequest project) {
//        var projectLog = projectLogMapper.toDocument(project);
//        projectLogRepository.save(projectLog);
//    }
//
//    @KafkaListener(topics = "project-created", groupId = "create-1")
//    public void consumeObj3(ProjectLogRequest project) {
//        var projectLog = projectLogMapper.toDocument(project);
//        projectLogRepository.save(projectLog);
//    }
}
