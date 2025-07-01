package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Course;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import jakarta.persistence.*;

@Entity
public class UserCourseRelation {
  @EmbeddedId
  private UserCourseRelationId id;
  @MapsId("userId")
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
  @MapsId("courseId")
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  private Course course;

  private double point = -1;

  public UserCourseRelation() {
  }

  public UserCourseRelation(UserCourseRelationBuilder builder) {
    this.id = builder.id;
    this.user = builder.user;
    this.course = builder.course;
    this.point = builder.point;
  }

  public static UserCourseRelationBuilder builder() {
    return new UserCourseRelationBuilder();
  }

  public static class UserCourseRelationBuilder {
    private UserCourseRelationId id;
    private User user;
    private Course course;
    private double point = -1;

    public UserCourseRelationBuilder id(UserCourseRelationId id) {
      this.id = id;
      return this;
    }

    public UserCourseRelationBuilder user(User user) {
      this.user = user;
      return this;
    }

    public UserCourseRelationBuilder course(Course course) {
      this.course = course;
      return this;
    }

    public UserCourseRelationBuilder point(double point) {
      this.point = point;
      return this;
    }

    public UserCourseRelation build() {
      return new UserCourseRelation(this);
    }
  }

  public UserCourseRelationId getId() {
    return id;
  }

  public void setId(UserCourseRelationId id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Course getCourse() {
    return course;
  }

  public void setCourse(Course course) {
    this.course = course;
  }

  public double getPoint() {
    return point;
  }

  public void setPoint(double point) {
    this.point = point;
  }
}
