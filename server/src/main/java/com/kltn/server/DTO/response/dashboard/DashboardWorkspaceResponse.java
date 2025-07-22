package com.kltn.server.DTO.response.dashboard;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.Map;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DashboardWorkspaceResponse {
  private int numOfProject;
  private long maxNumMember;
  private long minNumMember;
  /// Mức độ tham gia của sinh viên:
  ///
  /// % sinh viên có hoạt động mỗi sprint
  ///
  /// Tỷ lệ sinh viên hoàn thành đầy đủ backlog được giao mỗi sprint

//  tỉ lệ sinh viên được giao việc
  private double assigneeRate;
  //  tỉ lệ hoàn thành công việc của sinh viên
  private double taskFinishRate;
//  private List<Workload> students;
//  private List<ProjectLoad> projects;

  public DashboardWorkspaceResponse() {
  }

  public DashboardWorkspaceResponse(DashboardWorkspaceResponseBuilder builder) {
    this.numOfProject = builder.numOfProject;
    this.maxNumMember = builder.maxNumMember;
    this.minNumMember = builder.minNumMember;
    this.assigneeRate = builder.assigneeRate;
    this.taskFinishRate = builder.taskFinishRate;
//    this.students = builder.students;
//    this.projects = builder.projects;
  }

  public static DashboardWorkspaceResponseBuilder builder() {
    return new DashboardWorkspaceResponseBuilder();
  }

  public static class DashboardWorkspaceResponseBuilder {
    private int numOfProject;
    private long maxNumMember;
    private long minNumMember;
    //    private List<Workload> students;
//    private List<ProjectLoad> projects;
    private double assigneeRate;
    private double taskFinishRate;

    public DashboardWorkspaceResponseBuilder numOfProject(int numOfProject) {
      this.numOfProject = numOfProject;
      return this;
    }

    public DashboardWorkspaceResponseBuilder maxNumMember(long maxNumMember) {
      this.maxNumMember = maxNumMember;
      return this;
    }

    public DashboardWorkspaceResponseBuilder assigneeRate(double assigneeRate) {
      this.assigneeRate = assigneeRate;
      return this;
    }

    public DashboardWorkspaceResponseBuilder taskFinishRate(double taskFinishRate) {
      this.taskFinishRate = taskFinishRate;
      return this;
    }

    public DashboardWorkspaceResponseBuilder minNumMember(long minNumMember) {
      this.minNumMember = minNumMember;
      return this;
    }

//    public DashboardWorkspaceResponseBuilder students(List<Workload> students) {
//      this.students = students;
//      return this;
//    }
//
//    public DashboardWorkspaceResponseBuilder projects(List<ProjectLoad> projects) {
//      this.projects = projects;
//      return this;
//    }

    public DashboardWorkspaceResponse build() {
      return new DashboardWorkspaceResponse(this);
    }
  }

  // Getters & Setters
  public int getNumOfProject() {
    return numOfProject;
  }

  public void setNumOfProject(int numOfProject) {
    this.numOfProject = numOfProject;
  }

  public long getMaxNumMember() {
    return maxNumMember;
  }

  public void setMaxNumMember(long maxNumMember) {
    this.maxNumMember = maxNumMember;
  }

  public long getMinNumMember() {
    return minNumMember;
  }

  public void setMinNumMember(long minNumMember) {
    this.minNumMember = minNumMember;
  }

//  public List<Workload> getStudents() {
//    return students;
//  }
//
//  public void setStudents(List<Workload> students) {
//    this.students = students;
//  }
//
//  public List<ProjectLoad> getProjects() {
//    return projects;
//  }
//
//  public void setProjects(List<ProjectLoad> projects) {
//    this.projects = projects;
//  }

  // ------------ Nested Class: ProjectLoad -------------

  public double getAssigneeRate() {
    return assigneeRate;
  }

  public void setAssigneeRate(double assigneeRate) {
    this.assigneeRate = assigneeRate;
  }

  public double getTaskFinishRate() {
    return taskFinishRate;
  }

  public void setTaskFinishRate(double taskFinishRate) {
    this.taskFinishRate = taskFinishRate;
  }
}

