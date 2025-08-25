package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import jakarta.persistence.*;

import java.util.List;

import java.time.Instant;

@Entity
public class ProjectSprint {
  @EmbeddedId
  private ProjectSprintId id;
  @MapsId("projectId")
  @ManyToOne(optional = false)
  @JoinColumn(name = "project_id", insertable = false)
  private Project project;
  @MapsId("sprintId")
  @ManyToOne()
  @JoinColumn(name = "sprint_id", nullable = false)
  private Sprint sprint;
  @OneToOne
  @JoinColumn(name = "file_backlog_id", referencedColumnName = "id")
  private Resource fileBackLog;
  @OneToOne
  @JoinColumn(name = "file_daily_first_id", referencedColumnName = "id")
  private Resource fileDailyFirst;
  @OneToOne
  @JoinColumn(name = "file_daily_second_id", referencedColumnName = "id")
  private Resource fileDailySecond;

  private int removedIssue;
  private int predictedResult = -2;
  private Instant dtLastPredicted;
  private int predictedResultSecond = -2;
  private Instant dtLastPredictedSecond;

  public ProjectSprint() {
  }

  public static ProjectSprintBuilder builder() {
    return new ProjectSprintBuilder();
  }

  public ProjectSprint(ProjectSprintBuilder builder) {
    this.id = builder.id;
    this.project = builder.project;
    this.sprint = builder.sprint;

  }

  public static class ProjectSprintBuilder {
    private ProjectSprintId id;
    private Project project;
    private Sprint sprint;
    private List<Issue> issues;

    public ProjectSprintBuilder id(ProjectSprintId id) {
      this.id = id;
      return this;
    }

    public ProjectSprintBuilder project(Project project) {
      this.project = project;
      return this;
    }

    public ProjectSprintBuilder sprint(Sprint sprint) {
      this.sprint = sprint;
      return this;
    }

    public ProjectSprintBuilder tasks(List<Issue> issues) {
      this.issues = issues;
      return this;
    }

    public ProjectSprint build() {
      return new ProjectSprint(this);
    }
  }

  public ProjectSprintId getId() {
    return id;
  }

  public void setId(ProjectSprintId id) {
    this.id = id;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  public Sprint getSprint() {
    return sprint;
  }

  public void setSprint(Sprint sprint) {
    this.sprint = sprint;
  }

  public Resource getFileBackLog() {
    return fileBackLog;
  }

  public void setFileBackLog(Resource fileBackLog) {
    this.fileBackLog = fileBackLog;
  }

  public Resource getFileDailyFirst() {
    return fileDailyFirst;
  }

  public void setFileDailyFirst(Resource fileDailyFirst) {
    this.fileDailyFirst = fileDailyFirst;
  }

  public Resource getFileDailySecond() {
    return fileDailySecond;
  }

  public void setFileDailySecond(Resource fileDailySecond) {
    this.fileDailySecond = fileDailySecond;
  }

  public int getPredictedResult() {
    return predictedResult;
  }

  public int getRemovedIssue() {
    return removedIssue;
  }

  public void setRemovedIssue(int removedIssue) {
    this.removedIssue = removedIssue;
  }

  public int isPredictedResult() {
    return predictedResult;
  }

  public void setPredictedResult(int predictedResult) {
    this.predictedResult = predictedResult;
  }

  public Instant getDtLastPredicted() {
    return dtLastPredicted;
  }

  public void setDtLastPredicted(Instant dtLastPredicted) {
    this.dtLastPredicted = dtLastPredicted;
  }

  public Instant getDtLastPredictedSecond() {
    return dtLastPredictedSecond;
  }

  public void setDtLastPredictedSecond(Instant dtLastPredictedSecond) {
    this.dtLastPredictedSecond = dtLastPredictedSecond;
  }

  public int getPredictedResultSecond() {
    return predictedResultSecond;
  }

  public void setPredictedResultSecond(int predictedResultSecond) {
    this.predictedResultSecond = predictedResultSecond;
  }
}
