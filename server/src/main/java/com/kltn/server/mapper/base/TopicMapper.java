package com.kltn.server.mapper.base;

import com.kltn.server.DTO.request.base.TopicRequest;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.model.collection.model.Topic;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface TopicMapper {

    @BeanMapping(ignoreByDefault = true)
    @Named("topicResponse")
    @Mappings({
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
}
