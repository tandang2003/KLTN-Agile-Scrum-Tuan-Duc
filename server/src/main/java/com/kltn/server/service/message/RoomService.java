package com.kltn.server.service.message;

import com.kltn.server.DTO.response.message.MessageResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
  private final SimpMessagingTemplate messagingTemplate;

  public RoomService(SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  public void sendToRoom(String projectId, MessageResponse message) {
    messagingTemplate.convertAndSend("/topic/project/room/" + projectId, message);
  }

  public void sentToApp(MessageResponse message) {
    messagingTemplate.convertAndSend("/topic/app", message);
  }
}
