package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueRelationResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.mapper.base.AttachmentMapper;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.relationship.IssueRelation;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = { UserMapper.class,
    ResourceMapper.class,
    TopicMapper.class,
    AttachmentMapper.class,
    SubTaskMapper.class })
public interface IssueMapper {

  @Mappings({ @Mapping(target = "issue", source = "relation.issue", qualifiedByName = "toIssueResponseSimple"),
      @Mapping(target = "issueRelated", source = "relation.issueRelated", qualifiedByName = "toIssueResponseSimple"),
      @Mapping(target = "typeRelation", source = "relation.typeRelation"), })
  IssueRelationResponse toIssueRelationResponse(IssueRelation relation);

  @Mappings({
      @Mapping(target = "issueRelated", source = "relation.issueRelated", qualifiedByName = "toIssueResponseSimple"),
      @Mapping(target = "typeRelation", source = "relation.typeRelation"), })
  @BeanMapping(ignoreByDefault = true)
  @Named("toIssueRelationResponseSimple")
  IssueRelationResponse toIssueRelationResponseSimple(IssueRelation relation);

  @Named("toListIssueRelationResponse")
  @IterableMapping(qualifiedByName = "toIssueRelationResponseSimple")
  List<IssueRelationResponse> toListIssueRelationResponse(List<IssueRelation> relation);

  @Mappings({ @Mapping(target = "name", source = "name"),
      @Mapping(target = "status", source = "status", defaultValue = "BACKLOG"),
      @Mapping(target = "priority", source = "priority", defaultValue = "CRITICAL"),
      @Mapping(target = "tag", source = "tag", defaultValue = "THEORY"),
      @Mapping(target = "position", source = "position"),
      @Mapping(target = "description", source = "description"),
      @Mapping(target = "complexOfDescription", source = "complexOfDescription"),
      @Mapping(target = "dtStart", source = "start"),
      @Mapping(target = "dtEnd", source = "end"), })
  @BeanMapping(ignoreByDefault = true)
  Issue toEntity(IssueCreateRequest issueCreateRequest);

  @Mappings({ @Mapping(target = "nkTaskId", source = "task.id"),
      @Mapping(target = "description", source = "task.description"),
      // @Mapping(target = "tag", source = "task.name"),
      @Mapping(target = "subtasks", source = "issueCreateRequest.subtasks", qualifiedByName = "toListDocument"),
      @Mapping(target = "attachment", source = "issueCreateRequest.attachments", qualifiedByName = "toListDocument"),
      @Mapping(target = "topics", source = "issueCreateRequest.topics", qualifiedByName = "toTopicList") })
  @BeanMapping(ignoreByDefault = true)
  com.kltn.server.model.collection.Issue toCollection(Issue task, IssueCreateRequest issueCreateRequest);

  @Mappings({ @Mapping(target = "id", source = "task.id"),
      @Mapping(target = "projectId", source = "task.project.id"),
      @Mapping(target = "sprintId", source = "task.sprint.id"),
      @Mapping(target = "name", source = "task.name"),
      @Mapping(target = "description", source = "task.description"),
      @Mapping(target = "status", source = "task.status"),
      @Mapping(target = "priority", source = "task.priority"),
      @Mapping(target = "tag", source = "task.tag"),
      @Mapping(target = "position", source = "task.position"),
      // @Mapping(target = "topics", source = "issueMongo.topics", qualifiedByName =
      // "toListResponse"),
      // @Mapping(target = "subTasks", source = "issueMongo.subTasks", qualifiedByName
      // = "toListResponse"),
      // @Mapping(target = "attachments", source = "issueMongo.attachment",
      // qualifiedByName = "toListResponse"),
      @Mapping(target = "assignee", source = "task.assignee", qualifiedByName = "toUserDetailDTO"),
      @Mapping(target = "reviewer", source = "task.reviewer", qualifiedByName = "toUserDetailDTO"),
      @Mapping(target = "start", source = "task.dtStart"),
      @Mapping(target = "end", source = "task.dtEnd"), })
  @BeanMapping(ignoreByDefault = true)
  IssueResponse toIssueResponse(Issue task, com.kltn.server.model.collection.Issue issueMongo);

  // List<IssueResponse> toIssueResponseList(List<Issue> issues,
  // List<com.kltn.server.model.collection.Issue> issueMongo);

  @Mappings({ @Mapping(target = "id", source = "task.id"),
      @Mapping(target = "name", source = "task.name"),
      @Mapping(target = "description", source = "task.description"),
      @Mapping(target = "status", source = "task.status"),
      @Mapping(target = "priority", source = "task.priority"),
      @Mapping(target = "tag", source = "task.tag"),
      @Mapping(target = "position", source = "task.position"),
      @Mapping(target = "assignee", source = "task.assignee", qualifiedByName = "toUserDetailDTO"),
      @Mapping(target = "reviewer", source = "task.reviewer", qualifiedByName = "toUserDetailDTO"),
      @Mapping(target = "topics", source = "issueMongo.topics", qualifiedByName = "toListResponse"),
      @Mapping(target = "subtasks", source = "issueMongo.subtasks", qualifiedByName = "toListResponse"),
      @Mapping(target = "resources", source = "task.resources", qualifiedByName = "toListResponse"),
      @Mapping(target = "complexOfDescription", source = "task.complexOfDescription"),
      @Mapping(target = "dtStart", source = "task.dtStart"),
      @Mapping(target = "dtEnd", source = "task.dtEnd"),
      @Mapping(target = "relations", source = "task.affectTo", qualifiedByName = "toListIssueRelationResponse"),
      @Mapping(target = "leader", source = "task.createdBy"),

  })
  @BeanMapping(ignoreByDefault = true)
  IssueDetailResponse toIssueDetailResponse(Issue task, com.kltn.server.model.collection.Issue issueMongo);

  @Mappings({ @Mapping(target = "id", source = "snapshot.nkTaskId"),
      @Mapping(target = "name", source = "snapshot.name"),
      @Mapping(target = "description", source = "snapshot.description"),
      @Mapping(target = "status", source = "snapshot.status"),
      @Mapping(target = "priority", source = "snapshot.priority"),
      @Mapping(target = "tag", source = "snapshot.tag"),
      @Mapping(target = "position", source = "snapshot.position"),
      @Mapping(target = "topics", source = "snapshot.topics", qualifiedByName = "toListResponse"),
      @Mapping(target = "subtasks", source = "snapshot.subtasks", qualifiedByName = "toListResponse"),
      @Mapping(target = "resources", source = "snapshot.resources", qualifiedByName = "toListResponse"),
      @Mapping(target = "complexOfDescription", source = "snapshot.complexOfDescription"),
      @Mapping(target = "dtStart", source = "snapshot.dtStart"),
      @Mapping(target = "dtEnd", source = "snapshot.dtEnd"), })
  @BeanMapping(ignoreByDefault = true)
  IssueDetailResponse toIssueDetailResponseFromSnapshot(IssueSnapshot snapshot);

  @Mappings({ @Mapping(target = "id", source = "task.id"),
      @Mapping(target = "name", source = "task.name"),
      @Mapping(target = "description", source = "task.description"),
      @Mapping(target = "status", source = "task.status"),
      @Mapping(target = "priority", source = "task.priority"),
      @Mapping(target = "tag", source = "task.tag"),
      @Mapping(target = "position", source = "task.position"),
      @Mapping(target = "start", source = "task.dtStart"),
      @Mapping(target = "end", source = "task.dtEnd"), })
  @BeanMapping(ignoreByDefault = true)
  @Named("toIssueResponseSimple")
  IssueResponse toIssueResponseSimple(Issue task);

}
