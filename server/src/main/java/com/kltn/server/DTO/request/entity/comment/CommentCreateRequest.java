package com.kltn.server.DTO.request.entity.comment;

public class CommentCreateRequest {
    String content;
    String issueId;

    public CommentCreateRequest(String content, String issueId) {
        this.content = content;
        this.issueId = issueId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }
}
