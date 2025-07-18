package com.kltn.server.mapper.base;

import com.kltn.server.DTO.request.base.SubTaskRequest;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.model.collection.model.SubTask;
import org.bson.types.ObjectId;
import org.mapstruct.*;

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
    @Mappings({
            @Mapping(target = "id", source = "id", qualifiedByName = "objectIdToString"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "order", source = "order"),
            @Mapping(target = "checked", source = "checked"),
    })
    SubTaskResponse toSubTaskResponse(SubTask subTask);

    @Named("toListResponse")
    @IterableMapping(qualifiedByName = "toResponse")
    List<SubTaskResponse> toSubTaskResponseList(List<SubTask> subTasks);

    @Named("objectIdToString")
    default String objectIdToString(ObjectId id) {
        return id != null ? id.toHexString() : null;
    }

}
