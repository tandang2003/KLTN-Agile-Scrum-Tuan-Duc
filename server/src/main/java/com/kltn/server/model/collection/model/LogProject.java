package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class LogProject extends ILog {
  //  @Field("nk_project_id")
//  private String nkProjectId;
  @Field("description") private String description;
  @Field("position") private Object position;

//  @Field("tags") private Topic[] tags;

  private LogProject(LogProjectBuilder builder) {
//        this.nkProjectId = builder.nkProjectId;
    this.description = builder.description;
    this.position    = builder.position;
//    this.tags        = builder.tags;
  }

  public LogProject() {
    super();
  }

  public static LogProjectBuilder builder() {
    return new LogProjectBuilder();
  }


  public static class LogProjectBuilder {
    //    private String nkProjectId;
    private String description;
    private Object position;
//    private Topic[] tags;

//    public LogProjectBuilder setNkProjectId(String nkProjectId) {
//      this.nkProjectId = nkProjectId; return this;
//    }

    public LogProjectBuilder setDescription(String description) {
      this.description = description;
      return this;
    }

//    public LogProjectBuilde/**/r setTags(Topic[] tags) {
//      this.tags = tags;
//      return this;
//    }

    public LogProjectBuilder position(Object position) {
      this.position = position;
      return this;
    }

    public LogProject build() {
      return new LogProject(this);
    }
  }

//  public String getNkProjectId() {
//    return nkProjectId;
//  }
//
//  public void setNkProjectId(String nkProjectId) {
//    this.nkProjectId = nkProjectId;
//  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

//  public Topic[] getTags() {
//    return tags;
//  }

//  public void setTags(Topic[] tags) {
//    this.tags = tags;
//  }
}
