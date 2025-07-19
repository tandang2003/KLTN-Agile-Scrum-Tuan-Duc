package com.kltn.server.model.entity;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.PersonalSkill;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {
  private String name;
  private String password;
  private String email;
  private String uniId;
  private String className;
  private String uniPassword;
  @OneToOne
  @JoinColumn(name = "avatar_id",
    referencedColumnName = "id")
  private Resource avatar;
  @ManyToOne
  @JoinColumn(name = "role_id")
  private Role role;
  @OneToMany(mappedBy = "owner")
  private List<Workspace> workspaces;
  @OneToMany
  @JoinColumn(name = "user_id")
  private List<WorkspacesUsersProjects> workspacesUserProjects;
  @OneToMany(mappedBy = "assignee")
  private Set<Issue> assignedIssues;
  // One user can review multiple tasks
  @OneToMany(mappedBy = "reviewer")
  private Set<Issue> reviewedIssues;
  @Transient
  private boolean alive;
  @OneToMany(mappedBy = "user")
  private List<UserCourseRelation> courses;
  @OneToMany
  private List<PersonalSkill> skills;

  public User() {
    super();
  }


  public static UserEntityBuilder builder() {
    return new UserEntityBuilder();
  }

  private User(UserEntityBuilder builder) {
    super(builder);
    this.name = builder.name;
    this.className = builder.className;
    this.password = builder.password;
    this.email = builder.email;
    this.uniId = builder.uniId;
    this.uniPassword = builder.uniPassword;
    this.role = builder.role;
    //        this.projects = builder.projects;
    this.assignedIssues = builder.assignedIssues;
    this.reviewedIssues = builder.reviewedIssues;
    this.workspaces = builder.workspaces;
    this.courses = builder.courses;

  }

  public static class UserEntityBuilder extends BaseEntityBuilder<User, UserEntityBuilder> {
    private String name;
    private String className;
    private String password;
    private String email;
    private String uniId;
    private String uniPassword;
    private Role role;
    private List<Project> projects;
    private List<Workspace> workspaces;
    private Set<Issue> assignedIssues;
    // One user can review multiple tasks
    private Set<Issue> reviewedIssues;
    private List<Workspace> workspacesJoined;
    private List<UserCourseRelation> courses;

    private UserEntityBuilder() {
      super();
    }

    @Override
    protected UserEntityBuilder self() {
      return this;
    }

    @Override
    public User build() {
      return new User(this);
    }


    public UserEntityBuilder name(String name) {
      this.name = name;
      return this;
    }

    public UserEntityBuilder workspacesJoined(List<Workspace> workspacesJoined) {
      this.workspacesJoined = workspacesJoined;
      return this;
    }

    public UserEntityBuilder className(String className) {
      this.className = className;
      return this;
    }

    public UserEntityBuilder password(String password) {
      this.password = password;
      return this;
    }

    public UserEntityBuilder email(String email) {
      this.email = email;
      return this;
    }

    public UserEntityBuilder uniId(String uniId) {
      this.uniId = uniId;
      return this;
    }

    public UserEntityBuilder uniPassword(String uniPassword) {
      this.uniPassword = uniPassword;
      return this;
    }

    public UserEntityBuilder role(Role role) {
      this.role = role;
      return this;
    }

    public UserEntityBuilder project(List<Project> projects) {
      this.projects = projects;
      return this;
    }

    public UserEntityBuilder assignedIssues(Set<Issue> assignedIssues) {
      this.assignedIssues = assignedIssues;
      return this;
    }

    public UserEntityBuilder reviewedIssues(Set<Issue> reviewedIssues) {
      this.reviewedIssues = reviewedIssues;
      return this;
    }

    public UserEntityBuilder workspaces(List<Workspace> workspaces) {
      this.workspaces = workspaces;
      return this;
    }

    public UserEntityBuilder courses(List<UserCourseRelation> courses) {
      this.courses = courses;
      return this;
    }
  }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {

    // Convert role permissions to authorities
    Collection<GrantedAuthority> authorities = new ArrayList<>(role.getPermissions()
      .stream()
      .map(p -> new SimpleGrantedAuthority(p.getName()))
      .toList());

    // Add role with "ROLE_" prefix
    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUniId() {
    return uniId;
  }

  public void setUniId(String uniId) {
    this.uniId = uniId;
  }

  public String getClassName() {
    return className;
  }

  public void setClassName(String className) {
    this.className = className;
  }

  public String getUniPassword() {
    return uniPassword;
  }

  public void setUniPassword(String uniPassword) {
    this.uniPassword = uniPassword;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public List<Workspace> getWorkspaces() {
    return workspaces;
  }

  public void setWorkspaces(List<Workspace> workspaces) {
    this.workspaces = workspaces;
  }

  public Set<Issue> getAssignedIssues() {
    return assignedIssues;
  }

  public void setAssignedIssues(Set<Issue> assignedIssues) {
    this.assignedIssues = assignedIssues;
  }

  public Set<Issue> getReviewedIssues() {
    return reviewedIssues;
  }

  public void setReviewedIssues(Set<Issue> reviewedIssues) {
    this.reviewedIssues = reviewedIssues;
  }

  public boolean isAlive() {
    return alive;
  }

  public void setAlive(boolean alive) {
    this.alive = alive;
  }

  @Override
  public String getUsername() {
    return name;
  }


  public List<WorkspacesUsersProjects> getWorkspacesUserProjects() {
    return workspacesUserProjects;
  }

  public void setWorkspacesUserProjects(List<WorkspacesUsersProjects> workspacesUserProjects) {
    this.workspacesUserProjects = workspacesUserProjects;
  }

  public Set<Project> getProjectJoin() {
    return workspacesUserProjects.stream().map(WorkspacesUsersProjects::getProject).collect(Collectors.toSet());
  }

  public Role getProjectRole(String projectId) {
    return workspacesUserProjects.stream()
      .filter(w -> !w.getProject().getId().equals(projectId))
      .findFirst()
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND_PROJECT).build())
      .getRole();
  }

  public Set<Workspace> getWorkspaceJoin() {
    return workspacesUserProjects.stream().map(WorkspacesUsersProjects::getWorkspace).collect(Collectors.toSet());
  }

  public Resource getAvatar() {
    return avatar;
  }

  public void setAvatar(Resource avatar) {
    this.avatar = avatar;
  }

  public List<UserCourseRelation> getCourses() {
    return courses;
  }

  public void setCourses(List<UserCourseRelation> courses) {
    this.courses = courses;
  }

  public List<PersonalSkill> getSkills() {
    return skills;
  }

  public void setSkills(List<PersonalSkill> skills) {
    this.skills = skills;
  }
}


