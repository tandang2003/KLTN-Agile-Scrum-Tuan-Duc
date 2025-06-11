package com.kltn.server.DTO.request.entity.comment;

public class CommentCreateRequest {
    String content;

    public CommentCreateRequest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
