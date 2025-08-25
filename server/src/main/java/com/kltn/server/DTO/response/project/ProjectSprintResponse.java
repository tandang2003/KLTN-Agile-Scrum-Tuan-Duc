package com.kltn.server.DTO.response.project;

import java.time.Instant;

public record ProjectSprintResponse(
  String id,
  String title,
  String description,
  Instant predict,
  Instant predictSecond,
  Instant start,
  Instant end,
  int storyPoint,
  int predictResult,
  int predictResultSecond) {
}
