package com.kltn.server.mapper.base;

import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.model.collection.model.SubTask;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubTaskMapper {
    @Named("toResponse")
    SubTaskResponse toSubTaskResponse(SubTask subTask);

    @Named("toListResponse")
    List<SubTaskResponse> toSubTaskResponseList(List<SubTask> subTasks);


}
