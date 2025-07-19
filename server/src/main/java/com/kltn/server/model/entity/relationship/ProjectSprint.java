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
  @JoinColumn(name = "project_id",
    insertable = false)
  private Project project;
  @MapsId("sprintId")
  @ManyToOne()
  @JoinColumn(name = "sprint_id",
    nullable = false)
  private Sprint sprint;
  @OneToOne
  @JoinColumn(name = "file_backlog_id",
    referencedColumnName = "id")
  private Resource fileBackLog;
  @ManyToMany
  @JoinTable(name = "sprint_resource",
    joinColumns = {
      @JoinColumn(name = "project_id",
        referencedColumnName = "project_id"),
      @JoinColumn(name = "sprint_id",
        referencedColumnName = "sprint_id")},
    inverseJoinColumns = @JoinColumn(name = "resource_id"))
  private List<Resource> dailyFiles;
  private Instant dtPreview;
  private int removedIssue;


  public ProjectSprint() {
  }

  public static ProjectSprintBuilder builder() {
    return new ProjectSprintBuilder();
  }

  public ProjectSprint(ProjectSprintBuilder builder) {
    this.id = builder.id;
    this.project = builder.project;
    this.sprint = builder.sprint;
//        this.issues = builder.issues;
//        this.dtPlanning = builder.DTPlanning;
    this.dtPreview = builder.dtPreview;
  }

  public static class ProjectSprintBuilder {
    private ProjectSprintId id;
    private Project project;
    private Sprint sprint;
    private List<Issue> issues;
//        private Instant DTPlanning;
        private Instant dtPreview;

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
    public ProjectSprintBuilder dtPreview(Instant dtPreview) {
      this.dtPreview = dtPreview;
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

  public List<Resource> getDailyFiles() {
    return dailyFiles;
  }

  public void setDailyFiles(List<Resource> dailyFiles) {
    this.dailyFiles = dailyFiles;
  }

  public Instant getDtPreview() {
    return dtPreview;
  }

  public void setDtPreview(Instant dtPreview) {
    this.dtPreview = dtPreview;
  }

  public int getRemovedIssue() {
    return removedIssue;
  }

  public void setRemovedIssue(int removedIssue) {
    this.removedIssue = removedIssue;
  }
}
