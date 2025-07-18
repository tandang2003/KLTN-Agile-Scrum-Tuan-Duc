package com.kltn.server.model.collection;

import com.kltn.server.model.collection.model.LogTask;
import com.kltn.server.model.type.task.LogType;
import jakarta.persistence.EntityListeners;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.Arrays;
import java.util.Objects;

@Document
@EntityListeners(AuditingEntityListener.class)
public class ChangeLog {
  @Field
  private LogType type;
  @Field("entity_target")
  private String entityTarget;
  @Field("properties_target")
  private String[] propertiesTargets;
  //  private String idWorkspace;
  private String projectId;
  //    entity id of the target entity
  @Field("id_ref")
  private String idRef;
  @Field("change")
  private LogTask change;
  @MongoId
  protected ObjectId id;
  @CreatedDate
  @Field(name = "dt_created")
  protected Instant DTCreated;
  @LastModifiedDate
  @Field(name = "dt_deleted")
  protected Instant DTDeleted;
  @Field(name = "is_deleted")
  protected boolean deleted;
  @CreatedBy
  @Field(name = "create_by")
  protected String createdBy;
  @LastModifiedBy
  @Field(name = "deleted_by")
  protected String deletedBy;

  public ChangeLog() {}

  protected ChangeLog(ChangeLogBuilder builder) {
    this.id = builder.id;
    this.DTCreated = builder.DTCreated;
    this.DTDeleted = builder.DTDeleted;
    this.deleted = builder.deleted;
    this.createdBy = builder.createdBy;
    this.deletedBy = builder.deletedBy;
    this.type = builder.type;
    this.entityTarget = builder.entityTarget;
    this.propertiesTargets = builder.propertiesTargets;
    this.idRef = builder.idRef;
    this.change = builder.change;
    this.projectId = builder.projectId;
  }

  public static ChangeLogBuilder builder() {
    return new ChangeLogBuilder();
  }

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof ChangeLog changeLog)) {
      return false;
    }
    return deleted == changeLog.deleted && type == changeLog.type && Objects.equals(entityTarget, changeLog.entityTarget) && Objects.deepEquals(propertiesTargets, changeLog.propertiesTargets) && Objects.equals(idRef, changeLog.idRef) && Objects.equals(change, changeLog.change) && Objects.equals(id, changeLog.id) && Objects.equals(DTCreated, changeLog.DTCreated) && Objects.equals(DTDeleted, changeLog.DTDeleted) && Objects.equals(createdBy, changeLog.createdBy) && Objects.equals(deletedBy, changeLog.deletedBy);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, entityTarget, Arrays.hashCode(propertiesTargets), idRef, change, id, DTCreated, DTDeleted, deleted, createdBy, deletedBy);
  }
  public static class ChangeLogBuilder {
    private ObjectId id;
    private Instant DTCreated;
    private Instant DTDeleted;
    private boolean deleted;
    private String createdBy;
    private String deletedBy;
    private LogType type;
    private String entityTarget;
    private String[] propertiesTargets;
    private String idRef;
    private LogTask change;
    private String projectId;

    public ChangeLogBuilder id(ObjectId id) {
      this.id = id;
      return this;
    }

    public ChangeLogBuilder DTCreated(Instant DTCreated) {
      this.DTCreated = DTCreated;
      return this;
    }

    public ChangeLogBuilder DTDeleted(Instant DTDeleted) {
      this.DTDeleted = DTDeleted;
      return this;
    }

    public ChangeLogBuilder deleted(boolean deleted) {
      this.deleted = deleted;
      return this;
    }

    public ChangeLogBuilder createdBy(String createdBy) {
      this.createdBy = createdBy;
      return this;
    }

    public ChangeLogBuilder deletedBy(String deletedBy) {
      this.deletedBy = deletedBy;
      return this;
    }

    public ChangeLogBuilder type(LogType type) {
      this.type = type;
      return this;
    }

    public ChangeLogBuilder entityTarget(String entityTarget) {
      this.entityTarget = entityTarget;
      return this;
    }

    public ChangeLogBuilder propertiesTargets(String[] propertiesTargets) {
      this.propertiesTargets = propertiesTargets;
      return this;
    }

    public ChangeLogBuilder idRef(String idRef) {
      this.idRef = idRef;
      return this;
    }

    public ChangeLogBuilder change(LogTask change) {
      this.change = change;
      return this;
    }

    public ChangeLogBuilder projectId(String projectId) {
      this.projectId = projectId;
      return this;
    }

    public ChangeLog build() {
      return new ChangeLog(this);
    }
  }

  public LogType getType() {
    return type;
  }

  public void setType(LogType type) {
    this.type = type;
  }

  public String getEntityTarget() {
    return entityTarget;
  }

  public void setEntityTarget(String entityTarget) {
    this.entityTarget = entityTarget;
  }

  public String[] getPropertiesTargets() {
    return propertiesTargets;
  }

  public void setPropertiesTargets(String[] propertiesTargets) {
    this.propertiesTargets = propertiesTargets;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getIdRef() {
    return idRef;
  }

  public void setIdRef(String idRef) {
    this.idRef = idRef;
  }

  public LogTask getChange() {
    return change;
  }

  public void setChange(LogTask change) {
    this.change = change;
  }

  public ObjectId getId() {
    return id;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public Instant getDTCreated() {
    return DTCreated;
  }

  public void setDTCreated(Instant DTCreated) {
    this.DTCreated = DTCreated;
  }

  public Instant getDTDeleted() {
    return DTDeleted;
  }

  public void setDTDeleted(Instant DTDeleted) {
    this.DTDeleted = DTDeleted;
  }

  public boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(boolean deleted) {
    this.deleted = deleted;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  public String getDeletedBy() {
    return deletedBy;
  }

  public void setDeletedBy(String deletedBy) {
    this.deletedBy = deletedBy;
  }
}
