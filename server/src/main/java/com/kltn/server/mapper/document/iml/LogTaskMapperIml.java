package com.kltn.server.mapper.document.iml;

import com.kltn.server.mapper.document.LogTaskMapper;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.collection.model.LogTask;
import com.kltn.server.model.collection.model.Relation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LogTaskMapperIml implements LogTaskMapper {
  //TODO: Fix
  public LogTask entityToLogDomain(com.kltn.server.model.entity.Issue entity, Issue document) {
    var builder = LogTask.builder();
    if (entity != null) {
      builder.name(entity.getName());
      builder.description(entity.getDescription());
      builder.status(entity.getStatus()
                           .name());
      builder.open(entity.isOpen());
      builder.priority(entity.getPriority()
                             .name());
      builder.dtStart(entity.getDtStart());
      builder.dtEnd(entity.getDtEnd());
      builder.complexDescription(entity.getComplexOfDescription());
      if (entity.getAssignee() != null)
        builder.assignee(entity.getAssignee()
                               .getId());
      if (entity.getReviewer() != null)
        builder.reviewer(entity.getReviewer()
                               .getId());
      if (entity.getProject() != null)
        builder.projectId(entity.getProject()
                                .getId());
      if (entity.getSprint() != null)
        builder.sprintId(entity.getSprint()
                               .getId());
      if (document.getTopics() != null)
        builder.topics(new ArrayList<>(document.getTopics()));
      if (document.getAttachment() != null)
        builder.attachment(new ArrayList<>(document.getAttachment()));
      if (document.getSubtasks() != null)
        builder.subTask(document.getSubtasks());
      if (entity.getAffectTo() != null || entity.getAffectBy() != null) {
        List<Relation<String>> relations = new ArrayList<>();
        if (entity.getAffectTo() != null)
          relations.addAll(entity.getAffectTo()
                                 .stream()
                                 .map(affect -> Relation.<String>builder()
                                                        .related(affect.getId()
                                                                       .getIssueRelatedId())
                                                        .relationType(affect.getTypeRelation())
                                                        .build())
                                 .toList());
        if (entity.getAffectBy() != null)
          relations.addAll(entity.getAffectBy()
                                 .stream()
                                 .map(affect -> Relation.<String>builder()
                                                        .related(affect.getId()
                                                                       .getIssueRelatedId())
                                                        .relationType(affect.getTypeRelation())
                                                        .build())
                                 .toList());
        builder.relations(relations);
      }
    }
    return builder.build();
  }

}
