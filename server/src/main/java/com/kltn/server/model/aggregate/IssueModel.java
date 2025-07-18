package com.kltn.server.model.aggregate;

import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueTag;

public class IssueModel {
  private String sprint_id;
  private IssueTag type;
  private IssuePriority priority;
  private int numOfAffectVersions;
  private int numOfFixVersions;
  private int numOfLink;
  private int numOfBlocked;
  private int numOfBlock;
  private int numOfComment;
  private int numOfChangeFixVersion;
  private int numOfChangeOfPriority;
  private int numOfChangeOfDescription;
  private int complexityOfDescription;
  private double complatibleOfAssignee;

  public IssueModel() {
  }

  public static IssueModelBuilder builder() {
    return new IssueModelBuilder();
  }

  private IssueModel(IssueModelBuilder builder) {
    this.type = builder.type;
    this.priority = builder.priority;
    this.numOfAffectVersions = builder.numOfAffectVersions;
    this.numOfFixVersions = builder.numOfFixVersions;
    this.numOfLink = builder.numOfLink;
    this.numOfBlocked = builder.numOfBlocked;
    this.numOfBlock = builder.numOfBlock;
    this.numOfComment = builder.numOfComment;
    this.numOfChangeFixVersion = builder.numOfChangeFixVersion;
    this.numOfChangeOfPriority = builder.numOfChangeOfPriority;
    this.numOfChangeOfDescription = builder.numOfChangeOfDescription;
    this.complexityOfDescription = builder.complexityOfDescription;
    this.complatibleOfAssignee = builder.complatibleOfAssignee;
    this.sprint_id= builder.sprint_id;
  }

  public static class IssueModelBuilder {
    private String sprint_id;
    private IssueTag type;
    private IssuePriority priority;
    private int numOfAffectVersions;
    private int numOfFixVersions;
    private int numOfLink;
    private int numOfBlocked;
    private int numOfBlock;
    private int numOfComment;
    private int numOfChangeFixVersion;
    private int numOfChangeOfPriority;
    private int numOfChangeOfDescription;
    private int complexityOfDescription;
    private double complatibleOfAssignee;

    public IssueModelBuilder sprint_id(String sprint_id) {
      this.sprint_id = sprint_id;
      return this;
    }

    public IssueModelBuilder type(IssueTag type) {
      this.type = type;
      return this;
    }

    public IssueModelBuilder priority(IssuePriority priority) {
      this.priority = priority;
      return this;
    }

    public IssueModelBuilder numOfAffectVersions(int numOfAffectVersions) {
      this.numOfAffectVersions = numOfAffectVersions;
      return this;
    }

    public IssueModelBuilder numOfFixVersions(int numOfFixVersions) {
      this.numOfFixVersions = numOfFixVersions;
      return this;
    }

    public IssueModelBuilder numOfLink(int numOfLink) {
      this.numOfLink = numOfLink;
      return this;
    }

    public IssueModelBuilder numOfBlocked(int numOfBlocked) {
      this.numOfBlocked = numOfBlocked;
      return this;
    }

    public IssueModelBuilder numOfBlock(int numOfBlock) {
      this.numOfBlock = numOfBlock;
      return this;
    }

    public IssueModelBuilder numOfComment(int numOfComment) {
      this.numOfComment = numOfComment;
      return this;
    }

    public IssueModelBuilder numOfChangeFixVersion(int numOfChangeFixVersion) {
      this.numOfChangeFixVersion = numOfChangeFixVersion;
      return this;
    }

    public IssueModelBuilder numOfChangeOfPriority(int numOfChangeOfPriority) {
      this.numOfChangeOfPriority = numOfChangeOfPriority;
      return this;
    }

    public IssueModelBuilder numOfChangeOfDescription(int numOfChangeOfDescription) {
      this.numOfChangeOfDescription = numOfChangeOfDescription;
      return this;
    }

    public IssueModelBuilder complexityOfDescription(int complexityOfDescription) {
      this.complexityOfDescription = complexityOfDescription;
      return this;
    }

    public IssueModelBuilder complatibleOfAssignee(double complatibleOfAssignee) {
      this.complatibleOfAssignee = complatibleOfAssignee;
      return this;
    }

    public IssueModel build() {
      return new IssueModel(this);
    }
  }

  public IssueTag getType() {
    return type;
  }

  public void setType(IssueTag type) {
    this.type = type;
  }

  public IssuePriority getPriority() {
    return priority;
  }

  public void setPriority(IssuePriority priority) {
    this.priority = priority;
  }

  public int getNumOfAffectVersions() {
    return numOfAffectVersions;
  }

  public void setNumOfAffectVersions(int numOfAffectVersions) {
    this.numOfAffectVersions = numOfAffectVersions;
  }

  public int getNumOfFixVersions() {
    return numOfFixVersions;
  }

  public void setNumOfFixVersions(int numOfFixVersions) {
    this.numOfFixVersions = numOfFixVersions;
  }

  public int getNumOfLink() {
    return numOfLink;
  }

  public void setNumOfLink(int numOfLink) {
    this.numOfLink = numOfLink;
  }

  public int getNumOfBlocked() {
    return numOfBlocked;
  }

  public void setNumOfBlocked(int numOfBlocked) {
    this.numOfBlocked = numOfBlocked;
  }

  public int getNumOfBlock() {
    return numOfBlock;
  }

  public void setNumOfBlock(int numOfBlock) {
    this.numOfBlock = numOfBlock;
  }

  public int getNumOfComment() {
    return numOfComment;
  }

  public void setNumOfComment(int numOfComment) {
    this.numOfComment = numOfComment;
  }

  public int getNumOfChangeFixVersion() {
    return numOfChangeFixVersion;
  }

  public void setNumOfChangeFixVersion(int numOfChangeFixVersion) {
    this.numOfChangeFixVersion = numOfChangeFixVersion;
  }

  public int getNumOfChangeOfPriority() {
    return numOfChangeOfPriority;
  }

  public void setNumOfChangeOfPriority(int numOfChangeOfPriority) {
    this.numOfChangeOfPriority = numOfChangeOfPriority;
  }

  public int getNumOfChangeOfDescription() {
    return numOfChangeOfDescription;
  }

  public void setNumOfChangeOfDescription(int numOfChangeOfDescription) {
    this.numOfChangeOfDescription = numOfChangeOfDescription;
  }

  public int getComplexityOfDescription() {
    return complexityOfDescription;
  }

  public void setComplexityOfDescription(int complexityOfDescription) {
    this.complexityOfDescription = complexityOfDescription;
  }

  public double getComplatibleOfAssignee() {
    return complatibleOfAssignee;
  }

  public void setComplatibleOfAssignee(double complatibleOfAssignee) {
    this.complatibleOfAssignee = complatibleOfAssignee;
  }

  public String getSprint_id() {
    return sprint_id;
  }

  public void setSprint_id(String sprint_id) {
    this.sprint_id = sprint_id;
  }
}
