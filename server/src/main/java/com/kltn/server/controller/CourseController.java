package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.course.UserCourseRequest;
import com.kltn.server.DTO.request.entity.course.UserCourseUpdateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.course.CourseResponse;
import com.kltn.server.DTO.response.course.UserCourseResponse;
import com.kltn.server.model.entity.Course;
import com.kltn.server.service.entity.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("course")
public class CourseController {
  private CourseService courseService;

  @Autowired
  public CourseController(CourseService courseService) {
    this.courseService = courseService;
  }

  @GetMapping("list")
  public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {
    var response = courseService.getAllCourse();
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @GetMapping("{id}")
  public ResponseEntity<ApiResponse<CourseResponse>> getCourse(@PathVariable String id) {
    var response = courseService.getCourseResponse(id);
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @GetMapping("{id}/dependent")
  public ResponseEntity<ApiResponse<List<CourseResponse>>> getDependentCourse(@PathVariable String id) {
    var response = courseService.getDependentCourse(id);
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @GetMapping("{id}/prerequisite")
  public ResponseEntity<ApiResponse<List<CourseResponse>>> getPrerequisiteCourse(@PathVariable String id) {
    var response = courseService.getPrerequisiteCourse(id);
    return ResponseEntity.status(response.getCode()).body(response);
  }


  @GetMapping("user")
  public ResponseEntity<ApiResponse<List<UserCourseResponse>>> getCourseOfUser() {
    var response = courseService.getCourseOfUser();
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @PostMapping()
  public ResponseEntity<ApiResponse<List<UserCourseResponse>>> addCourseForUser(
    @Valid @RequestBody UserCourseRequest userCourse) {
    var response = courseService.addCourseForUser(userCourse.getCoursePoints());
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @PutMapping
  public ResponseEntity<ApiResponse<UserCourseResponse>> updatePoint(
    @Valid @RequestBody UserCourseUpdateRequest userCourse) {
    var response = courseService.updatePoint(userCourse);
    return ResponseEntity.status(response.getCode()).body(response);
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse<Boolean>> deleteUserCourse(
    @RequestParam String userId, @RequestParam String courseId) {
    var response = courseService.deleteUserCourse(userId, courseId);
    return ResponseEntity.status(response.getCode()).body(response);
  }
}
