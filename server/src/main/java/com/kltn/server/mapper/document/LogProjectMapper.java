package com.kltn.server.mapper.document;

import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.LogProject;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

public interface LogProjectMapper {
    LogProject entityToLogDomain(com.kltn.server.model.entity.Project project, com.kltn.server.model.collection.Project projectMongo);

}
