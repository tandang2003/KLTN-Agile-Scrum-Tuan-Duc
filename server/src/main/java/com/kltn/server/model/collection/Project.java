package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Topic;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document
public class Project extends BaseDocument {

  @Field("nk_project_id")
  private String nkProjectId;
  @Field("description")
  private String description;
  @Field("topics")
  private List<Topic> topics;
  @Field("position")
  private Map<String, SprintBoard> position;

  public Project() {
    super();
  }

  public Project(ProjectBuilder builder) {
    super(builder);
    this.nkProjectId = builder.nkProjectId;
    this.description = builder.description;
    this.topics = builder.topics;
  }

  public static class ProjectBuilder extends BaseDocument.BaseDocumentBuilder<Project, ProjectBuilder> {
    private String nkProjectId;
    private String description;
    private List<Topic> topics;
    private Map<String, SprintBoard> position;

    public ProjectBuilder nkProjectId(String nkProjectId) {
      this.nkProjectId = nkProjectId;
      return this;
    }

    public ProjectBuilder description(String description) {
      this.description = description;
      return this;
    }

    public ProjectBuilder position(Map<String, SprintBoard> position) {
      this.position = position;
      return this;
    }

    public ProjectBuilder topics(List<Topic> topics) {
      this.topics = topics;
      return this;
    }

    @Override
    protected ProjectBuilder self() {
      return this;
    }

    @Override

    public Project build() {
      return new Project(this);
    }
  }

  public static ProjectBuilder builder() {
    return new ProjectBuilder();
  }

  public String getNkProjectId() {
    return nkProjectId;
  }

  public void setNkProjectId(String nkProjectId) {
    this.nkProjectId = nkProjectId;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<Topic> getTopics() {
    if (topics == null) {
      return new ArrayList<>();
    }
    return topics;
  }

  public void setTopics(List<Topic> topics) {
    this.topics = topics;
  }

  public Map<String, SprintBoard>  getPosition() {
    return position;
  }

  public void setPosition(Map<String, SprintBoard> position) {
    this.position = position;
  }

}