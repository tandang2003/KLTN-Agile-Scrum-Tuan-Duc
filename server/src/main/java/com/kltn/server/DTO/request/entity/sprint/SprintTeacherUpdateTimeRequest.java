package com.kltn.server.DTO.request.entity.sprint;

import java.time.Instant;

public record SprintTeacherUpdateTimeRequest(String id,
                                             String title,
                                             String description,
                                             Instant start,
                                             Instant end,
                                             int storyPoint,
                                             Instant predict,
                                             Instant predictSecond,
                                             int position) {

  public static class SprintTeacherUpdateTimeRequestBuilder {
    private String id;
    private String title;
    private String description;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant predict;
    private Instant predictSecond;

    private int storyPoint;
    private int position;


    public SprintTeacherUpdateTimeRequestBuilder id(String id) {
      this.id = id;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder position(int position) {
      this.position = position;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder title(String title) {
      this.title = title;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder description(String description) {
      this.description = description;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder predict(Instant predict) {
      this.predict = predict;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder predictSecond(Instant predict) {
      this.predict = predict;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder dtStart(Instant dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public SprintTeacherUpdateTimeRequestBuilder dtEnd(Instant dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public SprintTeacherUpdateTimeRequest build() {
      return new SprintTeacherUpdateTimeRequest(id, title, description, dtStart, dtEnd, storyPoint, predict, predictSecond, position);
    }
  }

  public static SprintTeacherUpdateTimeRequestBuilder builder() {
    return new SprintTeacherUpdateTimeRequestBuilder();
  }
}
