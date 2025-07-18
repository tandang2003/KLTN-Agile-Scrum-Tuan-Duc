package com.kltn.server.DTO.response.workspace;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.DTO.response.course.CourseResponse;
import com.kltn.server.DTO.response.course.UserCourseResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.entity.Course;
import com.kltn.server.repository.entity.SprintRepository;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record WorkspaceResponse(
    String id,
    String name,
    String description,
    int sprintNum,
    @JsonInclude(JsonInclude.Include.ALWAYS) SprintResponse prevSprint,
    @JsonInclude(JsonInclude.Include.ALWAYS) SprintResponse currentSprint,
    @JsonInclude(JsonInclude.Include.ALWAYS) SprintResponse nextSprint,
    UserResponse owner,
    Instant start,
    Instant end,
    List<ProjectResponse> projects,
    Instant createdAt,
    CourseResponse course,
    List<UserCourseResponse> prerequisiteCourse

) {
  public static WorkspaceResponseBuilder builder() {
    return new WorkspaceResponseBuilder();
  }

  public static class WorkspaceResponseBuilder {
    String id;
    String name;
    String description;
    int sprintNum;
    SprintResponse prevSprint;
    SprintResponse currentSprint;
    SprintResponse nextSprint;
    Instant start;
    Instant end;
    UserResponse owner;
    List<ProjectResponse> projects;
    Instant createdAt;
    CourseResponse course;
    List<UserCourseResponse> prerequisiteCourse;

    public WorkspaceResponseBuilder id(String id) {
      this.id = id;
      return this;
    }

    public WorkspaceResponseBuilder start(Instant start) {
      this.start = start;
      return this;
    }

    public WorkspaceResponseBuilder createdAt(Instant createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public WorkspaceResponseBuilder end(Instant end) {
      this.end = end;
      return this;
    }

    public WorkspaceResponseBuilder sprintNum(int sprintNum) {
      this.sprintNum = sprintNum;
      return this;
    }

    public WorkspaceResponseBuilder name(String name) {
      this.name = name;
      return this;
    }

    public WorkspaceResponseBuilder description(String description) {
      this.description = description;
      return this;
    }

    public WorkspaceResponseBuilder currentSprint(SprintResponse currentSprint) {
      this.currentSprint = currentSprint;
      return this;
    }

    public WorkspaceResponseBuilder owner(UserResponse owner) {
      this.owner = owner;
      return this;
    }

    public WorkspaceResponseBuilder projects(List<ProjectResponse> projects) {
      this.projects = projects;
      return this;
    }

    public WorkspaceResponseBuilder prevSprint(SprintResponse prevSprint) {
      this.prevSprint = prevSprint;
      return this;
    }

    public WorkspaceResponseBuilder nextSprint(SprintResponse nextSprint) {
      this.nextSprint = nextSprint;
      return this;
    }

    public WorkspaceResponseBuilder course(CourseResponse course) {
      this.course = course;
      return this;
    }

    public WorkspaceResponseBuilder prerequisiteCourse(List<UserCourseResponse> prerequisiteCourse) {
      this.prerequisiteCourse = prerequisiteCourse;
      return this;
    }

    public WorkspaceResponse build() {
      return new WorkspaceResponse(
          id, name, description, sprintNum, prevSprint, currentSprint, nextSprint, owner, start, end, projects,
          createdAt, course, prerequisiteCourse);
    }
  }

}
