package com.kltn.server.mapper;

import com.kltn.server.DTO.request.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Workspace;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface WorkspaceMapper {

        @Mappings({
                        @Mapping(target = "name", source = "name"),
                        @Mapping(target = "description", source = "description"),
                        @Mapping(target = "sprintNum", source = "sprintNum"),
                        @Mapping(target = "timePerSprint", source = "timePerSprint"),
                        @Mapping(target = "start", source = "start"),
                        @Mapping(target = "end", source = "end")
        })
        @BeanMapping(ignoreByDefault = true)
        Workspace toWorkspace(WorkspaceCreationRequest workspace);

        @Mappings({
                        @Mapping(target = "id", source = "id"),
                        @Mapping(target = "name", source = "name"),
                        @Mapping(target = "sprintNum", source = "sprintNum"),
                        @Mapping(target = "timePerSprint", source = "timePerSprint"),
                        @Mapping(target = "start", source = "start"),
                        @Mapping(target = "end", source = "end"),
        })
        @BeanMapping(ignoreByDefault = true)
        WorkspaceResponse toWorkspaceCreationResponse(Workspace workspace);

        @Mappings({
                        @Mapping(target = "id", source = "id"),
                        @Mapping(target = "name", source = "name"),
                        @Mapping(target = "projects", source = "projects", qualifiedByName = "projectToProjectResponse"),
        })
        @BeanMapping(ignoreByDefault = true)
        WorkspaceResponse toWorkspaceResponseById(Workspace workspace);

        @Mappings({
                        @Mapping(target = "id", source = "id"),
                        @Mapping(target = "name", source = "name")
        })
        @BeanMapping(ignoreByDefault = true)
        @Named("projectToProjectResponse")
        ProjectResponse projectToProjectResponse(Project project);

}
