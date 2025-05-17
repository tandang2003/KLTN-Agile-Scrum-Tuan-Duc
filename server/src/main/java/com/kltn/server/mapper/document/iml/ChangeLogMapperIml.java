package com.kltn.server.mapper.document.iml;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.document.LogProjectMapper;
import com.kltn.server.mapper.document.LogTaskMapper;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.type.task.EntityTarget;
import com.kltn.server.model.type.task.LogType;

public class ChangeLogMapperIml implements ChangeLogMapper {
    private final LogTaskMapper logTaskMapper;
    private final LogProjectMapper logProjectMapper;

    public ChangeLogMapperIml(LogTaskMapper logTaskMapper, LogProjectMapper logProjectMapper) {
        this.logTaskMapper = logTaskMapper;
        this.logProjectMapper = logProjectMapper;
    }

    @Override
    public ChangeLogRequest taskToCreateLogRequest(Issue task, com.kltn.server.model.collection.Issue issueMongo) {
        ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
        changeLogBuilder.type(LogType.CREATE)
                .idRef(task.getId())
                .entityTarget(EntityTarget.TASK.name())
                .change(logTaskMapper.entityToLogDomain(task, issueMongo));
        return changeLogBuilder.build();
    }

    @Override
    public ChangeLog ProjectToCreateLog(Project project, com.kltn.server.model.collection.Project projectMongo) {
        ChangeLog.ChangeLogBuilder changeLogBuilder = ChangeLog.builder();
        changeLogBuilder.type(LogType.CREATE)
                .idRef(project.getId())
                .entityTarget(EntityTarget.PROJECT.name())
                .change(logProjectMapper.entityToLogDomain(project, projectMongo));
        return changeLogBuilder.build();
    }

    @Override
    public ChangeLog TaskToUpdate(String[] properties, Issue task, com.kltn.server.model.collection.Issue issueMongo) {
        ChangeLog.ChangeLogBuilder changeLogBuilder = ChangeLog.builder();
        changeLogBuilder.type(LogType.UPDATE)
                .idRef(task.getId())
                .entityTarget(EntityTarget.TASK.name())
                .propertiesTargets(properties)
                .change(logTaskMapper.entityToLogDomain(task, issueMongo));
        return changeLogBuilder.build();
    }

//    @Override
//    public ChangeLog TaskToUpdate(Issue curEntity, Issue newEntity, com.kltn.server.model.collection.Issue curDocument, com.kltn.server.model.collection.Issue newDocument) {
//        ChangeLog.ChangeLogBuilder changeLogBuilder = ChangeLog.builder();
////        changeLogBuilder.type(LogType.UPDATE)
////                .idRef(curEntity.getId())
////                .entityTarget(EntityTarget.PROJECT.name())
////                .
////                .change();
//
//
//        return null;
//    }
}
