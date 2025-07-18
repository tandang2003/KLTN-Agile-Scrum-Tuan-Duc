package com.kltn.server.DTO.response.base;

import java.time.Instant;

public record CommentResponse(
    String from,
    String content,
    Instant createdAt) {
}
