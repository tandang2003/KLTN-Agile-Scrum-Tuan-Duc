package com.kltn.server.model.entity.embeddedKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserCourseRelationId {
@Column(name = "user_id")
  private String userId;
  @Column(name = "course_id")
  private String courseId;

  public UserCourseRelationId(){}
  public UserCourseRelationId(UserCourseRelationIdBuilder builder){
    this.userId=builder.userId;
    this.courseId=builder.courseId;
  }
  public static UserCourseRelationIdBuilder builder(){
    return new UserCourseRelationIdBuilder();
  }
  public static  class UserCourseRelationIdBuilder{
    private String userId;
    private String courseId;

    public UserCourseRelationIdBuilder userId(String userId){
      this.userId=userId;
      return this;
    }
    public UserCourseRelationIdBuilder courseId(String courseId){
      this.courseId=courseId;
      return this;
    }
    public UserCourseRelationId build(){
      return new UserCourseRelationId(this);
    }
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
}
