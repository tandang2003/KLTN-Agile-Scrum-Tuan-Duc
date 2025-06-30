package com.kltn.server.DTO.response.course;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserCourseResponse(CourseResponse course, double point) {
  public UserCourseResponse(UserCourseResponseBuilder builder) {
    this( builder.course, builder.point);
  }
  public static UserCourseResponseBuilder builder() {
    return new UserCourseResponseBuilder();
  }
  public static class UserCourseResponseBuilder {
    private CourseResponse course;
    private double point;


    public UserCourseResponseBuilder course(CourseResponse course) {
      this.course = course;
      return this;
    }
    public UserCourseResponseBuilder point(double point) {
      this.point = point;
      return this;
    }
    public UserCourseResponse build() {
      return new UserCourseResponse(this);
    }
  }
}
