package com.kltn.server.DTO.request.entity.course;

import jakarta.validation.constraints.NotNull;

public class UserCourseUpdateRequest {
 @NotNull
 private String userId;
  @NotNull
  private String courseId;
  private double point;

  public UserCourseUpdateRequest(String userId, String courseId, double point) {
    this.userId = userId;
    this.courseId = courseId;
    this.point = point;
  }

  public UserCourseUpdateRequest() {
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
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
    this.point = point;
  }
}
