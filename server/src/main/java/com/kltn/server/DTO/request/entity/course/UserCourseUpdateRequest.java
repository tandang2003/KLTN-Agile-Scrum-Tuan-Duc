package com.kltn.server.DTO.request.entity.course;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UserCourseUpdateRequest {
  @NotNull
  private String userId;
  @Valid
  private List<CoursePointUpdateDetail> coursePoints;

  public UserCourseUpdateRequest() {
  }

  public static class CoursePointUpdateDetail {
    @NotNull
    private String courseId;
    private double point;

    public CoursePointUpdateDetail(String courseId, double point) {
      this.courseId = courseId;
      this.point = point;
    }

    public CoursePointUpdateDetail() {
    }

    public String getCourseId() {
      return courseId;
    }

    public void setCourseId(String courseId) {
      this.courseId = courseId;
    }

    public double getPoint() {
      return point;
    }

    public void setPoint(double point) {
      this.point = point;}

  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public List<CoursePointUpdateDetail> getCoursePoints() {
    return coursePoints;
  }

  public void setCoursePoints(List<CoursePointUpdateDetail> coursePoints) {
    this.coursePoints = coursePoints;
  }
}
