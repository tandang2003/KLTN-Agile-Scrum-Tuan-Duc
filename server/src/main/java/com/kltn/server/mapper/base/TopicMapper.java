package com.kltn.server.mapper.base;

import com.kltn.server.DTO.request.base.TopicRequest;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.model.collection.model.Topic;
import org.bson.types.ObjectId;
import org.mapstruct.*;

import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE
)
public interface TopicMapper {

    @BeanMapping(ignoreByDefault = true)
    @Named("toTopicResponse")
    @Mappings({
            @Mapping(target = "id", source = "id",qualifiedByName = "objectIdToString"),
            @Mapping(target = "name", source = "topic.name"),
            @Mapping(target = "color", source = "topic.color"),
    })
    TopicResponse topicResponse(Topic topic);

    @Named("toTopic")
    @BeanMapping(ignoreByDefault = true)
    @Mappings({
            @Mapping(target = "name", source = "topic.name"),
            @Mapping(target = "color", source = "topic.color"),
    })
    Topic toTopic(TopicRequest topic);

    @Named("toTopicList")
    @Mappings({
            @Mapping(target = "name", source = "topicRequest.name"),
            @Mapping(target = "color", source = "topicRequest.color"),
    })
    List<Topic> toTopicList(List<TopicRequest> topicRequests);

    @Named("toListResponse")
    @IterableMapping(qualifiedByName = "toTopicResponse")
    List<TopicResponse> toTopicResponse(List<Topic> topics);
    @Named("objectIdToString")
    default String  objectIdToString(ObjectId id){
        return id != null ? id.toHexString() : null;
    }
}
