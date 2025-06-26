package com.kltn.server.DTO.response.notification;

import com.kltn.server.DTO.response.auth.AuthenticationResponse;
import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.DTO.response.issue.IssueRelationResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;

import java.time.Instant;
import java.util.List;

public class NotificationOfIssueResponse {
  String sprintId;
  String name;
  AuthenticationResponse.UserDetailDTO assignee;
  AuthenticationResponse.UserDetailDTO reviewer;
  String description;
  String status;
  String priority;
  int storyPoint;
  Instant dtStart;
  Instant dtEnd;
  Instant dtPlanning;
  Instant dtPredictComplete;
  int complexDescription;
  List<TopicResponse> topics;
  List<SubTaskResponse> subTask;
  List<ResourceResponse> attachment;
  List<CommentResponse> comments;
  private List<IssueRelationResponse> relations;
  private boolean open;

  public NotificationOfIssueResponse() {
  }

  public NotificationOfIssueResponse(NotificationOfIssueResponseBuilder builder) {
    this.sprintId = builder.sprintId;
    this.name = builder.name;
    this.assignee = builder.assignee;
    this.reviewer = builder.reviewer;
    this.description = builder.description;
    this.status = builder.status;
    this.priority = builder.priority;
    this.storyPoint = builder.storyPoint;
    this.dtStart = builder.dtStart;
    this.dtEnd = builder.dtEnd;
    this.dtPlanning = builder.dtPlanning;
    this.dtPredictComplete = builder.dtPredictComplete;
    this.complexDescription = builder.complexDescription;
    this.topics = builder.topics;
    this.subTask = builder.subTask;
    this.attachment = builder.attachment;
    this.comments = builder.comments;
    this.relations = builder.relations;
    this.open = builder.open;
  }

  public static NotificationOfIssueResponseBuilder builder() {
    return new NotificationOfIssueResponseBuilder();
  }

  public static class NotificationOfIssueResponseBuilder {
    String sprintId;
    String name;
    AuthenticationResponse.UserDetailDTO assignee;
    AuthenticationResponse.UserDetailDTO reviewer;
    String description;
    String status;
    String priority;
    int storyPoint;
    Instant dtStart;
    Instant dtEnd;
    Instant dtPlanning;
    Instant dtPredictComplete;
    int complexDescription;
    List<TopicResponse> topics;
    List<SubTaskResponse> subTask;
    List<ResourceResponse> attachment;
    List<CommentResponse> comments;
    private List<IssueRelationResponse> relations;
    private boolean open;

    public NotificationOfIssueResponseBuilder sprintId(String sprintId) {
      this.sprintId = sprintId;
      return this;
    }

    public NotificationOfIssueResponseBuilder name(String name) {
      this.name = name;
      return this;
    }

    public NotificationOfIssueResponseBuilder assignee(AuthenticationResponse.UserDetailDTO assignee) {
      this.assignee = assignee;
      return this;
    }

    public NotificationOfIssueResponseBuilder reviewer(AuthenticationResponse.UserDetailDTO reviewer) {
      this.reviewer = reviewer;
      return this;
    }

    public NotificationOfIssueResponseBuilder description(String description) {
      this.description = description;
      return this;
    }

    public NotificationOfIssueResponseBuilder status(String status) {
      this.status = status;
      return this;
    }

    public NotificationOfIssueResponseBuilder priority(String priority) {
      this.priority = priority;
      return this;
    }

    public NotificationOfIssueResponseBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public NotificationOfIssueResponseBuilder dtStart(Instant dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public NotificationOfIssueResponseBuilder dtEnd(Instant dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public NotificationOfIssueResponseBuilder dtPlanning(Instant dtPlanning) {
      this.dtPlanning = dtPlanning;
      return this;
    }

    public NotificationOfIssueResponseBuilder dtPredictComplete(Instant dtPredictComplete) {
      this.dtPredictComplete = dtPredictComplete;
      return this;
    }

    public NotificationOfIssueResponseBuilder complexDescription(int complexDescription) {
      this.complexDescription = complexDescription;
      return this;
    }

    public NotificationOfIssueResponseBuilder topics(List<TopicResponse> topics) {
      this.topics = topics;
      return this;
    }

    public NotificationOfIssueResponseBuilder subTask(List<SubTaskResponse> subTask) {
      this.subTask = subTask;
      return this;
    }

    public NotificationOfIssueResponseBuilder attachment(List<ResourceResponse> attachment) {
      this.attachment = attachment;
      return this;
    }

    public NotificationOfIssueResponseBuilder comments(List<CommentResponse> comments) {
      this.comments = comments;
      return this;
    }

    public NotificationOfIssueResponseBuilder relations(List<IssueRelationResponse> relations) {
      this.relations = relations;
      return this;
    }

    public NotificationOfIssueResponseBuilder open(boolean open) {
      this.open = open;
      return this;
    }

    public NotificationOfIssueResponse build() {
      return new NotificationOfIssueResponse(this);
    }
  }

  public String getSprintId() {
    return sprintId;
  }

  public void setSprintId(String sprintId) {
    this.sprintId = sprintId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public AuthenticationResponse.UserDetailDTO getAssignee() {
    return assignee;
  }

  public void setAssignee(AuthenticationResponse.UserDetailDTO assignee) {
    this.assignee = assignee;
  }

  public AuthenticationResponse.UserDetailDTO getReviewer() {
    return reviewer;
  }

  public void setReviewer(AuthenticationResponse.UserDetailDTO reviewer) {
    this.reviewer = reviewer;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getPriority() {
    return priority;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public int getStoryPoint() {
    return storyPoint;
  }

  public void setStoryPoint(int storyPoint) {
    this.storyPoint = storyPoint;
  }

  public Instant getDtStart() {
    return dtStart;
  }

  public void setDtStart(Instant dtStart) {
    this.dtStart = dtStart;
  }

  public Instant getDtEnd() {
    return dtEnd;
  }

  public void setDtEnd(Instant dtEnd) {
    this.dtEnd = dtEnd;
  }

  public Instant getDtPlanning() {
    return dtPlanning;
  }

  public void setDtPlanning(Instant dtPlanning) {
    this.dtPlanning = dtPlanning;
  }

  public Instant getDtPredictComplete() {
    return dtPredictComplete;
  }

  public void setDtPredictComplete(Instant dtPredictComplete) {
    this.dtPredictComplete = dtPredictComplete;
  }

  public int getComplexDescription() {
    return complexDescription;
  }

  public void setComplexDescription(int complexDescription) {
    this.complexDescription = complexDescription;
  }

  public List<TopicResponse> getTopics() {
    return topics;
  }

  public void setTopics(List<TopicResponse> topics) {
    this.topics = topics;
  }

  public List<SubTaskResponse> getSubTask() {
    return subTask;
  }

  public void setSubTask(List<SubTaskResponse> subTask) {
    this.subTask = subTask;
  }

  public List<ResourceResponse> getAttachment() {
    return attachment;
  }

  public void setAttachment(List<ResourceResponse> attachment) {
    this.attachment = attachment;
  }

  public List<CommentResponse> getComments() {
    return comments;
  }

  public void setComments(List<CommentResponse> comments) {
    this.comments = comments;
  }

  public List<IssueRelationResponse> getRelations() {
    return relations;
  }

  public void setRelations(List<IssueRelationResponse> relations) {
    this.relations = relations;
  }

  public boolean isOpen() {
    return open;
  }

  public void setOpen(boolean open) {
    this.open = open;
  }
}
