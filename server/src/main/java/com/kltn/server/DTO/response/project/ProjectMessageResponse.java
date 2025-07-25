package com.kltn.server.DTO.response.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.notification.NotificationOfIssueResponse;
import com.kltn.server.model.type.task.LogType;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProjectMessageResponse(
  LogType type,
  String entityTarget,
  String[] propertiesTargets,
  NotificationOfIssueResponse change,
  Instant dtCreated,
  String createdBy
) {
  // Constructor used by the builder
  public ProjectMessageResponse(ProjectMessageResponseBuilder builder) {
    this(
      builder.type,
      builder.entityTarget,
      builder.propertiesTargets,
      builder.change,
      builder.dtCreated,
      builder.createdBy
    );
  }

  // Static method to start building
  public static ProjectMessageResponseBuilder builder() {
    return new ProjectMessageResponseBuilder();
  }

  // Manual builder class
  public static class ProjectMessageResponseBuilder {
    private LogType type;
    private String entityTarget;
    private String[] propertiesTargets;
    private NotificationOfIssueResponse change;
    private Instant dtCreated;
    private String createdBy;

    public ProjectMessageResponseBuilder type(LogType type) {
      this.type = type;
      return this;
    }

    public ProjectMessageResponseBuilder entityTarget(String entityTarget) {
      this.entityTarget = entityTarget;
      return this;
    }

    public ProjectMessageResponseBuilder propertiesTargets(String[] propertiesTargets) {
      this.propertiesTargets = propertiesTargets;
      return this;
    }

    public ProjectMessageResponseBuilder change(NotificationOfIssueResponse change) {
      this.change = change;
      return this;
    }

    public ProjectMessageResponseBuilder dtCreated(Instant dtCreated) {
      this.dtCreated = dtCreated;
      return this;
    }

    public ProjectMessageResponseBuilder createdBy(String createdBy) {
      this.createdBy = createdBy;
      return this;
    }

    public ProjectMessageResponse build() {
      return new ProjectMessageResponse(this);
    }
  }
}
