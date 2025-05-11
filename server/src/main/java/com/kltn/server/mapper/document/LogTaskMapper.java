package com.kltn.server.mapper.document;

import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.collection.model.LogTask;

public interface LogTaskMapper {
    LogTask entityToLogDomain(com.kltn.server.model.entity.Issue task, Issue issueMongo);

}
