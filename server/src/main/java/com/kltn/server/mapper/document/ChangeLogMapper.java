package com.kltn.server.mapper.document;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.entity.Project;

public interface ChangeLogMapper {
    ChangeLogRequest taskToCreateLogRequest(com.kltn.server.model.entity.Issue task, Issue issueMongo);

    ChangeLog ProjectToCreateLog(Project task, com.kltn.server.model.collection.Project taskMongo);

    ChangeLog TaskToUpdate( String[] properties,com.kltn.server.model.entity.Issue task, Issue issueMongo );


}
