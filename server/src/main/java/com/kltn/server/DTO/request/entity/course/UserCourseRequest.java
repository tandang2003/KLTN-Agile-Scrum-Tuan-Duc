package com.kltn.server.DTO.request.entity.course;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public class UserCourseRequest {
  @NotNull
  @NotEmpty
  Map<String, Double> coursePoints;

  public UserCourseRequest(Map<String, Double> coursePoints) {
    this.coursePoints = coursePoints;
  }

  public Map<String, Double> getCoursePoints() {
    return coursePoints;
  }

  public void setCoursePoints(Map<String, Double> coursePoints) {
    this.coursePoints = coursePoints;
  }
}
