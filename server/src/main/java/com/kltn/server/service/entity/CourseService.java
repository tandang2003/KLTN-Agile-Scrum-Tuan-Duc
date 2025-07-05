package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.course.UserCourseUpdateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.course.CourseResponse;
import com.kltn.server.DTO.response.course.UserCourseResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.CourseMapper;
import com.kltn.server.model.entity.Course;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import com.kltn.server.model.entity.relationship.CourseRelation;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import com.kltn.server.repository.entity.CourseRepository;
import com.kltn.server.service.entity.relation.UserCourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CourseService {


  private final CourseRepository courseRepository;
  private final CourseMapper courseMapper;
  private final UserService userService;
  private final UserCourseRelationRepository userCourseRelationRepository;
  private final UserCourseService userCourseService;

  @Autowired
  public CourseService(CourseRepository courseRepository, CourseMapper courseMapper,
                       @Lazy UserService userService, UserCourseRelationRepository userCourseRelationRepository,
                       @Lazy UserCourseService userCourseService) {
    this.courseRepository = courseRepository;
    this.courseMapper = courseMapper;
    this.userService = userService;
    this.userCourseRelationRepository = userCourseRelationRepository;
    this.userCourseService = userCourseService;
  }

  public ApiResponse<List<CourseResponse>> getAllCourse() {
    List<Course> courses = courseRepository.findAll();
    List<CourseResponse> courseResponses = courseMapper.toListResponse(courses);
    return ApiResponse.<List<CourseResponse>>builder()
      .code(200)
      .data(courseResponses)
      .message("Get all course successful")
      .build();
  }

  public ApiResponse<List<CourseResponse>> getPrerequisiteCourse(String courseId) {
    Course course = getCourse(courseId);
    List<Course> courses = new ArrayList<>();
    recursiveFindingPrerequisiteCourse(courses, course);


    List<CourseResponse> courseResponses = courseMapper.toListResponse(courses);
    return ApiResponse.<List<CourseResponse>>builder()
      .code(200)
      .data(courseResponses)
      .message("Get all prerequisite course successful")
      .build();
  }

  public void recursiveFindingPrerequisiteCourse(List<Course> courses, Course course) {
    if (courses == null || course.getDependentCourses().isEmpty()) {
      return;
    } else {
      List<Course> prerequited = course.getDependentCourses()
        .stream()
        .map(CourseRelation::getPrerequisiteCourse)
        .toList()
        ;
      for (Course prerequisiteCourse : prerequited) {
        recursiveFindingPrerequisiteCourse(courses, prerequisiteCourse);
        courses.add(prerequisiteCourse);
      }
    }
  }

  public ApiResponse<List<CourseResponse>> getDependentCourse(String courseId) {
    Course course = getCourse(courseId);
    List<Course> prerequisiteCourses = course.getPrerequisiteCourses()
      .stream()
      .map(CourseRelation::getDependentCourse)
      .toList()
      ;
    List<CourseResponse> courseResponses = courseMapper.toListResponse(prerequisiteCourses);
    return ApiResponse.<List<CourseResponse>>builder()
      .code(200)
      .data(courseResponses)
      .message("Get all dependent course successful")
      .build();


  }

  public ApiResponse<CourseResponse> getCourseResponse(String id) {
    Course course = getCourse(id);
    return ApiResponse.<CourseResponse>builder()
      .code(200)
      .data(courseMapper.toResponse(course))
      .message("Get course successful")
      .build();

  }

  public Course getCourse(String id) {
    return courseRepository.findById(id)
//      .findByCourseId(id)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND_COURSE).build());
  }

  public ApiResponse<List<UserCourseResponse>> getCourseOfUser() {
    User user = userService.getCurrentUser();
    List<UserCourseRelation> userCourse = user.getCourses();
    List<UserCourseResponse> userCourseResponses = courseMapper.toListUserCourseResponse(userCourse);
    return ApiResponse.<List<UserCourseResponse>>builder().code(200).data(userCourseResponses).build();
  }

  public ApiResponse<List<UserCourseResponse>> addCourseForUser(Map<String, Double> coursePoints) {
    User user = userService.getCurrentUser();
    List<UserCourseRelation> relations = new ArrayList<>();
    for (Map.Entry<String, Double> entry : coursePoints.entrySet()) {
      Course course = getCourse(entry.getKey());
      List<Course> dependent = course.getDependentCourses()
        .stream()
        .map(CourseRelation::getPrerequisiteCourse)
        .toList()
        ;
      for (Course dependentCourse : dependent) {
        boolean flag = userCourseRelationRepository.existsById(UserCourseRelationId.builder()
          .courseId(dependentCourse.getId())
          .userId(user.getId())
          .build());
        if (!flag) throw AppException.builder()
          .error(Error.MISSING_PREREQUISITE)
          .message(String.format(Error.MISSING_PREREQUISITE.getMessage(), dependentCourse.getName(), course.getName()))
          .build();
      }
      UserCourseRelation userCourseRelation = UserCourseRelation.builder()
        .id(UserCourseRelationId.builder().userId(user.getId()).courseId(course.getCourseId()).build())
        .course(course)
        .user(user)
        .point(entry.getValue())
        .build()
        ;
      UserCourseRelation relation = userCourseRelationRepository.save(userCourseRelation);
      relations.add(relation);
    }
    List<UserCourseResponse> userCourseResponses = courseMapper.toListUserCourseResponse(relations);
    return ApiResponse.<List<UserCourseResponse>>builder().code(200).data(userCourseResponses).build();

  }

  public ApiResponse<List<UserCourseResponse>> updatePoint(@Valid UserCourseUpdateRequest userCourse) {
//    UserCourseRelation relation = userCourseService.save(userCourse);
    List<UserCourseRelation> relations = new ArrayList<>();
    String userID = userCourse.getUserId();
    for (UserCourseUpdateRequest.CoursePointUpdateDetail course : userCourse.getCoursePoints()) {
      relations.add(userCourseService.save(userID, course.getCourseId(), course.getPoint()));
    }
    return ApiResponse.<List<UserCourseResponse>>builder()
      .code(200)
      .data(courseMapper.toListUserCourseResponse(relations))
      .build();
  }

  public ApiResponse<Boolean> deleteUserCourse(String userId, String courseId) {
    boolean flag = userCourseService.delete(userId, courseId);
    return ApiResponse.<Boolean>builder().code(200).data(flag).build();
  }
}
