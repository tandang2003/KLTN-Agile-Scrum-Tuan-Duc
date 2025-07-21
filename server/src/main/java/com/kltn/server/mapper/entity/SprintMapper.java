package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintTeacherUpdateTimeRequest;
import com.kltn.server.DTO.response.sprint.SprintCreateResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import org.mapstruct.*;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface SprintMapper {
  @Mappings({ @Mapping(target = "title", source = "title"),
      @Mapping(target = "description", source = "description"),
      @Mapping(target = "dtStart", source = "start"),
      @Mapping(target = "dtEnd", source = "end"),
      @Mapping(target = "storyPoint", source = "storyPoint"),
      @Mapping(target = "dtPredict", source = "predict"),
      // @Mapping(target = "position", source = "position")
  })
  @BeanMapping(ignoreByDefault = true)
  Sprint toSprint(SprintCreationRequest sprintCreationRequest);

  @Mappings({ @Mapping(target = "title", source = "title"),
      @Mapping(target = "id", source = "id"),
      @Mapping(target = "description", source = "description"),
      @Mapping(target = "storyPoint", source = "storyPoint"),
      @Mapping(target = "predict", source = "dtPredict"),
      @Mapping(target = "start", source = "dtStart"),
      @Mapping(target = "end", source = "dtEnd"),
      // @Mapping(target = "position", source = "position")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  SprintResponse toSprintCreateResponse(Sprint sprint);

  @Mappings({ @Mapping(target = "title", source = "projectSprint.sprint.title"),
      @Mapping(target = "id", source = "projectSprint.sprint.id"),
      @Mapping(target = "storyPoint", source = "projectSprint.sprint.storyPoint"),
      @Mapping(target = "start", source = "projectSprint.sprint.dtStart"),
      @Mapping(target = "end", source = "projectSprint.sprint.dtEnd"),
      // @Mapping(target = "planning", source = "projectSprint.dtPlanning"),
      // @Mapping(target = "preview", source = "projectSprint.dtPreview")
  })
  @BeanMapping(ignoreByDefault = true)
  SprintResponse toSprintStudentUpdateResponse(ProjectSprint projectSprint);

    @Mappings({@Mapping(target = "title", source = "updateRequest.title"),
               @Mapping(target = "description", source = "updateRequest.description"),
               @Mapping(target = "storyPoint", source = "updateRequest.storyPoint"),
               @Mapping(target = "dtStart", source = "updateRequest.start"),
               @Mapping(target = "dtEnd", source = "updateRequest.end"),
               @Mapping(target = "dtPredict", source = "updateRequest.predict"),
//            @Mapping(target = "position", source = "updateRequest.position")
    })
    @BeanMapping(ignoreByDefault = true)
    Sprint updateTeacherSprint(@MappingTarget Sprint cur, SprintTeacherUpdateTimeRequest updateRequest);
}
