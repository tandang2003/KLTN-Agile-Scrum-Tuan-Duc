package com.kltn.server.mapper.document;

import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.model.collection.Project;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ProjectLogMapper {

    @Mappings({
            @Mapping(target = "nkProjectId", source = "projectId"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "topics", source = "tags"),
    })
    @BeanMapping(ignoreByDefault = true)
    Project toDocument(ProjectLogRequest project);
}
