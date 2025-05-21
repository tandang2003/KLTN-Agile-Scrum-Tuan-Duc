package com.kltn.server.mapper.base;

import com.kltn.server.DTO.request.base.SubTaskRequest;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.model.collection.model.SubTask;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubTaskMapper {
    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "order", source = "order"),
            @Mapping(target = "checked", source = "checked"),
    })
    @Named("toDocument")
    SubTask toDocument(SubTaskRequest subTaskRequest);
    @Named("toListDocument")
    List<SubTask> toSubTaskList(List<SubTaskRequest> subTaskRequests);

    @Named("toResponse")
    SubTaskResponse toSubTaskResponse(SubTask subTask);

    @Named("toListResponse")
    List<SubTaskResponse> toSubTaskResponseList(List<SubTask> subTasks);


}
