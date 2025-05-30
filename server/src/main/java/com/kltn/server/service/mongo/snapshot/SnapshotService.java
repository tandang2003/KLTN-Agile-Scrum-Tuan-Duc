package com.kltn.server.service.mongo.snapshot;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.repository.document.snapshot.SnapshotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnapshotService {
    private SnapshotRepository snapshotRepository;

    @Autowired
    public SnapshotService(SnapshotRepository snapshotRepository) {
        this.snapshotRepository = snapshotRepository;
    }

    public List<IssueSnapshot> getByProjectIdAndSprintId(String projectId, String sprintId) {
        return snapshotRepository.findByProjectIdAndSprintId(projectId, sprintId)
                .map(ProjectSnapshot::getIssues)
                .orElseThrow(() -> AppException.builder().error(Error.SERVER_SNAPSHOT_SERVICE_ERROR).build());
    }

}
