package com.kltn.server.mapper;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);

    default String mapRoleToString(Role role) {
        return role != null ? role.getName() : null;
    }

    @Mapping(target = "role", source = "role.name")
    AuthenticationResponse.UserDetailDTO toUserDetailDTO(User user);

    @Mapping(target = "role", source = "role", qualifiedByName = "mapRoleToString")
    List<UserResponse> toUserResponseList(List<User> users);


}
