package com.kltn.server.DTO.response.issue;

import com.kltn.server.DTO.response.auth.AuthenticationResponse;
import com.kltn.server.DTO.response.base.AttachmentResponse;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;

import java.time.Instant;
import java.util.List;

public class IssueDetailResponse {
  private String id;
  private String position;
  private String description;
  private List<ResourceResponse> resources;
  private AuthenticationResponse.UserDetailDTO assignee;
  private AuthenticationResponse.UserDetailDTO reviewer;
  private String name;
  private int storyPoint;
  private IssueStatus status;
  private IssuePriority priority;
  private IssueTag tag;
  private List<TopicResponse> topics;
  private List<SubTaskResponse> subtasks;
  private int complexOfDescription;
  private Instant dtStart;
  private Instant dtEnd;
  private Instant dtPlanning;

  public static IssueDetailResponseBuilder builder() {
    return new IssueDetailResponseBuilder();
  }

  public static class IssueDetailResponseBuilder {
    private String id;
    private String position;
    private String description;
    private List<ResourceResponse> resources;
    private AuthenticationResponse.UserDetailDTO assignee;
    private AuthenticationResponse.UserDetailDTO reviewer;
    private String name;
    private int storyPoint;
    private IssueStatus status;
    private IssuePriority priority;
    private IssueTag tag;
    private List<TopicResponse> topics;
    private List<SubTaskResponse> subtasks;
    private int complexOfDescription;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant dtPlanning;

    public IssueDetailResponseBuilder id(String id) {
      this.id = id;
      return this;
    }

    public IssueDetailResponseBuilder position(String position) {
      this.position = position;
      return this;
    }

    public IssueDetailResponseBuilder description(String description) {
      this.description = description;
      return this;
    }

    public IssueDetailResponseBuilder assignee(AuthenticationResponse.UserDetailDTO assignee) {
      this.assignee = assignee;
      return this;
    }

    public IssueDetailResponseBuilder reviewer(AuthenticationResponse.UserDetailDTO reviewer) {
      this.reviewer = reviewer;
      return this;
    }

    public IssueDetailResponseBuilder name(String name) {
      this.name = name;
      return this;
    }

    public IssueDetailResponseBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public IssueDetailResponseBuilder status(IssueStatus status) {
      this.status = status;
      return this;
    }

    public IssueDetailResponseBuilder priority(IssuePriority priority) {
      this.priority = priority;
      return this;
    }

    public IssueDetailResponseBuilder tag(IssueTag tag) {
      this.tag = tag;
      return this;
    }

    public IssueDetailResponseBuilder topics(List<TopicResponse> topics) {
      this.topics = topics;
      return this;
    }

    public IssueDetailResponseBuilder subtasks(List<SubTaskResponse> subtasks) {
      this.subtasks = subtasks;
      return this;
    }

    public IssueDetailResponseBuilder resources(List<ResourceResponse> resources) {
      this.resources = resources;
      return this;
    }

    public IssueDetailResponseBuilder complexOfDescription(int complexOfDescription) {
      this.complexOfDescription = complexOfDescription;
      return this;
    }

    public IssueDetailResponseBuilder dtStart(Instant dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public IssueDetailResponseBuilder dtEnd(Instant dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public IssueDetailResponseBuilder dtPlanning(Instant dtPlanning) {
      this.dtPlanning = dtPlanning;
      return this;
    }

    public IssueDetailResponse build() {
      return new IssueDetailResponse(this);
    }
  }

  public IssueDetailResponse(IssueDetailResponseBuilder builder) {
    this.id = builder.id;
    this.position = builder.position;
    this.description = builder.description;
    this.resources = builder.resources;
    this.assignee = builder.assignee;
    this.reviewer = builder.reviewer;
    this.name = builder.name;
    this.storyPoint = builder.storyPoint;
    this.status = builder.status;
    this.priority = builder.priority;
    this.subtasks = builder.subtasks;
    this.tag = builder.tag;
    this.topics = builder.topics;
    this.complexOfDescription = builder.complexOfDescription;
    this.dtStart = builder.dtStart;
    this.dtEnd = builder.dtEnd;
    this.dtPlanning = builder.dtPlanning;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<ResourceResponse> getResources() {
    return resources;
  }

  public void setResources(List<ResourceResponse> resources) {
    this.resources = resources;
  }

  public AuthenticationResponse.UserDetailDTO getAssignee() {
    return assignee;
  }

  public void setAssigner(AuthenticationResponse.UserDetailDTO assignee) {
    this.assignee = assignee;
  }

  public AuthenticationResponse.UserDetailDTO getReviewer() {
    return reviewer;
  }

  public void setReviewer(AuthenticationResponse.UserDetailDTO reviewer) {
    this.reviewer = reviewer;
  }

  public String getName() {
    return name;
  }

  public void setName(String title) {
    this.name = title;
  }

  public int getStoryPoint() {
    return storyPoint;
  }

  public void setStoryPoint(int storyPoint) {
    this.storyPoint = storyPoint;
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

  public List<TopicResponse> getTopics() {
    return topics;
  }

  public void setTopics(List<TopicResponse> topics) {
    this.topics = topics;
  }

  public int getComplexOfDescription() {
    return complexOfDescription;
  }

  public void setComplexOfDescription(int complexOfDescription) {
    this.complexOfDescription = complexOfDescription;
  }

  public void setAssignee(AuthenticationResponse.UserDetailDTO assignee) {
    this.assignee = assignee;
  }

  public List<SubTaskResponse> getSubtasks() {
    return subtasks;
  }

  public void setSubtasks(List<SubTaskResponse> subtasks) {
    this.subtasks = subtasks;
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
}
