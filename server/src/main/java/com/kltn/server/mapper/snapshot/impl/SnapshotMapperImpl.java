package com.kltn.server.mapper.snapshot.impl;

import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.mapper.snapshot.SnapshotMapper;
import com.kltn.server.model.collection.model.Relation;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class SnapshotMapperImpl implements SnapshotMapper {
  @Autowired
  private ResourceMapper resourceMapper;


  private IssueSnapshot toIssueSnapshot(Issue entity, com.kltn.server.model.collection.Issue mongo,
                                        List<Resource> resources, Map<String, List<Relation<String>>> relationships) {
    IssueSnapshot.IssueSnapshotBuilder builder = IssueSnapshot.builder();
    builder.nkTaskId(entity.getId());
    builder.name(entity.getName());
    builder.description(entity.getDescription());
    builder.status(entity.getStatus()
      .name());
    builder.priority(entity.getPriority()
      .name());
    builder.tag(entity.getTag()
      .name());
    builder.position(entity.getPosition());
    builder.dtStart(entity.getDtStart());
    builder.dtEnd(entity.getDtEnd());
    builder.complexOfDescription(entity.getComplexOfDescription());
    builder.numChangeOfPriority(entity.getNumChangeOfPriority());
    builder.numChangeOfDescription(entity.getNumChangeOfDescription());
    builder.related(relationships.getOrDefault(entity.getId(), Collections.emptyList()));
    if (entity.getAssignee() != null)
      builder.assignee(entity.getAssignee()
        .getId());
    if (entity.getReviewer() != null)
      builder.reviewer(entity.getReviewer()
        .getId());
    if (mongo.getTopics() != null)
      builder.topics(mongo.getTopics());
    if (mongo.getComments() != null)
      builder.comments(mongo.getComments());
    if (resources != null && resources.isEmpty())
      builder.resources(resourceMapper.toSnapshotList(resources));
    return builder.build();
  }

  @Override
  public ProjectSnapshot toSnapshot(String projectId, String sprintId,
                                    Map<Issue, com.kltn.server.model.collection.Issue> issueMap,
                                    Map<String, List<Resource>> mapResources,
                                    Map<String, List<Relation<String>>> relationships) {
    ProjectSnapshot.ProjectSnapshotBuilder builder = ProjectSnapshot.builder();
    builder.projectId(projectId);
    builder.sprintId(sprintId);
    builder.issues(issueMap.entrySet()
      .stream()
      .map((en) -> toIssueSnapshot(en.getKey(), en.getValue(),
        mapResources.get(en.getKey().getId()),
        relationships

      ))
      .toList());
    return builder.build();
  }
}
