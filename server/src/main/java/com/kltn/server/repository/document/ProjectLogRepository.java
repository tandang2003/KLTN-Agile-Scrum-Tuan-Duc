package com.kltn.server.repository.document;

import com.kltn.server.model.collection.Project;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectLogRepository extends MongoRepository<Project, ObjectId> {
}
