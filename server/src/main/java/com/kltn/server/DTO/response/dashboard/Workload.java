package com.kltn.server.DTO.response.dashboard;

public class Workload {
  private Assignee  assignee;
  private int total;
  private int done;
  private int notComplete;

  private Workload() {
  }

  private Workload(WorkloadBuilder builder) {
    this.assignee = builder.assignee;
    this.total = builder.total;
    this.done = builder.done;
    this.notComplete = builder.notComplete;
  }

  public static WorkloadBuilder builder() {
    return new WorkloadBuilder();
  }

  public void setAssignee(Assignee  assignee) {
    this.assignee = assignee;
  }

  public void setTotal(int total) {
    this.total = total;
  }

  public void setDone(int done) {
    this.done = done;
  }

  public void setFailed(int notComplete) {
    this.notComplete = notComplete;
  }

  public static class WorkloadBuilder {
    private Assignee  assignee;
    private int total;
    private int done;
    private int notComplete;

    public WorkloadBuilder assignee(Assignee  assignee) {
      this.assignee = assignee;
      return this;
    }

    public WorkloadBuilder total(int total) {
      this.total = total;
      return this;
    }

    public WorkloadBuilder done(int done) {
      this.done = done;
      return this;
    }

    public WorkloadBuilder notComplete(int notComplete) {
      this.notComplete = notComplete;
      return this;
    }

    public Workload build() {
      return new Workload(this);
    }

    public static WorkloadBuilder builder() {
      return new WorkloadBuilder();
    }
  }

  public Assignee getAssignee() {
    return assignee;
  }

  public int getTotal() {
    return total;
  }

  public int getDone() {
    return done;
  }

  public int getFailed() {
    return notComplete;
  }
}
