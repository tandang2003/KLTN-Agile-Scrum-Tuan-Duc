package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.comment.CommentCreateRequest;
import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.config.websocket.UserPrinciple;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;


@Controller()
@RequestMapping("")
public class CommentController {
  @MessageMapping("/issue/{issueId}")
  @SendTo("/topic/room/{issueId}")
  public CommentResponse sendToGroup(
    @DestinationVariable("issueId") String issueId,
    @Payload CommentCreateRequest message,
    Principal principal
  ) {
    System.out.println(issueId);
    System.out.println(message);
    String userId = "";
    if (principal instanceof UserPrinciple) {
      userId = principal.getName();// uniId
    }
    // Handle business logic comment

    // send to /topic/room/{roomId}
    return new CommentResponse(userId, message.getContent());
  }
}
