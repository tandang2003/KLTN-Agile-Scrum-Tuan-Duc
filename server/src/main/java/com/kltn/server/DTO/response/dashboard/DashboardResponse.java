package com.kltn.server.DTO.response.dashboard;

import java.util.List;
import java.util.Map;

public class DashboardResponse {
  private int issueCreated;
  private int issueDone;
  private int issueFailed;
  private Map<String, Integer> status;
  private List<Workload> workload;
  private Map<String, Integer> priority;

  // Private constructor
  private DashboardResponse() {
  }

  // Builder accessor
  public static DashboardResponseBuilder builder() {
    return new DashboardResponseBuilder();
  }

  public static class DashboardResponseBuilder {
    private final DashboardResponse instance = new DashboardResponse();

    public DashboardResponseBuilder issueCreated(int value) {
      instance.issueCreated = value;
      return this;
    }

    public DashboardResponseBuilder issueDone(int value) {
      instance.issueDone = value;
      return this;
    }

    public DashboardResponseBuilder issueFailed(int value) {
      instance.issueFailed = value;
      return this;
    }

    public DashboardResponseBuilder status(Map<String, Integer> status) {
      instance.status = status;
      return this;
    }

    public DashboardResponseBuilder workload(List<DashboardResponse.Workload> workload) {
      instance.workload = workload;
      return this;
    }

    public DashboardResponseBuilder priority(Map<String, Integer> priority) {
      instance.priority = priority;
      return this;
    }

    public DashboardResponse build() {
      return instance;
    }
  }


  // Getters
  public int getIssueCreated() {
    return issueCreated;
  }

  public int getIssueDone() {
    return issueDone;
  }

  public int getIssueFailed() {
    return issueFailed;
  }

  public Map<String, Integer> getStatus() {
    return status;
  }

  public List<Workload> getWorkload() {
    return workload;
  }

  public Map<String, Integer> getPriority() {
    return priority;
  }

  // -------- Inner Classes --------

  public static class Workload {
    private Assignee assignee;
    private int total;
    private int done;
    private int failed;

    private Workload() {
    }

    public static WorkloadBuilder builder() {
      return new WorkloadBuilder();
    }

    public void setAssignee(Assignee assignee) {
      this.assignee = assignee;
    }

    public void setTotal(int total) {
      this.total = total;
    }

    public void setDone(int done) {
      this.done = done;
    }

    public void setFailed(int failed) {
      this.failed = failed;
    }

    public static class WorkloadBuilder {
      private final DashboardResponse.Workload instance = new DashboardResponse.Workload();

      public WorkloadBuilder assignee(DashboardResponse.Assignee assignee) {
        instance.assignee = assignee;
        return this;
      }

      public WorkloadBuilder total(int total) {
        instance.total = total;
        return this;
      }

      public WorkloadBuilder done(int done) {
        instance.done = done;
        return this;
      }

      public WorkloadBuilder failed(int failed) {
        instance.failed = failed;
        return this;
      }

      public DashboardResponse.Workload build() {
        return instance;
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
      return failed;
    }
  }

  public static class Assignee {
    private String uniId;
    private String name;

    private Assignee() {
    }

    public static AssigneeBuilder builder() {
      return new AssigneeBuilder();
    }

    public static class AssigneeBuilder {
      private final DashboardResponse.Assignee instance = new DashboardResponse.Assignee();

      public AssigneeBuilder uniId(String uniId) {
        instance.uniId = uniId;
        return this;
      }

      public AssigneeBuilder name(String name) {
        instance.name = name;
        return this;
      }

      public DashboardResponse.Assignee build() {
        return instance;
      }
    }


    public String getUniId() {
      return uniId;
    }

    public String getName() {
      return name;
    }
  }
}
