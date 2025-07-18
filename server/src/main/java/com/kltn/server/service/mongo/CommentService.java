package com.kltn.server.service.mongo;

import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.repository.document.IssueLogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
  private IssueLogRepository issueLogRepository;

  public CommentService(IssueLogRepository issueLogRepository) {
    this.issueLogRepository = issueLogRepository;
  }

  public void saveComment(String issueId, String userId, String content) {

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
    return comments.stream()
        .map(e -> new CommentResponse(e.getFrom(), e.getMessage(), e.getCreatedAt()))
        .toList();
  }
}
