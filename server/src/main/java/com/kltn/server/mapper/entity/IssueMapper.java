package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.mapper.base.AttachmentMapper;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.model.entity.Issue;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {UserMapper.class, TopicMapper.class, AttachmentMapper.class, SubTaskMapper.class})
public interface IssueMapper {
    @Mappings({
            @Mapping(target = "title", source = "name")
            , @Mapping(target = "status", source = "status"),
            @Mapping(target = "priority", source = "priority"),
            @Mapping(target = "tag", source = "tag"),
            @Mapping(target = "position", source = "position"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "dtStart", source = "start"),
            @Mapping(target = "dtEnd", source = "end"),
    })
    Issue toEntity(IssueCreateRequest issueCreateRequest);

    @Mappings({
            @Mapping(target = "nkTaskId", source = "task.id"),
            @Mapping(target = "description", source = "task.description"),
//            @Mapping(target = "tag", source = "task.name"),
            @Mapping(target = "subTasks", source = "issueCreateRequest.subTasks"),
            @Mapping(target = "attachment", source = "issueCreateRequest.attachments"),
            @Mapping(target = "topics", source = "issueCreateRequest.topics")
    })
    @BeanMapping(ignoreByDefault = true)
    com.kltn.server.model.collection.Issue toCollection(Issue task, IssueCreateRequest issueCreateRequest);


    @Mappings({
            @Mapping(target = "id", source = "task.id"),
            @Mapping(target = "name", source = "task.title"),
            @Mapping(target = "status", source = "task.status"),
            @Mapping(target = "priority", source = "task.priority"),
            @Mapping(target = "tag", source = "task.tag"),
            @Mapping(target = "position", source = "task.position"),
            @Mapping(target = "topics", source = "issueMongo.topics", qualifiedByName = "toListResponse"),
            @Mapping(target = "subTasks", source = "issueMongo.subTasks", qualifiedByName = "toListResponse"),
            @Mapping(target = "attachments", source = "issueMongo.attachment", qualifiedByName = "toListResponse"),
            @Mapping(target = "assigner", source = "task.assigner", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "reviewer", source = "task.reviewer", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "start", source = "task.dtStart"),
            @Mapping(target = "end", source = "task.dtEnd"),

    })
    @BeanMapping(ignoreByDefault = true)
    IssueResponse toIssueResponse(Issue task, com.kltn.server.model.collection.Issue issueMongo);
}
