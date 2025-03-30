package com.kltn.server.mapper;

import com.kltn.server.DTO.request.RegisterRequest;
import com.kltn.server.model.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);
}
