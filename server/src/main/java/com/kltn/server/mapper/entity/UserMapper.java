package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.auth.RegisterRequest;
import com.kltn.server.DTO.request.entity.auth.TeacherRegisterRequest;
import com.kltn.server.DTO.response.auth.AuthenticationResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.user.UserResponseAll;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import jakarta.validation.Valid;
import org.mapstruct.*;
import org.mapstruct.Named;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
        uses = {WorkspaceMapper.class,ResourceMapper.class})
public interface UserMapper {
  User toUser(RegisterRequest registerRequest);

  default String mapRoleToString(Role role) {
    return role != null ? role.getName() : null;
  }

  @Mappings({@Mapping(target = "id",
                      source = "id"),
             @Mapping(target = "name",
                      source = "name"),
             @Mapping(target = "email",
                      source = "email"),
             @Mapping(target = "uniId",
                      source = "uniId"),
             @Mapping(target = "role",
                      source = "role.name")})
  @BeanMapping(ignoreByDefault = true)
  @Named("toUserDetailDTO")
  AuthenticationResponse.UserDetailDTO toUserDetailDTO(User user);

  @Mappings({@Mapping(target = "id",
                      source = "id"),
             @Mapping(target = "name",
                      source = "name"),
             @Mapping(target = "email",
                      source = "email"),
             @Mapping(target = "uniId",
                      source = "uniId"),
             @Mapping(target = "className",
                      source = "className"),
             @Mapping(target = "role",
                      source = "role.name"),
             @Mapping(target = "avatar",
                      source = "avatar",
                      qualifiedByName = "toResourceResponse"),})
  @BeanMapping(ignoreByDefault = true)
  UserResponse toUserResponse(User user);


  //FIX
  @Mappings({@Mapping(target = "id",
                      source = "id"),
             @Mapping(target = "name",
                      source = "name"),
             @Mapping(target = "uniId",
                      source = "uniId"),
             @Mapping(target = "className",
                      source = "className"),
             @Mapping(target = "role",
                      source = "role.name"),
//            @Mapping(target = "project", source = "project", qualifiedByName = "projectToProjectResponse"),
  })
  @BeanMapping(ignoreByDefault = true)
  UserResponse toWorkspaceStudentResponse(User user);


  @Mappings({@Mapping(target = "id",
                      source = "id"),
             @Mapping(target = "name",
                      source = "name"),
             @Mapping(target = "email",
                      source = "email"),
             @Mapping(target = "uniId",
                      source = "uniId"),
             @Mapping(target = "className",
                      source = "className"),
             @Mapping(target = "workspace",
                      source = "workspaces",
                      qualifiedByName = "workspaceToWorkspaceResponse"),})
  @BeanMapping(ignoreByDefault = true)
  UserResponse toUserWorkspaceResponse(User user);


  @Mappings({@Mapping(target = "id",
                      source = "id"),
             @Mapping(target = "name",
                      source = "name"),})
  @BeanMapping(ignoreByDefault = true)
  @Named("workspaceToWorkspaceResponse")
  WorkspaceResponse workspaceToWorkspaceResponse(Workspace workspace);

  User toUser(@Valid TeacherRegisterRequest registerRequest);

  @Mappings({@Mapping(target = "role",
                      source = "role.name"),
             @Mapping(target = "createdAt",
                      source = "dtCreated"),
             @Mapping(target = "modifiedAt",
                      source = "dtModified"),
             @Mapping(target = "deletedAt",
                      source = "dtDeleted"),})
  UserResponseAll toUserResponseForAdmin(User user);
}
