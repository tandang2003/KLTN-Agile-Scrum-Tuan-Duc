package com.kltn.server.mapper.snapshot;

import com.kltn.server.model.collection.model.Relation;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;

import java.util.List;
import java.util.Map;

public interface SnapshotMapper {
    ProjectSnapshot toSnapshot(String projectId, String sprintId,
                               Map<Issue, com.kltn.server.model.collection.Issue> issueMap,
                               Map<String, List<Resource>> issueResponseMap,
                               Map<String, List<Relation<String>>> relationships);

}
