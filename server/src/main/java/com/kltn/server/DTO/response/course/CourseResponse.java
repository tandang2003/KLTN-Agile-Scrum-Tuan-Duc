package com.kltn.server.DTO.response.course;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.entity.relationship.CourseRelation;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CourseResponse(String id, String name, String courseId) {
  public CourseResponse(CourseResponseBuilder builder) {
    this(builder.id, builder.name, builder.courseId);
  }

  public static CourseResponseBuilder builder() {
    return new CourseResponseBuilder();
  }

  public static class CourseResponseBuilder {
    private String id;
    private String name;
    private String courseId;

    public CourseResponseBuilder id(String id) {
      this.id = id;
      return this;
    }

    public CourseResponseBuilder name(String name) {
      this.name = name;
      return this;
    }

    public CourseResponseBuilder courseId(String courseId) {
      this.courseId = courseId;
      return this;
    }


    public CourseResponse build() {
      return new CourseResponse(this);
    }
  }

}
