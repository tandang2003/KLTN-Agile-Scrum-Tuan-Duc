package com.kltn.server.DTO.request.log;

import com.kltn.server.model.collection.model.ILog;
import com.kltn.server.model.type.task.LogType;
import org.springframework.data.mongodb.core.mapping.Field;

public record ChangeLogRequest(
  LogType type,
  String entityTarget,
  String[] propertiesTargets,
  String projectId,
//    entity id of the target entity
  String idRef,
  ILog change) {


  public static class ChangeLogRequestBuilder {
    private LogType type;
    private String entityTarget;
    private String[] propertiesTargets;
    private String idRef;
    private String projectId;
    private ILog change;

    public ChangeLogRequestBuilder type(LogType type) {
      this.type = type;
      return this;
    }

    public ChangeLogRequestBuilder projectId(String projectId) {
      this.projectId = projectId;
      return this;
    }

    public ChangeLogRequestBuilder entityTarget(String entityTarget) {
      this.entityTarget = entityTarget;
      return this;
    }

    public ChangeLogRequestBuilder propertiesTargets(String[] propertiesTargets) {
      this.propertiesTargets = propertiesTargets;
      return this;
    }

    public ChangeLogRequestBuilder idRef(String idRef) {
      this.idRef = idRef;
      return this;
    }

    public ChangeLogRequestBuilder change(ILog change) {
      this.change = change;
      return this;
    }

    public ChangeLogRequest build() {
      return new ChangeLogRequest(type, entityTarget, propertiesTargets, projectId, idRef, change);
    }
  }

  public static ChangeLogRequestBuilder builder() {
    return new ChangeLogRequestBuilder();
  }
}
