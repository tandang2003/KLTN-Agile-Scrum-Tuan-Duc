package com.kltn.server.kafka.consumer.predict;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.DTO.request.kafka.SprintPredictRequest;
import com.kltn.server.DTO.response.project.ProjectMessagePredictResponse;
import com.kltn.server.DTO.response.project.ProjectMessageResponse;
import com.kltn.server.model.type.task.ProjectMessageType;
import com.kltn.server.service.DecisionService;
import com.kltn.server.service.message.ProjectRoomService;

import jakarta.transaction.Transactional;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class PredictConsumer {
  private final DecisionService decisionService;
  private ProjectRoomService projectRoomService;

  public PredictConsumer(DecisionService decisionService, ProjectRoomService projectRoomService) {
    this.decisionService = decisionService;
    this.projectRoomService = projectRoomService;
  }

  @KafkaListener(topics = "predict", groupId = "predict-1")
  @Transactional
  public void consumeSnapshot1(@Payload SprintPredictRequest sprintPredictRequest, @Header("X-Auth-User") String user) {
    var result = decisionService.makePredict(sprintPredictRequest.getProjectId(), sprintPredictRequest.getSprintId());
    System.out.println("call here ");
    projectRoomService.sendToRoom(sprintPredictRequest.getProjectId(),new ProjectMessageResponse(ProjectMessageType.PREDICT, new ProjectMessagePredictResponse(result.getData(), result.getMessage())));
  }
}
