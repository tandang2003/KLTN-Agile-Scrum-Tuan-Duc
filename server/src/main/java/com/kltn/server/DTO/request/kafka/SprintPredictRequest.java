package com.kltn.server.DTO.request.kafka;

public class SprintPredictRequest {
  private String sprintId;
  private String projectId;
  private boolean isResult;

  public SprintPredictRequest() {
  }

  public String getSprintId() {
    return sprintId;
  }

  public void setSprintId(String sprintId) {
    this.sprintId = sprintId;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public boolean isResult() {
    return isResult;
  }

  public void setResult(boolean result) {
    isResult = result;
  }

  // Builder
  public static class Builder {
    private String sprintId;
    private String projectId;
    private boolean isResult;

    public Builder sprintId(String sprintId) {
      this.sprintId = sprintId;
      return this;
    }

    public Builder projectId(String projectId) {
      this.projectId = projectId;
      return this;
    }

    public Builder isResult(boolean isResult) {
      this.isResult = isResult;
      return this;
    }

    public SprintPredictRequest build() {
      SprintPredictRequest request = new SprintPredictRequest();
      request.setSprintId(this.sprintId);
      request.setProjectId(this.projectId);
      request.setResult(this.isResult);
      return request;
    }
  }

  public static Builder builder() {
    return new Builder();
  }
}

