package com.kltn.server.repository.document;

import com.kltn.server.model.collection.Project;
import com.kltn.server.model.collection.model.Topic;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectLogRepository extends MongoRepository<Project, ObjectId> {
    Optional<Project> findByNkProjectId(String nkProjectId);

}
