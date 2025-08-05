package com.kltn.server.DTO.response.dashboard;

import java.time.Instant;

public class ProjectPredictResponse {
  private String id;
  private String name;
  private Instant lastTime;
  private int predict;

  private ProjectPredictResponse(Builder builder) {
    this.id = builder.id;
    this.name = builder.name;
    this.lastTime = builder.lastTime;
    this.predict = builder.predict;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private String id;
    private String name;
    private Instant lastTime;
    private int predict;

    public Builder id(String id) {
      this.id = id;
      return this;
    }

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder lastTime(Instant lastTime) {
      this.lastTime = lastTime;
      return this;
    }

    public Builder predict(int predict) {
      this.predict = predict;
      return this;
    }

    public ProjectPredictResponse build() {
      return new ProjectPredictResponse(this);
    }
  }

  // Getters (optional)
  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Instant getLastTime() {
    return lastTime;
  }

  public int getPredict() {
    return predict;
  }
}