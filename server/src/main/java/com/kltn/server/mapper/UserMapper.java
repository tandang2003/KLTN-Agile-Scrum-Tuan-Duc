package com.kltn.server.mapper;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import org.mapstruct.*;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);

    default String mapRoleToString(Role role) {
        return role != null ? role.getName() : null;
    }

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "uniId", source = "uniId"),
            @Mapping(target = "role", source = "role.name")
    })
    @BeanMapping(ignoreByDefault = true)
    AuthenticationResponse.UserDetailDTO toUserDetailDTO(User user);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "uniId", source = "uniId"),
            @Mapping(target = "className", source = "className"),
    })
    @BeanMapping(ignoreByDefault = true)
    UserResponse toUserResponse(User user);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "uniId", source = "uniId"),
//            @Mapping(target = "uniPassword", source = "uniPassword"),
            @Mapping(target = "className", source = "className"),
            @Mapping(target = "workspace", source = "workspace", qualifiedByName = "workspaceToWorkspaceResponse"
            ),

//            @Mapping(target = "assignedTasks", source = "assignedTasks"),
//            @Mapping(target = "reviewedTasks", source = "reviewedTasks")
    })
    @BeanMapping(ignoreByDefault = true)
    UserResponse toUserWorkspaceResponse(User user);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
    })
    @Named("workspaceToWorkspaceResponse")
    @BeanMapping(ignoreByDefault = true)
    WorkspaceResponse workspaceToWorkspaceResponse(Workspace workspace);

}
