package com.kltn.server.mapper.document;

import com.kltn.server.DTO.response.base.CommentResponse;
import com.kltn.server.DTO.response.issue.IssueRelationResponse;
import com.kltn.server.DTO.response.notification.NotificationOfIssueResponse;
import com.kltn.server.DTO.response.notification.NotificationResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.model.collection.model.LogTask;
import com.kltn.server.model.collection.model.Relation;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {
  UserMapper.class,
  TopicMapper.class,
  SubTaskMapper.class,
//  Relation
//  ,
  ResourceMapper.class})
public interface NotificationMapper {

  @Mappings({
    @Mapping(source = "sprintId", target = "sprintId"),
    @Mapping(source = "name", target = "name"),
//    @Mapping(source = "assignee", target = "assignee.id"),
//    @Mapping(source = "reviewer", target = "reviewer.id"),
    @Mapping(source = "description", target = "description"),
    @Mapping(source = "status", target = "status"),
    @Mapping(source = "priority", target = "priority"),
    @Mapping(source = "storyPoint", target = "storyPoint"),
    @Mapping(source = "dtStart", target = "dtStart"),
    @Mapping(source = "dtEnd", target = "dtEnd"),
    @Mapping(source = "dtPlanning", target = "dtPlanning"),
    @Mapping(source = "dtPredictComplete", target = "dtPredictComplete"),
    @Mapping(source = "complexDescription", target = "complexDescription"),
    @Mapping(source = "topics", target = "topics", qualifiedByName = "toTopicResponse"),
    @Mapping(source = "subTask", target = "subTask", qualifiedByName = "toResponse"),
    @Mapping(source = "attachment", target = "attachment", qualifiedByName = "toListAttachmentResponse"),
    @Mapping(source = "comments", target = "comments", qualifiedByName = "toListResponse"),
    @Mapping(source = "relations", target = "relations", qualifiedByName = "toListResponse"),
    @Mapping(source = "open", target = "open")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  NotificationOfIssueResponse toResponse(LogTask logTask);

//  @Mappings({
//    @Mapping(source = "related",target = "issueRelated.id"),
//    @Mapping(source = "relationType",target = "typeRelation"),
//  })
//  @BeanMapping(ignoreByDefault = true)
//  @Named("toResponse")
//  IssueRelationResponse toRelationResponse(Relation<String> relation);

  @Mappings({
    @Mapping(target = "issueRelated.id", source = "related"),
    @Mapping(target = "typeRelation", source = "relationType")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  IssueRelationResponse toResponse(Relation<String> relation);

  @BeanMapping(ignoreByDefault = true)
  @IterableMapping(qualifiedByName = "toResponse")
  @Named("toListResponse")
  List<IssueRelationResponse> toListIssueRelationResponse(List<Relation<String>> logTasks);

  @Mappings({
    @Mapping(source = "resourceId", target = "id")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  ResourceResponse toResponse(Attachment attachment);

  @IterableMapping(qualifiedByName = "toResponse")
  @BeanMapping(ignoreByDefault = true)
  @Named("toListAttachmentResponse")
  List<ResourceResponse> toListAttachmentResponse(List<Attachment> attachments);

  @Named("toResponse")
  @Mappings({
    @Mapping(target = "from", source = "from"),
    @Mapping(target = "content", source = "message"),
    @Mapping(target = "createdAt", source = "createdAt")
  })
  @BeanMapping(ignoreByDefault = true)
  CommentResponse toResponse(Comment comment);

  @BeanMapping(ignoreByDefault = true)
  @IterableMapping(qualifiedByName = "toResponse")
  @Named("toListResponse")
  List<CommentResponse> toListCommentResponse(List<Comment> logTasks);


  @IterableMapping(qualifiedByName = "toResponse")
  List<NotificationOfIssueResponse> toListResponse(List<LogTask> logTasks);

  @Mappings({
    @Mapping(source = "type", target = "type"),
    @Mapping(source = "entityTarget", target = "entityTarget"),
    @Mapping(source = "propertiesTargets", target = "propertiesTargets"),
    @Mapping(source = "change", target = "change", qualifiedByName = "toResponse"),
    @Mapping(source = "DTCreated", target = "dtCreated"),
    @Mapping(source = "createdBy", target = "createdBy")
  })
  @BeanMapping(ignoreByDefault = true)
  @Named("toResponse")
  NotificationResponse toResponse(ChangeLog changeLog);

  @IterableMapping(qualifiedByName = "toResponse")
  List<NotificationResponse> toListNotifyResponse(List<ChangeLog> changeLog);
}
