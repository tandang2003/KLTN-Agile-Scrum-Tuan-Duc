package com.kltn.server.mapper.document;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.entity.Project;
import org.springframework.stereotype.Component;

@Component
public interface ChangeLogMapper {
  ChangeLogRequest taskToCreateLogRequest(com.kltn.server.model.entity.Issue task, Issue issueMongo);

  ChangeLogRequest projectToCreateLog(Project project, com.kltn.server.model.collection.Project projectMongo);

  ChangeLogRequest taskToUpdate(String[] properties, com.kltn.server.model.entity.Issue task, Issue issueMongo);

  ChangeLogRequest taskToCreateRelation(com.kltn.server.model.entity.Issue task, Issue issueMongo);

}
