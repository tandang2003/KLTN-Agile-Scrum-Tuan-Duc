package com.kltn.server.DTO.response.dashboard;

import java.util.List;
import java.util.Map;

public class DashboardProjectResponse {
  private int issueCreated;
  private int issueDone;
  private int issueFailed;
  private Map<String, Integer> status;
  private List<Workload> workload;
  private Map<String, Integer> priority;

  // Private constructor
  private DashboardProjectResponse() {
  }

  // Builder accessor
  public static DashboardResponseBuilder builder() {
    return new DashboardResponseBuilder();
  }

  public static class DashboardResponseBuilder {
    private final DashboardProjectResponse instance = new DashboardProjectResponse();

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

    public DashboardResponseBuilder workload(List<Workload> workload) {
      instance.workload = workload;
      return this;
    }

    public DashboardResponseBuilder priority(Map<String, Integer> priority) {
      instance.priority = priority;
      return this;
    }

    public DashboardProjectResponse build() {
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






}
