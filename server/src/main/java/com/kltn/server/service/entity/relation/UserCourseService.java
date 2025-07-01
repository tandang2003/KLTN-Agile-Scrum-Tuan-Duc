package com.kltn.server.service.entity.relation;

import com.kltn.server.DTO.request.entity.course.UserCourseUpdateRequest;
import com.kltn.server.model.entity.Course;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import com.kltn.server.repository.entity.relation.UserCourseRepository;
import com.kltn.server.service.entity.CourseService;
import com.kltn.server.service.entity.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class UserCourseService {


  private final UserCourseRepository userCourseRepository;
  private final CourseService courseService;
  private final UserService userService;

  public UserCourseService(UserCourseRepository userCourseRepository, CourseService courseService, UserService userService) {
    this.userCourseRepository = userCourseRepository;
    this.courseService = courseService;
    this.userService = userService;
  }

  public UserCourseRelation findUserCourseRelationById(UserCourseRelationId userCourseRelationId) {
    if (userCourseRepository.existsById(userCourseRelationId)) {
      return userCourseRepository.getReferenceById(userCourseRelationId);
    }
    return UserCourseRelation.builder()
      .id(userCourseRelationId)
      .course(courseService.getCourse(userCourseRelationId.getCourseId()))
      .user(userService.getUserById(userCourseRelationId.getUserId()))
      .build();
  }

  public UserCourseRelation save(UserCourseUpdateRequest userCourse) {
    UserCourseRelationId id = UserCourseRelationId.builder()
      .userId(userCourse.getUserId())
      .courseId(userCourse.getCourseId())
      .build()
      ;
    UserCourseRelation relation;
    if (userCourseRepository.existsById(id)) {
      relation = userCourseRepository.getReferenceById(id);
    } else relation = UserCourseRelation.builder()
      .id(id)
      .course(courseService.getCourse(userCourse.getCourseId()))
      .user(userService.getUserById(userCourse.getUserId()))
      .build();
    relation.setPoint(userCourse.getPoint());
    return userCourseRepository.save(relation);
  }

  @Transactional
  public boolean delete(String userId, String courseId) {
    UserCourseRelationId id = UserCourseRelationId.builder()
      .userId(userId)
      .courseId(courseId)
      .build()
      ;
    if (userCourseRepository.existsById(id)) {
      userCourseRepository.deleteById(id);
      return true;
    }
    return true;
  }
}
