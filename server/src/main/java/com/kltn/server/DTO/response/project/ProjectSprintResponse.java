package com.kltn.server.DTO.response.project;

import java.time.Instant;
import java.time.LocalDateTime;

public record ProjectSprintResponse(
    String id,
    String title,
    String description,
    LocalDateTime predict,
    LocalDateTime predictSecond,
    LocalDateTime start,
    LocalDateTime end,
    int storyPoint,
    int predictResult,
    int predictResultSecond) {
}
