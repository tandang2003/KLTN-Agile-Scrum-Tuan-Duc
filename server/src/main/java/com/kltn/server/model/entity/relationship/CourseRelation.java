package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Course;
import com.kltn.server.model.entity.embeddedKey.CourseRelationId;
import jakarta.persistence.*;

@Entity
public class CourseRelation {
  @EmbeddedId
  private CourseRelationId id;
@MapsId("dependentCourseId")
@ManyToOne(optional = false)
@JoinColumn(name = "dependent_course_id")
  private Course dependentCourse;
  @MapsId("prerequisiteCourseId")
  @ManyToOne(optional = false)
  @JoinColumn(name = "prerequisite_course_id")
  private Course prerequisiteCourse;
  public CourseRelation() {}
  public CourseRelation(CourseRelationBuilder builder) {
    this.id=builder.id;
    this.dependentCourse=builder.dependentCourse;
    this.prerequisiteCourse=builder.prerequisiteCourse;
  }
  public static CourseRelationBuilder builder(){
    return new CourseRelationBuilder();
  }

  public static class CourseRelationBuilder {
    private CourseRelationId id;
    private Course dependentCourse;
    private Course prerequisiteCourse;

    public CourseRelationBuilder id(CourseRelationId id) {
      this.id = id;
      return this;
    }

    public CourseRelationBuilder dependentCourse(Course dependentCourse) {
      this.dependentCourse = dependentCourse;
      return this;
    }
    public CourseRelationBuilder prerequisiteCourse(Course prerequisiteCourse) {
      this.prerequisiteCourse = prerequisiteCourse;
      return this;
    }
    public CourseRelation build() {
      return new CourseRelation(this);
    }
  }

  public CourseRelationId getId() {
    return id;
  }

  public void setId(CourseRelationId id) {
    this.id = id;
  }

  public Course getDependentCourse() {
    return dependentCourse;
  }

  public void setDependentCourse(Course dependentCourse) {
    this.dependentCourse = dependentCourse;
  }

  public Course getPrerequisiteCourse() {
    return prerequisiteCourse;
  }

  public void setPrerequisiteCourse(Course prerequisiteCourse) {
    this.prerequisiteCourse = prerequisiteCourse;
  }
}
