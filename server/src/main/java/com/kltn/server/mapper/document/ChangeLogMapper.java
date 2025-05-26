package com.kltn.server.mapper.document;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.entity.Project;
import org.springframework.stereotype.Component;

@Component
public interface ChangeLogMapper {
    ChangeLogRequest taskToCreateLogRequest(com.kltn.server.model.entity.Issue task, Issue issueMongo);

    ChangeLogRequest ProjectToCreateLog(Project project, com.kltn.server.model.collection.Project projectMongo);

    ChangeLogRequest TaskToUpdate(String[] properties, com.kltn.server.model.entity.Issue task, Issue issueMongo);


}
