package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.comment.CommentCreateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.DTO.response.message.MessageResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.config.websocket.UserPrinciple;
import com.kltn.server.model.type.task.MessageType;
import com.kltn.server.service.mongo.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController()
@RequestMapping()
public class CommentController {
  private final CommentService commentService;
  private final SimpMessagingTemplate messagingTemplate;

  public CommentController(CommentService commentService, SimpMessagingTemplate messagingTemplate) {
    this.commentService = commentService;
    this.messagingTemplate = messagingTemplate;
  }

  @MessageMapping("/issue/{issueId}")
  public void sendToGroup(@DestinationVariable("issueId") String issueId, @Payload CommentCreateRequest message, Principal principal) {
    String userId = "";
    if (principal instanceof UserPrinciple) {
      userId = principal.getName();// uniId
    }
    // Handle business logic comment
    var comment = commentService.saveComment(issueId, userId, message.getContent());
    // send to /topic/room/{roomId}

    messagingTemplate.convertAndSend(
      "/topic/issue/room/" + issueId,
      new MessageResponse(
        MessageType.COMMENT_CREATE,
        new CommentResponse(comment.getId().toHexString(), userId, message.getContent(), ClockSimulator.now())
      ));
  }

  @GetMapping("/comments/{issueId}")
  @ResponseBody
  public List<CommentResponse> getCommentsInIssue(@PathVariable String issueId) {
    return commentService.getCommentsInIssue(issueId);
  }

  @DeleteMapping("/comments/{issueId}/{id}")
  @ResponseBody
  public void deleteCommentsInIssue(
    @PathVariable("issueId") String issueId, @PathVariable("id") String id) {
    List<CommentResponse> comment = commentService.deleteCommentsInIssue(issueId, id);
    messagingTemplate.convertAndSend(
      "/topic/issue/room/" + issueId,
      new MessageResponse(
        MessageType.COMMENT_DELETE,
        comment
      )
    );
  }
}