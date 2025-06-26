package com.kltn.server.kafka.consumer.log;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.LogTask;
import com.kltn.server.repository.document.ChangeLogRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class IssueLogConsumer {
  private ChangeLogRepository changeLogRepository;

  public IssueLogConsumer(ChangeLogRepository changeLogRepository) {
    this.changeLogRepository = changeLogRepository;
  }

  @KafkaListener(topics = "task-log", groupId = "task-log-1")
  public void createTask1(@Payload ChangeLogRequest project, @Header("X-Auth-User") String user) {
    SecurityContextHolder.getContext()
      .setAuthentication(new UsernamePasswordAuthenticationToken(user, null));
    var projectLog = ChangeLog.builder()
      .type(project.type())
      .idRef(project.idRef())
      .projectId(project.projectId())
      .entityTarget(project.entityTarget())
      .change((LogTask)project.change())
      .propertiesTargets(project.propertiesTargets())
      .build()
      ;
    projectLog = changeLogRepository.save(projectLog);
    System.out.println(projectLog);
  }
  //
  // @KafkaListener(topics = "task-log", groupId = "task-log-1")
  // public void createTask2(ChangeLogRequest project) {
  // var projectLog = ChangeLog.builder()
  // .type(project.type())
  // .idRef(project.idRef())
  // .entityTarget(project.entityTarget())
  // .change((LogTask) project.change())
  // .propertiesTargets(project.propertiesTargets())
  // .build();
  // changeLogRepository.save(projectLog);
  // }
  //
  // @KafkaListener(topics = "task-log", groupId = "task-log-1")
  // public void createTask3(ChangeLogRequest project) {
  // var projectLog = ChangeLog.builder()
  // .type(project.type())
  // .idRef(project.idRef())
  // .entityTarget(project.entityTarget())
  // .change((LogTask) project.change())
  // .propertiesTargets(project.propertiesTargets())
  // .build();
  // changeLogRepository.save(projectLog);
  // }

}
