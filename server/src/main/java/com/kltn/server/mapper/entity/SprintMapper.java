package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.response.sprint.SprintCreateResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.Map;

@Mapper(componentModel = "spring")

public interface SprintMapper {
    @Mappings({
        @Mapping(target = "title", source = "title"),
        @Mapping(target = "dtStart", source = "start"),
        @Mapping(target = "dtEnd", source = "end"),
    })
    Sprint toSprint(SprintCreationRequest sprintCreationRequest);


    @Mappings({
            @Mapping(target = "title", source = "title"),
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "dtStart", source = "dtStart"),
            @Mapping(target = "dtEnd", source = "dtEnd"),
    })
    @BeanMapping(ignoreByDefault = true)
    SprintResponse toSprintCreateResponse(Sprint sprint);

    @Mappings({
            @Mapping(target = "title", source = "projectSprint.sprint.title"),
            @Mapping(target = "id", source = "projectSprint.sprint.id"),
            @Mapping(target = "dtStart", source = "projectSprint.sprint.dtStart"),
            @Mapping(target = "dtEnd", source = "projectSprint.sprint.dtEnd"),
            @Mapping(target = "planning", source = "projectSprint.dtPlanning"),
            @Mapping(target = "preview", source = "projectSprint.dtPreview"),
    })
    @BeanMapping(ignoreByDefault = true)
    SprintResponse toSprintResponse(ProjectSprint projectSprint);
}
