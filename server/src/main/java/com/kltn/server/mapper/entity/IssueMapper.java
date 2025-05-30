package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.request.entity.issue.IssueUpdateRequest;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.mapper.base.AttachmentMapper;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.type.task.IssueStatus;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ResourceMapper.class, TopicMapper.class, AttachmentMapper.class, SubTaskMapper.class})
public interface IssueMapper {
    @Mappings({
            @Mapping(target = "name", source = "name")
            , @Mapping(target = "status", source = "status", defaultValue = "BACKLOG"),
            @Mapping(target = "priority", source = "priority", defaultValue = "CRITICAL"),
            @Mapping(target = "tag", source = "tag", defaultValue = "THEORY"),
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
            @Mapping(target = "subTasks", source = "issueCreateRequest.subtasks",qualifiedByName = "toListDocument"),
            @Mapping(target = "attachment", source = "issueCreateRequest.attachments",qualifiedByName = "toListDocument"),
            @Mapping(target = "topics", source = "issueCreateRequest.topics", qualifiedByName = "toTopicList")
    })
    @BeanMapping(ignoreByDefault = true)
    com.kltn.server.model.collection.Issue toCollection(Issue task, IssueCreateRequest issueCreateRequest);


    @Mappings({
            @Mapping(target = "id", source = "task.id"),
            @Mapping(target = "name", source = "task.name"),
            @Mapping(target = "description", source = "task.description"),
            @Mapping(target = "status", source = "task.status"),
            @Mapping(target = "priority", source = "task.priority"),
            @Mapping(target = "tag", source = "task.tag"),
            @Mapping(target = "position", source = "task.position"),
//            @Mapping(target = "topics", source = "issueMongo.topics", qualifiedByName = "toListResponse"),
//            @Mapping(target = "subTasks", source = "issueMongo.subTasks", qualifiedByName = "toListResponse"),
//            @Mapping(target = "attachments", source = "issueMongo.attachment", qualifiedByName = "toListResponse"),
            @Mapping(target = "assignee", source = "task.assignee", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "reviewer", source = "task.reviewer", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "start", source = "task.dtStart"),
            @Mapping(target = "end", source = "task.dtEnd"),
    })
    @BeanMapping(ignoreByDefault = true)
    IssueResponse toIssueResponse(Issue task, com.kltn.server.model.collection.Issue issueMongo);

//    List<IssueResponse> toIssueResponseList(List<Issue> issues, List<com.kltn.server.model.collection.Issue> issueMongo);

    @Mappings({
            @Mapping(target = "id", source = "task.id"),
            @Mapping(target = "name", source = "task.name"),
            @Mapping(target = "description", source = "task.description"),
            @Mapping(target = "status", source = "task.status"),
            @Mapping(target = "priority", source = "task.priority"),
            @Mapping(target = "tag", source = "task.tag"),
            @Mapping(target = "position", source = "task.position"),
            @Mapping(target = "assignee", source = "task.assignee", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "reviewer", source = "task.reviewer", qualifiedByName = "toUserDetailDTO"),
            @Mapping(target = "topics", source = "issueMongo.topics", qualifiedByName = "toListResponse"),
            @Mapping(target = "subTasks", source = "issueMongo.subTasks", qualifiedByName = "toListResponse"),
            @Mapping(target = "resources", source = "task.resources", qualifiedByName = "toListResponse"),
            @Mapping(target = "complexOfDescription", source = "task.complexOfDescription"),
            @Mapping(target = "dtStart", source = "task.dtStart"),
            @Mapping(target = "dtEnd", source = "task.dtEnd"),
//            @Mapping(target = "dtPlanning", source = "task.dtPlanning"),
    })
    @BeanMapping(ignoreByDefault = true)
    IssueDetailResponse toIssueDetailResponse(Issue task, com.kltn.server.model.collection.Issue issueMongo);

//    List<IssueResponse> toIssueResponse(List<IssueSnapshot> issueSnapshots);


//    @Mappings({
//            @Mapping(target = "title", source = "updateRequest.name"),
//            @Mapping(target = "description", source = "updateRequest.description"),
//            @Mapping(target = "status", source = "updateRequest.status"),
//            @Mapping(target = "priority", source = "updateRequest.priority"),
////            @Mapping(target = "storyPoint", source = "updateRequest.storyPoint"),
//            @Mapping(target = "dtStart", source = "updateRequest.start"),
//            @Mapping(target = "dtEnd", source = "updateRequest.end"),
//    })
//    @BeanMapping(ignoreByDefault = true)
//    Issue updateTask(@MappingTarget Issue task, IssueUpdateRequest updateRequest);
}
