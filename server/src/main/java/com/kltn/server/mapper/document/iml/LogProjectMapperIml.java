package com.kltn.server.mapper.document.iml;

import com.kltn.server.mapper.document.LogProjectMapper;
import com.kltn.server.model.collection.model.LogProject;
import com.kltn.server.model.entity.Project;
import org.springframework.context.annotation.Primary;

@Primary
public class LogProjectMapperIml implements LogProjectMapper {

    @Override
    public LogProject entityToLogDomain(Project project, com.kltn.server.model.collection.Project projectMongo) {

        return null;
    }
}
