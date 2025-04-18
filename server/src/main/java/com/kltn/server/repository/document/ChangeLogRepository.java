package com.kltn.server.repository.document;

import com.kltn.server.model.collection.ChangeLog;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChangeLogRepository extends MongoRepository<ChangeLog, ObjectId> {

}
