package com.kltn.server.model.collection.model;

import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

public class LogTask extends ILog {
  @Field
  private String projectId;
  @Field
  private String sprintId;
  @Field
  private String name;
  @Field
  private String assignee;
  @Field
  private String reviewer;
  @Field
  private String description;
  @Field
  private String status;
  @Field
  private String priority;
  @Field
  private int storyPoint;
  @Field
  private Instant dtStart;
  @Field
  private Instant dtEnd;
  @Field
  private Instant dtPlanning;
  @Field
  private Instant dtPredictComplete;
  @Field
  private int complexDescription;
  @Field("topics")
  private List<Topic> topics;
  @Field("subTask")
  private List<SubTask> subTask;
  @Field("attachments")
  private List<Attachment> attachment;
  @Field("comments")
  private List<Comment> comments;
  private List<Relation<String>> relations;

  public LogTask() {
    super();
  }

  private LogTask(LogTaskBuilder builder) {
    this.projectId = builder.projectId;
    this.sprintId = builder.sprintId;
    this.assignee = builder.assignee;
    this.name = builder.name;
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
  }

  public static LogTaskBuilder builder() {
    return new LogTaskBuilder();
  }

  public static class LogTaskBuilder {
    private String projectId;
    private String sprintId;
    private String name;
    private String assignee;
    private String reviewer;
    private String description;
    private String status;
    private String priority;
    private int storyPoint;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant dtPlanning;
    private Instant dtPredictComplete;
    private int complexDescription;
    private List<Topic> topics;
    private List<SubTask> subTask;
    private List<Attachment> attachment;
    private List<Comment> comments;
    private List<Relation<String>> relations;

    public LogTaskBuilder relations(List<Relation<String>> relations) {
      this.relations = relations;
      return this;
    }


    public LogTaskBuilder projectId(String projectId) {
      this.projectId = projectId;
      return this;
    }

    public LogTaskBuilder sprintId(String sprintId) {
      this.sprintId = sprintId;
      return this;
    }

    public LogTaskBuilder name(String name) {
      this.name = name;
      return this;
    }

    public LogTaskBuilder assignee(String assignee) {
      this.assignee = assignee;
      return this;
    }

    public LogTaskBuilder reviewer(String reviewer) {
      this.reviewer = reviewer;
      return this;
    }

    public LogTaskBuilder description(String description) {
      this.description = description;
      return this;
    }

    public LogTaskBuilder status(String status) {
      this.status = status;
      return this;
    }

    public LogTaskBuilder priority(String priority) {
      this.priority = priority;
      return this;
    }

    public LogTaskBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public LogTaskBuilder dtStart(Instant dtStart) {
      this.dtStart = dtStart;
      return this;
    }

    public LogTaskBuilder dtEnd(Instant dtEnd) {
      this.dtEnd = dtEnd;
      return this;
    }

    public LogTaskBuilder dtPlanning(Instant dtPlanning) {
      this.dtPlanning = dtPlanning;
      return this;
    }

    public LogTaskBuilder dtPredictComplete(Instant dtPredictComplete) {
      this.dtPredictComplete = dtPredictComplete;
      return this;
    }

    public LogTaskBuilder complexDescription(int complexDescription) {
      this.complexDescription = complexDescription;
      return this;
    }

    public LogTaskBuilder topics(List<Topic> topics) {
      this.topics = topics;
      return this;
    }

    public LogTaskBuilder tags(List<Topic> topics) {
      this.topics = topics;
      return this;
    }

    public LogTaskBuilder subTask(List<SubTask> subTask) {
      this.subTask = subTask;
      return this;
    }

    public LogTaskBuilder attachment(List<Attachment> attachment) {
      this.attachment = attachment;
      return this;
    }

    public LogTaskBuilder comments(List<Comment> comments) {
      this.comments = comments;
      return this;
    }

    public LogTask build() {
      return new LogTask(this);
    }
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

  public String getAssignee() {
    return assignee;
  }

  public void setAssigner(String assignee) {
    this.assignee = assignee;
  }

  public String getReviewer() {
    return reviewer;
  }

  public void setReviewer(String reviewer) {
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

  public List<Topic> getTags() {
    return topics;
  }

  public void setTags(List<Topic> topics) {
    this.topics = topics;
  }

  public List<SubTask> getSubTask() {
    return subTask;
  }

  public void setSubTags(List<SubTask> subTask) {
    this.subTask = subTask;
  }

  public List<Attachment> getAttachment() {
    return attachment;
  }

  public void setAttachment(List<Attachment> attachment) {
    this.attachment = attachment;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setAssignee(String assignee) {
    this.assignee = assignee;
  }

  public List<Topic> getTopics() {
    return topics;
  }

  public void setTopics(List<Topic> topics) {
    this.topics = topics;
  }

  public void setSubTask(List<SubTask> subTask) {
    this.subTask = subTask;
  }

  public List<Relation<String>> getRelations() {
    return relations;
  }

  public void setRelations(List<Relation<String>> relations) {
    this.relations = relations;
  }
}
