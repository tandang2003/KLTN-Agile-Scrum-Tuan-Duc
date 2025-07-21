package com.kltn.server.kafka.consumer.predict;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.DTO.request.kafka.SprintPredictRequest;
import com.kltn.server.service.DecisionService;
import jakarta.transaction.Transactional;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class PredictConsumer {
  private final DecisionService decisionService;

  public PredictConsumer(DecisionService decisionService) {
    this.decisionService = decisionService;
  }

  @KafkaListener(topics = "predict", groupId = "predict-1")
  @Transactional
  public void consumeSnapshot1(@Payload SprintPredictRequest sprintPredictRequest, @Header("X-Auth-User") String user) {
    decisionService.makePredict(sprintPredictRequest.getProjectId(), sprintPredictRequest.getSprintId());
  }
}
