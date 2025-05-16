package com.kltn.server.repository.document;

import com.kltn.server.model.collection.Issue;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface IssueLogRepository extends MongoRepository<Issue, ObjectId> {

    Optional<Issue> findByNkTaskId(String nkTaskId);

    List<Issue> findByNkTaskIdIn(List<String> nkTaskIds);
}
