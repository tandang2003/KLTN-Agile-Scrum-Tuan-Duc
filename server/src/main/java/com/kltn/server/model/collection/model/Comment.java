package com.kltn.server.model.collection.model;

import com.kltn.server.config.init.ClockSimulator;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.time.Instant;
@Component
public class Comment {
  private ObjectId id;
  @Field // issueId
  private String to;
  @Field // uniId
  private String from;
  @Field
  private String message;
  // @Field
  // private Attachment attachment;
  @Field("is_delete")
  private boolean deleted;
  @Field("delete_by")
  private String deletedBy;
  @Field("created_at")
  @CreatedDate
  private Instant createdAt;

  private Comment(CommentBuilder builder) {
    this.id = builder.id;
    this.to = builder.to;
    this.from = builder.from;
    this.message = builder.message;
    // this.attachment = builder.attachment;
    this.deleted = builder.deleted;
    this.deletedBy = builder.deletedBy;
    this.createdAt = builder.createdAt;
  }

  public Comment() {
  }

  public static CommentBuilder builder() {
    return new CommentBuilder();
  }

  public static class CommentBuilder {
    private ObjectId id;
    private String to;
    private String from;
    private String message;
    // private Attachment attachment;
    private boolean deleted;
    private String deletedBy;
    private Instant createdAt;

    public void prePersist() {
      if (this.id == null) {
        this.id = new ObjectId();
      }
      if (createdAt == null) {
        this.createdAt = ClockSimulator.now();
      }
    }

    public CommentBuilder to(String to) {
      this.to = to;
      return this;
    }

    public CommentBuilder from(String from) {
      this.from = from;
      return this;
    }

    public CommentBuilder message(String message) {
      this.message = message;
      return this;
    }

    // public CommentBuilder attachment(Attachment attachment) {
    // this.attachment = attachment;
    // return this;
    // }

    public CommentBuilder deleted(boolean deleted) {
      this.deleted = deleted;
      return this;
    }

    public CommentBuilder deletedBy(String deletedBy) {
      this.deletedBy = deletedBy;
      return this;
    }

    public CommentBuilder createdAt(Instant createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public Comment build() {
      prePersist();
      return new Comment(this);
    }
  }

  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    this.to = to;
  }

  public String getFrom() {
    return from;
  }

  public void setFrom(String from) {
    this.from = from;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  // public Attachment getAttachment() {
  // return attachment;
  // }
  //
  // public void setAttachment(Attachment attachment) {
  // this.attachment = attachment;
  // }

  public boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(boolean deleted) {
    this.deleted = deleted;
  }

  public String getDeletedBy() {
    return deletedBy;
  }

  public void setDeletedBy(String deletedBy) {
    this.deletedBy = deletedBy;
  }

  public ObjectId getId() {
    return id;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public Comment clone() {
    return Comment.builder()
        .to(this.to)
        .from(this.from)
        .message(this.message)
        // .attachment(this.attachment != null ? this.attachment.clone() : null)
        .deleted(this.deleted)
        .deletedBy(this.deletedBy)
        .build();
  }
}
