package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.comment.CommentCreateRequest;
import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.config.websocket.UserPrinciple;
import com.kltn.server.service.mongo.CommentService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Controller()
@RequestMapping("")
public class CommentController {
  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @MessageMapping("/issue/{issueId}")
  @SendTo("/topic/room/{issueId}")
  public CommentResponse sendToGroup(@DestinationVariable("issueId") String issueId,
      @Payload CommentCreateRequest message, Principal principal) {

    String userId = "";
    if (principal instanceof UserPrinciple) {
      userId = principal.getName();// uniId
    }
    // Handle business logic comment
    commentService.saveComment(issueId, userId, message.getContent());
    // send to /topic/room/{roomId}
    System.out.println("sent");
    return new CommentResponse(userId, message.getContent(), ClockSimulator.now());
  }

  @GetMapping("/comments/{issueId}")
  @ResponseBody
  public List<CommentResponse> getCommentsInIssue(@PathVariable String issueId) {
    return commentService.getCommentsInIssue(issueId);
  }
}