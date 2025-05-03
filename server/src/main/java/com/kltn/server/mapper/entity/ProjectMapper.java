package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.Project;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
        uses = {TopicMapper.class})

public interface ProjectMapper {
    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "description", source = "description"),
//            @Mapping(target = "workspace.id", source = "workspaceId"),
    })
    @BeanMapping(ignoreByDefault = true)
    Project toEntity(ProjectCreationRequest creationRequest);

    @Mappings({
            @Mapping(target = "id", source = "project.id"),
            @Mapping(target = "name", source = "project.name"),
            @Mapping(target = "topics", source = "tags", qualifiedByName = "topicResponse"),
    })
    @BeanMapping(ignoreByDefault = true)
    ProjectResponse toCreationResponse(Project project, List<Topic> tags);


}
