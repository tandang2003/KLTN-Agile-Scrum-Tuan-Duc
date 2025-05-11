package com.kltn.server.repository.document;

import com.kltn.server.model.collection.Issue;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssueLogRepository extends MongoRepository<Issue, ObjectId> {


}
