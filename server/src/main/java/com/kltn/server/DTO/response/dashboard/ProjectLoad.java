package com.kltn.server.DTO.response.dashboard;

import java.util.Map;

public class ProjectLoad {
  private String id;
  private String name;
  private Map<String, Integer> status;
  private int total;
  private int done;
  private int notComplete;
  private double taskBalance;

  public ProjectLoad() {
  }

  public ProjectLoad(ProjectLoadBuilder builder) {
    this.id = builder.id;
    this.name = builder.name;
    this.status = builder.status;
    this.total = builder.total;
    this.done = builder.done;
    this.notComplete = builder.notComplete;
    this.taskBalance = builder.taskBalance;
  }

  public static ProjectLoadBuilder builder() {
    return new ProjectLoadBuilder();
  }

  public static class ProjectLoadBuilder {
    private String id;
    private String name;
    private Map<String, Integer> status;
    private int total;
    private int done;
    private int notComplete;
    private double taskBalance;

    public ProjectLoadBuilder id(String id) {
      this.id = id;
      return this;
    }

    public ProjectLoadBuilder name(String name) {
      this.name = name;
      return this;
    }

    public ProjectLoadBuilder status(Map<String, Integer> status) {
      this.status = status;
      return this;
    }

    public ProjectLoadBuilder total(int total) {
      this.total = total;
      return this;
    }

    public ProjectLoadBuilder done(int done) {
      this.done = done;
      return this;
    }

    public ProjectLoadBuilder notComplete(int notComplete) {
      this.notComplete = notComplete;
      return this;
    }

    public ProjectLoadBuilder taskBalance(double taskBalance) {
      this.taskBalance = taskBalance;
      return this;
    }

    public ProjectLoad build() {
      return new ProjectLoad(this);
    }
  }

  // Getters & Setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Map<String, Integer> getStatus() {
    return status;
  }

  public void setStatus(Map<String, Integer> status) {
    this.status = status;
  }

  public int getTotal() {
    return total;
  }

  public void setTotal(int total) {
    this.total = total;
  }

  public int getDone() {
    return done;
  }

  public void setDone(int done) {
    this.done = done;
  }

  public int getNotComplete() {
    return notComplete;
  }

  public void setNotComplete(int notComplete) {
    this.notComplete = notComplete;
  }

  public double getTaskBalance() {
    return taskBalance;
  }

  public void setTaskBalance(double taskBalance) {
    this.taskBalance = taskBalance;
  }
}
