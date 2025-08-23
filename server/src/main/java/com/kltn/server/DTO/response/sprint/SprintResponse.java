package com.kltn.server.DTO.response.sprint;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SprintResponse(String id,
                             String title,
                             String description,
                             int storyPoint,
                             Instant predict,
                             Instant predictSecond,
                             Instant start,
                             Instant end,
                             Instant planning,
                             Instant preview,
                             int predictedResult) {
  public static class SprintResponseBuilder {
    private String id;
    private String title;
    private String description;
    private int storyPoint;
    private Instant predict;
    private Instant predictSecond;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant planning;
    private Instant preview;
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

    public SprintResponseBuilder predict(Instant predict) {
      this.predict = predict;
      return this;
    }

    public SprintResponseBuilder predictSecond(Instant predictSecond) {
      this.predictSecond = predictSecond;
      return this;
    }


    public SprintResponseBuilder start(Instant dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public SprintResponseBuilder end(Instant dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public SprintResponseBuilder planning(Instant planning) {
      this.planning = planning;
      return this;
    }

    public SprintResponseBuilder preview(Instant preview) {
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
