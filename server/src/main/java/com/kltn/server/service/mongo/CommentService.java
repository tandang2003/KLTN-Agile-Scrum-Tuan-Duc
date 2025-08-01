package com.kltn.server.service.mongo;

import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.repository.document.IssueLogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CommentService {
  private IssueLogRepository issueLogRepository;

  public CommentService(IssueLogRepository issueLogRepository) {
    this.issueLogRepository = issueLogRepository;
  }

  public Comment saveComment(String issueId, String userId, String content) {
    Comment comment = Comment.builder()
      .from(userId)
      .message(content)
      .build();
    Issue issue = issueLogRepository.findByNkTaskId(issueId)
      .orElseThrow(() -> AppException.builder()
        .error(Error.NOT_FOUND)
        .message("Issue not found")
        .build());
    List<Comment> comments = issue.getComments();
    if (comments == null) {
      comments = new ArrayList<>();
    }
    comments.add(comment);
    issue.setComments(comments);
    issueLogRepository.save(issue);
    return comment;
  }

  public List<CommentResponse> getCommentsInIssue(String issueId) {
    Issue issue = issueLogRepository.findByNkTaskId(issueId)
      .orElseThrow(() -> AppException.builder()
        .error(Error.NOT_FOUND)
        .message("Issue not found")
        .build());
    List<Comment> comments = issue.getComments();
    if (comments == null || comments.isEmpty()) {
      return new ArrayList<>();
    }
    var result = new ArrayList<>(comments.stream()
      .map(e -> new CommentResponse(e.getId().toHexString(), e.getFrom(), e.getMessage(), e.getCreatedAt()))
      .toList());

    Collections.reverse(result);
    return result;
  }

  public List<CommentResponse> deleteCommentsInIssue(String issueId, String id) {
    Issue issue = issueLogRepository.findByNkTaskId(issueId)
      .orElseThrow(() -> AppException.builder()
        .error(Error.NOT_FOUND)
        .message("Issue not found")
        .build());
    List<Comment> comments = issue.getComments();
    if (comments == null || comments.isEmpty()) {
      return new ArrayList<>();
    }
    comments = comments.stream().filter(comment -> !comment.getId().toHexString().equals(id)).toList();
    issue.setComments(comments);
    issueLogRepository.save(issue);
    var result = new ArrayList<>(comments.stream()
      .map(e -> new CommentResponse(e.getId().toHexString(), e.getFrom(), e.getMessage(), e.getCreatedAt()))
      .toList());

    Collections.reverse(result);
    return result;
  }
}
