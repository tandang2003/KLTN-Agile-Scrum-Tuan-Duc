package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdationRequest;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Workspace;
import org.mapstruct.*;

import java.util.List;

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

        @Named("toWorkspaceCreationResponse")
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
                        @Mapping(target = "owner.name", source = "owner.name"),
        })
        @BeanMapping(ignoreByDefault = true)
        WorkspaceResponse toWorkspaceResponseForPaging(Workspace workspace);

        @Mappings({
                        @Mapping(target = "id", source = "id"),
                        @Mapping(target = "name", source = "name"),
                        @Mapping(target = "description", source = "description"),
                        @Mapping(target = "sprintNum", source = "sprintNum"),
                        @Mapping(target = "timePerSprint", source = "timePerSprint"),
                        @Mapping(target = "start", source = "start"),
                        @Mapping(target = "end", source = "end"),
                        @Mapping(target = "createdAt", source = "dtCreated"),
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

        @BeanMapping(ignoreByDefault = true)
        @IterableMapping(qualifiedByName = "toWorkspaceCreationResponse")
        List<WorkspaceResponse> toListWorkspaceResponse(List<Workspace> workspaces);

        @Mappings({
                        @Mapping(target = "sprintNum", source = "workspaceUpdationRequest.sprintNum"),
                        @Mapping(target = "description", source = "workspaceUpdationRequest.description"),
                        @Mapping(target = "end", source = "workspaceUpdationRequest.end")
        })
        Workspace updateWorkspace(Workspace workspace, WorkspaceUpdationRequest workspaceUpdationRequest);
}
