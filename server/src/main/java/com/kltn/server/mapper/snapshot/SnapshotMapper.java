package com.kltn.server.mapper.snapshot;

import com.kltn.server.model.collection.Project;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

public interface SnapshotMapper {
    ProjectSnapshot toSnapshot(String projectId, String sprintId, Map<Issue, com.kltn.server.model.collection.Issue> issueMap);
}
