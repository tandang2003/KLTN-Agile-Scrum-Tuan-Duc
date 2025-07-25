package com.kltn.server.service.message;

import com.kltn.server.DTO.response.project.ProjectMessageResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProjectRoomService {
  private final SimpMessagingTemplate messagingTemplate;

  public ProjectRoomService(SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  public void sendToRoom(String projectId, ProjectMessageResponse message) {
    messagingTemplate.convertAndSend("/topic/project/room/" + projectId, message);
  }
}
