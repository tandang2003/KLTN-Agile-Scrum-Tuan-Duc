package com.kltn.server.model.aggregate;

import java.util.List;

public class IterationModel {
  private String sprint_id;
  private int storyPoint;
  private int sprintDuration;
  private int numOfIssueAtStart;
  private int numOfIssueAdded;
  private int numOfIssueRemoved;
  private int numOfIssueTodo;
  private int numOfIssueInProgress;
  private int numOfIssueDone;
  private List<IssueModel> issueModelList;
  private int teamSize;

  public IterationModel() {
  }

  public static IterationModelBuilder builder() {
    return new IterationModelBuilder();
  }

  private IterationModel(IterationModelBuilder builder) {
   this.sprint_id = builder.sprint_id;
    this.storyPoint = builder.storyPoint;
    this.sprintDuration = builder.sprintDuration;
    this.numOfIssueAtStart = builder.numOfIssueAtStart;
    this.numOfIssueAdded = builder.numOfIssueAdded;
    this.numOfIssueRemoved = builder.numOfIssueRemoved;
    this.numOfIssueTodo = builder.numOfIssueTodo;
    this.numOfIssueInProgress = builder.numOfIssueInProgress;
    this.numOfIssueDone = builder.numOfIssueDone;
    this.issueModelList = builder.issueModelList;
    this.teamSize = builder.teamSize;
  }

  public static class IterationModelBuilder {
    private String sprint_id;
    private int storyPoint;
    private int sprintDuration;
    private int numOfIssueAtStart;
    private int numOfIssueAdded;
    private int numOfIssueRemoved;
    private int numOfIssueTodo;
    private int numOfIssueInProgress;
    private int numOfIssueDone;
    private List<IssueModel> issueModelList;
    private int teamSize;

    public IterationModelBuilder sprint_id(String sprint_id) {
      this.sprint_id = sprint_id;
      return this;
    }

    public IterationModelBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public IterationModelBuilder sprintDuration(int sprintDuration) {
      this.sprintDuration = sprintDuration;
      return this;
    }

    public IterationModelBuilder numOfIssueAtStart(int numOfIssueAtStart) {
      this.numOfIssueAtStart = numOfIssueAtStart;
      return this;
    }

    public IterationModelBuilder numOfIssueAdded(int numOfIssueAdded) {
      this.numOfIssueAdded = numOfIssueAdded;
      return this;
    }

    public IterationModelBuilder numOfIssueRemoved(int numOfIssueRemoved) {
      this.numOfIssueRemoved = numOfIssueRemoved;
      return this;
    }

    public IterationModelBuilder numOfIssueTodo(int numOfIssueTodo) {
      this.numOfIssueTodo = numOfIssueTodo;
      return this;
    }

    public IterationModelBuilder numOfIssueInProgress(int numOfIssueInProgress) {
      this.numOfIssueInProgress = numOfIssueInProgress;
      return this;
    }

    public IterationModelBuilder numOfIssueDone(int numOfIssueDone) {
      this.numOfIssueDone = numOfIssueDone;
      return this;
    }

    public IterationModelBuilder issueModelList(List<IssueModel> issueModelList) {
      this.issueModelList = issueModelList;
      return this;
    }

    public IterationModelBuilder teamSize(int teamSize) {
      this.teamSize = teamSize;
      return this;
    }

    public IterationModel build() {
      return new IterationModel(this);
    }
  }

  public int getSprintDuration() {
    return sprintDuration;
  }

  public void setSprintDuration(int sprintDuration) {
    this.sprintDuration = sprintDuration;
  }

  public int getNumOfIssueAtStart() {
    return numOfIssueAtStart;
  }

  public void setNumOfIssueAtStart(int numOfIssueAtStart) {
    this.numOfIssueAtStart = numOfIssueAtStart;
  }

  public int getNumOfIssueAdded() {
    return numOfIssueAdded;
  }

  public void setNumOfIssueAdded(int numOfIssueAdded) {
    this.numOfIssueAdded = numOfIssueAdded;
  }

  public int getNumOfIssueRemoved() {
    return numOfIssueRemoved;
  }

  public void setNumOfIssueRemoved(int numOfIssueRemoved) {
    this.numOfIssueRemoved = numOfIssueRemoved;
  }

  public int getNumOfIssueTodo() {
    return numOfIssueTodo;
  }

  public void setNumOfIssueTodo(int numOfIssueTodo) {
    this.numOfIssueTodo = numOfIssueTodo;
  }

  public int getNumOfIssueInProgress() {
    return numOfIssueInProgress;
  }

  public void setNumOfIssueInProgress(int numOfIssueInProgress) {
    this.numOfIssueInProgress = numOfIssueInProgress;
  }

  public int getNumOfIssueDone() {
    return numOfIssueDone;
  }

  public void setNumOfIssueDone(int numOfIssueDone) {
    this.numOfIssueDone = numOfIssueDone;
  }

  public List<IssueModel> getIssueModelList() {
    return issueModelList;
  }

  public void setIssueModelList(List<IssueModel> issueModelList) {
    this.issueModelList = issueModelList;
  }

  public int getTeamSize() {
    return teamSize;
  }

  public void setTeamSize(int teamSize) {
    this.teamSize = teamSize;
  }

  public String getSprint_id() {
    return sprint_id;
  }

  public void setSprint_id(String sprint_id) {
    this.sprint_id = sprint_id;
  }

  public int getStoryPoint() {
    return storyPoint;
  }

  public void setStoryPoint(int storyPoint) {
    this.storyPoint = storyPoint;
  }
}
