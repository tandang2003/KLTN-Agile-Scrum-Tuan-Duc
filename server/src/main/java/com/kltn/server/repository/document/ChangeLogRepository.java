package com.kltn.server.repository.document;

import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.type.task.LogType;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChangeLogRepository extends MongoRepository<ChangeLog, ObjectId> {

  Page<ChangeLog> findAllByProjectId(String projectId, Pageable dtCreated);

  List<ChangeLog> findByTypeAndPropertiesTargetsContains(LogType type, String[] propertiesTargets);

  List<ChangeLog> findByIdRefAndTypeAndPropertiesTargetsContains(String idRef, LogType type, String[] propertiesTargets);
}
