package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.CourseRelation;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Course extends BaseEntity {
  private String name;
  private String courseId;
  private boolean haveModel;
  @OneToMany(mappedBy = "dependentCourse")
  private List<CourseRelation> dependentCourses;
  @OneToMany(mappedBy = "prerequisiteCourse")
  private List<CourseRelation> prerequisiteCourses;
  @OneToMany(mappedBy = "course")
  private List<Workspace> workspaces;
  @OneToMany(mappedBy = "course")
  private List<UserCourseRelation> users;

  public Course() {
  }

  public Course(CourseBuilder builder) {
    super(builder);
    this.name = builder.name;
    this.courseId = builder.courseId;
    this.haveModel=builder.haveModel;
  }

  public static CourseBuilder builder() {
    return new CourseBuilder();
  }

  public static class CourseBuilder extends BaseEntity.BaseEntityBuilder<Course, CourseBuilder> {
    private String name;
    private String courseId;
    private boolean haveModel;


    public CourseBuilder name(String name) {
      this.name = name;
      return this;
    }

    public CourseBuilder courseId(String courseId) {
      this.courseId = courseId;
      return this;
    }

    public CourseBuilder haveModel(boolean haveModel){
      this.haveModel=haveModel;
      return this;
    }

    @Override
    protected CourseBuilder self() {
      return null;
    }

    @Override
    public Course build() {
      return new Course(this);
    }

  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCourseId() {
    return courseId;
  }

  public void setCourseId(String courseId) {
    this.courseId = courseId;
  }

  public List<CourseRelation> getDependentCourses() {
    return dependentCourses;
  }

  public void setDependentCourses(List<CourseRelation> dependentCourses) {
    this.dependentCourses = dependentCourses;
  }

  public List<CourseRelation> getPrerequisiteCourses() {
    return prerequisiteCourses;
  }

  public void setPrerequisiteCourses(List<CourseRelation> prerequisiteCourses) {
    this.prerequisiteCourses = prerequisiteCourses;
  }

  public List<Workspace> getWorkspaces() {
    return workspaces;
  }

  public void setWorkspaces(List<Workspace> workspaces) {
    this.workspaces = workspaces;
  }

  public boolean isHaveModel() {
    return haveModel;
  }

  public void setHaveModel(boolean haveModel) {
    this.haveModel = haveModel;
  }
}
