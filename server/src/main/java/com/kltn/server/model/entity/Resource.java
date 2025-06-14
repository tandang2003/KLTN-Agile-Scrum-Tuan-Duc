package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "resources")
public class Resource extends BaseEntity {
  //ManyToMany sprint
  @ManyToMany(mappedBy = "dailyFiles")
  private List<ProjectSprint> issueDailyFiles;
  @OneToOne(mappedBy = "fileBackLog")
  private ProjectSprint projectSprint;
  @ManyToMany(mappedBy = "resources")
  private List<Issue> issues;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
  private String name;
  private String extension;
  @Transient
  private String sail;
  @Enumerated(EnumType.STRING)
  private ContentType contentType;
  @Enumerated(EnumType.STRING)
  private PlaceContent placeContent;
  private long size;
  private String publicId;

  public Resource(ResourceEntityBuilder resourceBuilder) {
    super(resourceBuilder);
//        this.project = resourceBuilder.project;
    this.name = resourceBuilder.name;
    this.contentType = resourceBuilder.contentType;
    this.extension = resourceBuilder.extension;
    this.placeContent = resourceBuilder.placeContent;
    this.size = resourceBuilder.size;
    this.user = resourceBuilder.user;
    this.publicId = resourceBuilder.publicId;

  }

  public Resource() {
  }

  public static class ResourceEntityBuilder extends BaseEntityBuilder<Resource, ResourceEntityBuilder> {
    //        private Project project;
    private User user;
    private String name;
    private String extension;
    private ContentType contentType;
    private PlaceContent placeContent;
    private long size;
    private String publicId;

//        public ResourceEntityBuilder project(Project project) {
//            this.project = project;
//            return this;
//        }

    public ResourceEntityBuilder publicId(String publicId) {
      this.publicId = publicId;
      return this;
    }

    public ResourceEntityBuilder user(User user) {
      this.user = user;
      return this;
    }

    public ResourceEntityBuilder name(String name) {
      this.name = name;
      return this;
    }

    public ResourceEntityBuilder extension(String extension) {
      this.extension = extension;
      return this;
    }

    public ResourceEntityBuilder contentType(ContentType contentType) {
      this.contentType = contentType;
      return this;
    }

    public ResourceEntityBuilder placeContent(PlaceContent placeContent) {
      this.placeContent = placeContent;
      return this;
    }

    public ResourceEntityBuilder size(long size) {
      this.size = size;
      return this;
    }

    @Override
    protected ResourceEntityBuilder self() {
      return this;
    }

    @Override
    public Resource build() {
      return new Resource(this);
    }
  }

  public static ResourceEntityBuilder builder() {
    return new ResourceEntityBuilder();
  }


  public String getSail() {
    return sail;
  }

  public void setSail(String sail) {
    this.sail = sail;
  }

//    public Project getProject() {
//        return project;
//    }
//
//    public void setProject(Project project) {
//        this.project = project;
//    }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getExtension() {
    return extension;
  }

  public void setExtension(String extension) {
    this.extension = extension;
  }

  public ContentType getContentType() {
    return contentType;
  }

  public void setContentType(ContentType contentType) {
    this.contentType = contentType;
  }

  public PlaceContent getPlaceContent() {
    return placeContent;
  }

  public void setPlaceContent(PlaceContent placeContent) {
    this.placeContent = placeContent;
  }

  public long getSize() {
    return size;
  }

  public void setSize(long size) {
    this.size = size;
  }

  public String getPublicId() {
    return publicId;
  }

  public void setPublicId(String publicId) {
    this.publicId = publicId;
  }

  public List<ProjectSprint> getIssueDailyFiles() {
    return issueDailyFiles;
  }

  public void setIssueDailyFiles(List<ProjectSprint> issueDailyFiles) {
    this.issueDailyFiles = issueDailyFiles;
  }

  public List<Issue> getIssues() {
    return issues;
  }

  public void setIssues(List<Issue> issues) {
    this.issues = issues;
  }

  public ProjectSprint getProjectSprint() {
    return projectSprint;
  }

  public void setProjectSprint(ProjectSprint projectSprint) {
    this.projectSprint = projectSprint;
  }
}
