package com.kltn.server.DTO.response.sprint;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SprintResponse(String id,
                             String title,
                             String description,
                             int storyPoint,
                             LocalDateTime predict,
                             LocalDateTime predictSecond,
                             LocalDateTime start,
                             LocalDateTime end,
                             LocalDateTime planning,
                             LocalDateTime preview,
                             int predictedResult) {
  public static class SprintResponseBuilder {
    private String id;
    private String title;
    private String description;
    private int storyPoint;
    private LocalDateTime predict;
    private LocalDateTime predictSecond;
    private LocalDateTime dtStart;
    private LocalDateTime dtEnd;
    private LocalDateTime planning;
    private LocalDateTime preview;
    private int predictedResult;
    private int predictedResultSecond;

    public SprintResponseBuilder id(String id) {
      this.id = id;
      return this;
    }

    public SprintResponseBuilder title(String title) {
      this.title = title;
      return this;
    }

    public SprintResponseBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public SprintResponseBuilder description(String description) {
      this.description = description;
      return this;
    }

    public SprintResponseBuilder predict(LocalDateTime predict) {
      this.predict = predict;
      return this;
    }

    public SprintResponseBuilder predictSecond(LocalDateTime predictSecond) {
      this.predictSecond = predictSecond;
      return this;
    }


    public SprintResponseBuilder start(LocalDateTime dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public SprintResponseBuilder end(LocalDateTime dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public SprintResponseBuilder planning(LocalDateTime planning) {
      this.planning = planning;
      return this;
    }

    public SprintResponseBuilder preview(LocalDateTime preview) {
      this.preview = preview;
      return this;
    }

    public SprintResponseBuilder predictedResult(int predictedResult) {
      this.predictedResult = predictedResult;
      return this;
    }

    public SprintResponse build() {
      return new SprintResponse(id, title, description, storyPoint, predict, predictSecond, dtStart, dtEnd, planning,
        preview, predictedResult);
    }
  }

  public static SprintResponseBuilder builder() {
    return new SprintResponseBuilder();
  }

}
