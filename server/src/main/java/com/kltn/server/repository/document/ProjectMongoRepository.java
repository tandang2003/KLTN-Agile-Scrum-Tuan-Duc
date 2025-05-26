package com.kltn.server.repository.document;

import com.kltn.server.model.collection.Project;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProjectMongoRepository extends MongoRepository<Project, ObjectId> {
    Optional<Project> findByNkProjectId(String nkProjectId);

}
