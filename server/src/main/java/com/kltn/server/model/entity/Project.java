package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
  private String name;
  @Column(columnDefinition = "LONGTEXT")
  private String description;
  @OneToMany(mappedBy = "project")
  private List<WorkspacesUsersProjects> workspacesUserProjects;
  @OneToMany(mappedBy = "project")
  private List<ProjectSprint> projectSprints;
  @OneToMany(mappedBy = "project")
  private List<Issue> issues;
  @Transient
  private Sprint currentSprint;
  @Transient
  private Sprint prevSprint;
  @Transient
  private Sprint nextSprint;

  public Project(ProjectEntityBuilder builder) {
    super(builder);
    this.name = builder.name;
    this.description = builder.description;
    this.projectSprints = builder.projectSprints;
    this.workspacesUserProjects = builder.workspacesUserProjects;
    this.issues = builder.issues;
  }

  public Project() {

  }


  public static class ProjectEntityBuilder extends BaseEntityBuilder<Project, ProjectEntityBuilder> {
    private String name;
    private String description;
    private List<ProjectSprint> projectSprints;
    private List<WorkspacesUsersProjects> workspacesUserProjects;
    private List<Issue> issues;

    @Override
    protected ProjectEntityBuilder self() {
      return this;
    }

    @Override
    public Project build() {
      return new Project(this);
    }

    public ProjectEntityBuilder name(String name) {
      this.name = name;
      return this;
    }

    public ProjectEntityBuilder projectSprints(List<ProjectSprint> projectSprints) {
      this.projectSprints = projectSprints;
      return this;
    }

    public ProjectEntityBuilder issues(List<Issue> issues) {
      this.issues = issues;
      return this;
    }

    public ProjectEntityBuilder workspacesUserProjects(List<WorkspacesUsersProjects> workspacesUserProjects) {
      this.workspacesUserProjects = workspacesUserProjects;
      return this;
    }

    public ProjectEntityBuilder description(String description) {
      this.description = description;
      return this;
    }

  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

//    public List<Sprint> getSprints() {
//        return sprints;
//    }
//

  public List<WorkspacesUsersProjects> getWorkspacesUserProjects() {
    return workspacesUserProjects;
  }

  public void setWorkspacesUserProjects(List<WorkspacesUsersProjects> workspacesUserProjects) {
    this.workspacesUserProjects = workspacesUserProjects;
  }

  @Transient
  public Workspace getWorkspace() {
    return workspacesUserProjects == null
      || workspacesUserProjects.isEmpty() ? null :
      workspacesUserProjects.get(0).getWorkspace();
  }

  @Transient
  public List<User> getMembers() {
    return workspacesUserProjects.stream()
      .map(WorkspacesUsersProjects::getUser)
      .toList();
  }

  @Transient
  public Role getMemberRole(String userId) {
    return workspacesUserProjects.stream()
      .filter(
        workspacesUsersProjects ->
          workspacesUsersProjects.getUser().getId().equals(userId))
      .map(WorkspacesUsersProjects::getRole)
      .findFirst()
      .orElse(null);
  }


  @Transient
  public List<Sprint> getSprints() {
    return projectSprints.stream()
      .map(ProjectSprint::getSprint)
      .toList();
  }

  public List<ProjectSprint> getProjectSprints() {
    return projectSprints;
  }

  public List<Issue> getIssues() {
    return issues;
  }

  public void setIssues(List<Issue> issues) {
    this.issues = issues;
  }

  public void setProjectSprints(List<ProjectSprint> projectSprints) {

    this.projectSprints = projectSprints;
  }

  public Sprint getCurrentSprint() {
    return currentSprint;
  }

  public void setCurrentSprint(Sprint currentSprint) {
    this.currentSprint = currentSprint;
  }

  public Sprint getPrevSprint() {
    return prevSprint;
  }

  public void setPrevSprint(Sprint prevSprint) {
    this.prevSprint = prevSprint;
  }

  public Sprint getNextSprint() {
    return nextSprint;
  }

  public void setNextSprint(Sprint nextSprint) {
    this.nextSprint = nextSprint;
  }
}
