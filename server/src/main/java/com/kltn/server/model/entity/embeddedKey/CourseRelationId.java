package com.kltn.server.model.entity.embeddedKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CourseRelationId {
  @Column(name = "dependent_course_id")
  private String dependentCourseId;
  @Column(name = "prerequisite_course_id")
  private String prerequisiteCourseId;

  public CourseRelationId() {
  }

  public CourseRelationId(CourseRelationIdBuilder builder) {
    this.dependentCourseId = builder.dependentCourseId;
    this.prerequisiteCourseId = builder.prerequisiteCourseId;
  }

  public static CourseRelationIdBuilder builder() {
    return new CourseRelationIdBuilder();
  }

  public static class CourseRelationIdBuilder {
    public String dependentCourseId;
    public String prerequisiteCourseId;

    public CourseRelationIdBuilder dependentCourseId(String dependentCourseId) {
      this.dependentCourseId = dependentCourseId;
      return this;
    }

    public CourseRelationIdBuilder prerequisiteCourseId(String prerequisiteCourseId) {
      this.prerequisiteCourseId = prerequisiteCourseId;
      return this;
    }

    public CourseRelationId build() {
      return new CourseRelationId(this);
    }
  }

  public String getDependentCourseId() {
    return dependentCourseId;
  }

  public void setDependentCourseId(String dependentCourseId) {
    this.dependentCourseId = dependentCourseId;
  }

  public String getPrerequisiteCourseId() {
    return prerequisiteCourseId;
  }

  public void setPrerequisiteCourseId(String prerequisiteCourseId) {
    this.prerequisiteCourseId = prerequisiteCourseId;
  }
}
