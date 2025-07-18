package com.kltn.server.kafka.consumer.log;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.repository.document.ChangeLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProjectLogConsumer {
  private ChangeLogRepository changeLogRepository;

  @Autowired
  public ProjectLogConsumer(ChangeLogRepository changeLogRepository) {
    this.changeLogRepository = changeLogRepository;
  }

//  @KafkaListener(topics = "project-log", groupId = "create-1")
//  public void consumeProjectLog(@Payload ChangeLogRequest project, @Header("X-Auth-User") String user) {
//    SecurityContextHolder.getContext()
//      .setAuthentication(new UsernamePasswordAuthenticationToken(user, null));
//    var projectLog = ChangeLog.builder()
//      .type(project.type())
//      .idRef(project.idRef())
//      .projectId(project.projectId())
//      .entityTarget(project.entityTarget())
//      .change(project.change())
//      .propertiesTargets(project.propertiesTargets())
//      .build()
//      ;
//    changeLogRepository.save(projectLog);
//  }

  // @KafkaListener(topics = "project-created", groupId = "create-1")
  // public void consumeObj2(ChangeLogRequest project) {
  // var projectLog = ChangeLog.builder()
  // .type(project.type())
  // .idRef(project.idRef())
  // .entityTarget(project.entityTarget())
  // .change(project.change())
  // .propertiesTargets(project.propertiesTargets())
  // .build();
  // changeLogRepository.save(projectLog);
  // }
  //
  // @KafkaListener(topics = "project-created", groupId = "create-1")
  // public void consumeObj3(ChangeLogRequest project) {
  // var projectLog = ChangeLog.builder()
  // .type(project.type())
  // .idRef(project.idRef())
  // .entityTarget(project.entityTarget())
  // .change(project.change())
  // .propertiesTargets(project.propertiesTargets())
  // .build();
  // changeLogRepository.save(projectLog);
  // }
}
