package com.kltn.server.mapper;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.DTO.response.AuthenticationResponse;
import com.kltn.server.DTO.response.UserResponse;
import com.kltn.server.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);

    @Mapping(target = "role", source = "role.name")
    AuthenticationResponse.UserDetailDTO toUserDetailDTO(User user);
}
