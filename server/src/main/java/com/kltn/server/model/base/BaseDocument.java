package com.kltn.server.model.base;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.Objects;

public abstract class BaseDocument {
  @MongoId
  protected ObjectId id;

  @CreatedDate
  @Field(name = "dt_created")
  protected Instant DTCreated;
  @LastModifiedDate
  @Field(name = "dt_modified")
  protected Instant lastModified;
  @LastModifiedBy
  @Field(name = "last_modified_by")
  protected String lastModifiedBy;
  @Field(name = "dt_deleted")
  protected Instant DTDeleted;
  @Field(name = "is_deleted")
  protected boolean deleted;
  @CreatedBy
  @Field(name = "create_by")
  protected String createdBy;
  @Field(name = "deleted_by")
  protected String deletedBy;

  protected BaseDocument() {
  }

  protected BaseDocument(BaseDocumentBuilder<?, ?> builder) {
    this.id = builder.id;
    this.DTCreated = builder.DTCreated;
    this.DTDeleted = builder.DTDeleted;
    this.deleted = builder.deleted;
    this.createdBy = builder.createdBy;
    this.deletedBy = builder.deletedBy;
    this.lastModified = builder.lastModified; // Initialize lastModified with DTCreated
    this.lastModifiedBy = builder.lastModifiedBy; // Initialize lastModifiedBy with createdBy
  }

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof BaseDocument that))
      return false;
    return deleted == that.deleted && Objects.equals(id, that.id) && Objects.equals(DTCreated,
                                                                                    that.DTCreated) && Objects.equals(
      lastModified, that.lastModified) && Objects.equals(lastModifiedBy, that.lastModifiedBy) && Objects.equals(
      DTDeleted, that.DTDeleted) && Objects.equals(createdBy, that.createdBy) && Objects.equals(deletedBy,
                                                                                                that.deletedBy);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, DTCreated, lastModified, lastModifiedBy, DTDeleted, deleted, createdBy, deletedBy);
  }

  abstract static protected class BaseDocumentBuilder<T, R extends BaseDocument.BaseDocumentBuilder<T, R>> {
    protected ObjectId id;
    protected Instant DTCreated;
    protected Instant DTDeleted;
    protected boolean deleted;
    protected String createdBy;
    protected String deletedBy;
    protected Instant lastModified;
    protected String lastModifiedBy;

    protected BaseDocumentBuilder() {
    }


    public R id(ObjectId id) {
      this.id = id;
      return self();
    }

    public R DTCreated(Instant DTCreated) {
      this.DTCreated = DTCreated;
      return self();
    }

    public R DTDeleted(Instant DTDeleted) {
      this.DTDeleted = DTDeleted;
      return self();
    }

    public R deleted(boolean deleted) {
      this.deleted = deleted;
      return self();
    }

    public R createdBy(String createdBy) {
      this.createdBy = createdBy;
      return self();
    }

    public R deletedBy(String deletedBy) {
      this.deletedBy = deletedBy;
      return self();
    }

    public R lastModified(Instant lastModified) {
      this.lastModified = lastModified;
      return self();
    }

    public R lastModifiedBy(String lastModifiedBy) {
      this.lastModifiedBy = lastModifiedBy;
      return self();
    }




    protected abstract R self();

    public abstract T build();

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

  public Instant getLastModified() {
    return lastModified;
  }

  public void setLastModified(Instant lastModified) {
    this.lastModified = lastModified;
  }

  public String getLastModifiedBy() {
    return lastModifiedBy;
  }

  public void setLastModifiedBy(String lastModifiedBy) {
    this.lastModifiedBy = lastModifiedBy;
  }
}
