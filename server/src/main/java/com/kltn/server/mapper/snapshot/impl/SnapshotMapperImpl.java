package com.kltn.server.mapper.snapshot.impl;

import com.kltn.server.mapper.snapshot.SnapshotMapper;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import org.springframework.stereotype.Component;

import java.util.Map;
@Component
public class SnapshotMapperImpl implements SnapshotMapper {
    @Override
    public ProjectSnapshot toSnapshot(String projectId, String sprintId, Map<Issue, com.kltn.server.model.collection.Issue> issueMap) {
        ProjectSnapshot.ProjectSnapshotBuilder builder = ProjectSnapshot.builder();
        builder.projectId(projectId);
        builder.sprintId(sprintId);
        builder.issues(issueMap.entrySet().stream().map((en) -> toIssueSnapshot(en.getKey(), en.getValue())).toList());
        return builder.build();
    }

    private IssueSnapshot toIssueSnapshot(Issue entity, com.kltn.server.model.collection.Issue mongo) {
        IssueSnapshot.IssueSnapshotBuilder builder = IssueSnapshot.builder();
        builder.nkTaskId(entity.getId());
        builder.description(entity.getDescription());
        builder.status(entity.getStatus().name());
        builder.priority(entity.getPriority().name());
        builder.tag(entity.getTag().name());
        builder.dtStart(entity.getDtStart());
        builder.dtEnd(entity.getDtEnd());
//        builder.dtPlanning(entity.getDtPlanning());
        builder.complexOfDescription(entity.getComplexOfDescription());
        builder.numChangeOfPriority(entity.getNumChangeOfPriority());
        builder.numChangeOfDescription(entity.getNumChangeOfDescription());
        if (entity.getAssignee() != null) builder.assignee(entity.getAssignee().getId());
        if (entity.getReviewer() != null) builder.reviewer(entity.getReviewer().getId());
        if (mongo.getTopics() != null) builder.topics(mongo.getTopics());
        if (mongo.getComments() != null) builder.comments(mongo.getComments());
        if (mongo.getAttachment() != null) builder.attachments(mongo.getAttachment());
        return builder.build();

    }
}
