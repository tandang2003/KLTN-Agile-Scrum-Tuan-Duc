package com.kltn.server.repository.document.snapshot;

import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SnapshotRepository extends MongoRepository<ProjectSnapshot, ObjectId> {
    Optional<ProjectSnapshot> findByProjectIdAndSprintId(String projectId, String sprintId);
}
