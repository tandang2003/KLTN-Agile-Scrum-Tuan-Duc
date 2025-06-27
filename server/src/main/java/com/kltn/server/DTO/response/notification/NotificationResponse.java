package com.kltn.server.DTO.response.notification;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.type.task.LogType;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record NotificationResponse(
  LogType type,
  String entityTarget,
  String[] propertiesTargets,
  NotificationOfIssueResponse change,
  Instant dtCreated,
  String createdBy
) {
  public NotificationResponse(NotificationResponseBuilder builder) {
    this(builder.type, builder.entityTarget, builder.propertiesTargets, builder.change, builder.dtCreated, builder.createdBy);
  }

  public static NotificationResponseBuilder builder() {
    return new NotificationResponseBuilder();
  }

  public static class NotificationResponseBuilder {
    LogType type;
    String entityTarget;
    String[] propertiesTargets;
    NotificationOfIssueResponse change;
    Instant dtCreated;
    String createdBy;

    public NotificationResponseBuilder type(LogType type) {
      this.type = type;
      return this;
    }

    public NotificationResponseBuilder entityTarget(String entityTarget) {
      this.entityTarget = entityTarget;
      return this;
    }

    public NotificationResponseBuilder propertiesTargets(String[] propertiesTargets) {
      this.propertiesTargets = propertiesTargets;
      return this;
    }

    public NotificationResponseBuilder change(NotificationOfIssueResponse change) {
      this.change = change;
      return this;
    }

    public NotificationResponseBuilder createdBy(String createdBy) {
      this.createdBy = createdBy;
      return this;
    }

    public NotificationResponseBuilder dtCreated(Instant dtCreated) {
      this.dtCreated = dtCreated;
      return this;
    }

    public NotificationResponse build() {
      return new NotificationResponse(this);
    }
  }


}
