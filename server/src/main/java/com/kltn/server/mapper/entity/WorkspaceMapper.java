package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdateRequest;
import com.kltn.server.DTO.response.course.CourseResponse;
import com.kltn.server.DTO.response.course.UserCourseResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Workspace;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
  unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
  unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
  uses = {
    SprintMapper.class,
    CourseMapper.class, DateMapper.class})
public interface WorkspaceMapper {

  @Mappings({
    @Mapping(target = "name", source = "name"),
    @Mapping(target = "description", source = "description"),
    // @Mapping(target = "sprintNum", source = "sprintNum"),
    // @Mapping(target = "timePerSprint", source = "timePerSprint"),
    @Mapping(target = "start", source = "start"),
    @Mapping(target = "end", source = "end")})
  @BeanMapping(ignoreByDefault = true)
  Workspace toWorkspace(WorkspaceCreationRequest workspace);

  @Named("toWorkspaceCreationResponse")
  @Mappings({
    @Mapping(target = "id", source = "id"),
    @Mapping(target = "name", source = "name"),
    @Mapping(target = "sprintNum", source = "sprintNum"),
    @Mapping(target = "currentSprint", source = "currentSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "prevSprint", source = "prevSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "nextSprint", source = "nextSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "start", source = "start", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "end", source = "end", qualifiedByName = "instantToLocalDateTime"),})
  @BeanMapping(ignoreByDefault = true)
  WorkspaceResponse toWorkspaceCreationResponse(Workspace workspace);

  @Mappings({
    @Mapping(target = "id", source = "id"),
    @Mapping(target = "name", source = "name"),
    @Mapping(target = "owner.name", source = "owner.name"),
    @Mapping(target = "sprintNum", source = "sprintNum"),
    @Mapping(target = "currentSprint", source = "currentSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "prevSprint", source = "prevSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "nextSprint", source = "nextSprint", qualifiedByName = "toResponse"),})
  @BeanMapping(ignoreByDefault = true)
  WorkspaceResponse toWorkspaceResponseForPaging(Workspace workspace);

  @Mappings({
    @Mapping(target = "id", source = "id"),
    @Mapping(target = "name", source = "name"),
    @Mapping(target = "description", source = "description"),
    @Mapping(target = "sprintNum", source = "sprintNum"),
    @Mapping(target = "currentSprint", source = "currentSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "prevSprint", source = "prevSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "nextSprint", source = "nextSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "start", source = "start", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "end", source = "end", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "createdAt", source = "dtCreated",  qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "course", source = "course", qualifiedByName = "toResponse"),
  })
  @BeanMapping(ignoreByDefault = true)
  WorkspaceResponse toWorkspaceResponseById(Workspace workspace);


  @Mappings({
    @Mapping(target = "id", source = "workspace.id"),
    @Mapping(target = "name", source = "workspace.name"),
    @Mapping(target = "description", source = "workspace.description"),
    @Mapping(target = "sprintNum", source = "workspace.sprintNum"),
    @Mapping(target = "currentSprint", source = "workspace.currentSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "prevSprint", source = "workspace.prevSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "nextSprint", source = "workspace.nextSprint", qualifiedByName = "toResponse"),
    @Mapping(target = "start", source = "workspace.start", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "end", source = "workspace.end", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "createdAt", source = "workspace.dtCreated", qualifiedByName = "instantToLocalDateTime"),
    @Mapping(target = "course", source = "workspace.course", qualifiedByName = "toResponse"),
    @Mapping(target = "prerequisiteCourse", source = "userCourses"),

  })
  @BeanMapping(ignoreByDefault = true)
  WorkspaceResponse toWorkspaceResponseById(Workspace workspace, List<UserCourseResponse> userCourses);

  @Mappings({
    @Mapping(target = "id", source = "id"),
    @Mapping(target = "name", source = "name")})
  @BeanMapping(ignoreByDefault = true)
  @Named("projectToProjectResponse")
  ProjectResponse projectToProjectResponse(Project project);

  @BeanMapping(ignoreByDefault = true)
  @IterableMapping(qualifiedByName = "toWorkspaceCreationResponse")
  List<WorkspaceResponse> toListWorkspaceResponse(List<Workspace> workspaces);

  @Mapping(target = "description", source = "workspaceUpdationRequest.description")
  @Mapping(target = "end", source = "workspaceUpdationRequest.end")
  Workspace updateWorkspace(Workspace workspace, WorkspaceUpdateRequest workspaceUpdationRequest);
}
