package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.response.course.CourseResponse;
import com.kltn.server.DTO.response.course.UserCourseResponse;
import com.kltn.server.model.entity.Course;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {

  @Mappings({
    @Mapping(source = "id", target = "id"),
    @Mapping(source = "name", target = "name"),
    @Mapping(source = "courseId", target = "courseId"),
  })
  @Named("toResponse")
  CourseResponse toResponse(Course courses);

  @IterableMapping(qualifiedByName = "toResponse")
  List<CourseResponse> toListResponse(List<Course> courses);

  @Mappings({
    @Mapping(source = "course", target = "course", qualifiedByName = "toResponse"),
    @Mapping(source = "point", target = "point")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  UserCourseResponse toUserCourseResponse(UserCourseRelation userCourse);

  @IterableMapping(qualifiedByName = "toResponse")
  List<UserCourseResponse> toListUserCourseResponse(List<UserCourseRelation> userCourse);

}
