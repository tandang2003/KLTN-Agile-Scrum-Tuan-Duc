package com.kltn.server.DTO.request.entity.issue;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.request.base.SubTaskRequest;
import com.kltn.server.DTO.request.base.TopicRequest;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.SubTask;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;
import java.util.List;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

public class IssueCreateRequest {
  @NotEmpty
  private String name;
  @NotEmpty
  private String projectId;
  // @NotEmpty
  private String sprintId;
  @Enumerated(EnumType.STRING)
  private IssueStatus status;
  @Enumerated(EnumType.STRING)
  private IssuePriority priority;
  @Enumerated(EnumType.STRING)
  private IssueTag tag;
  private int position;
  private List<TopicRequest> topics;
  private List<SubTaskRequest> subtasks;
  private List<AttachmentRequest> attachments;
  // @NotEmpty
  private String description;
  // @NotEmpty
  private String assigneeId;
  // @NotEmpty
  private String reviewerId;
  @DateTimeFormat(pattern = LOCAL_DATE_TIME)
  private Instant start;
  @DateTimeFormat(pattern = LOCAL_DATE_TIME)
  private Instant end;
  int complexOfDescription;

  public IssueCreateRequest() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getSprintId() {
    return sprintId;
  }

  public void setSprintId(String sprintId) {
    this.sprintId = sprintId;
  }

  public IssueStatus getStatus() {
    return status;
  }

  public void setStatus(IssueStatus status) {
    this.status = status;
  }

  public IssuePriority getPriority() {
    return priority;
  }

  public void setPriority(IssuePriority priority) {
    this.priority = priority;
  }

  public IssueTag getTag() {
    return tag;
  }

  public void setTag(IssueTag tag) {
    this.tag = tag;
  }

  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }

  public List<TopicRequest> getTopics() {
    return topics;
  }

  public void setTopics(List<TopicRequest> topics) {
    this.topics = topics;
  }

  public List<AttachmentRequest> getAttachments() {
    return attachments;
  }

  public void setAttachments(List<AttachmentRequest> attachments) {
    this.attachments = attachments;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAssigneeId() {
    return assigneeId;
  }

  public void setAssigneeId(String assigneeId) {
    this.assigneeId = assigneeId;
  }

  public String getReviewerId() {
    return reviewerId;
  }

  public void setReviewerId(String reviewerId) {
    this.reviewerId = reviewerId;
  }

  public Instant getStart() {
    return start;
  }

  public void setStart(Instant start) {
    this.start = start;
  }

  public Instant getEnd() {
    return end;
  }

  public void setEnd(Instant end) {
    this.end = end;
  }

  public List<SubTaskRequest> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<SubTaskRequest> subtasks) {
    this.subtasks = subtasks;
  }

  public int getComplexOfDescription() {
    return complexOfDescription;
  }

  public void setComplexOfDescription(int complexOfDescription) {
    this.complexOfDescription = complexOfDescription;
  }
}
