package com.kltn.server.mapper.document.iml;

import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.document.LogProjectMapper;
import com.kltn.server.mapper.document.LogTaskMapper;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.type.task.EntityTarget;
import com.kltn.server.model.type.task.LogType;
import org.springframework.stereotype.Component;

@Component
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
      .projectId(task.getProject().getId())
      .change(logTaskMapper.entityToLogDomain(task, issueMongo))

    ;
    return changeLogBuilder.build();
  }

  @Override
  public ChangeLogRequest projectToCreateLog(Project project, com.kltn.server.model.collection.Project projectMongo) {
    ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
    changeLogBuilder.type(LogType.CREATE)
      .idRef(project.getId())
      .projectId(project.getId())
      .entityTarget(EntityTarget.PROJECT.name())
      .change(logProjectMapper.entityToLogDomain(project, projectMongo))
    ;
    return changeLogBuilder.build();
  }

  @Override
  public ChangeLogRequest taskToUpdate(String[] properties, Issue task,
                                       com.kltn.server.model.collection.Issue issueMongo) {
    ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
    changeLogBuilder.type(LogType.UPDATE)
      .idRef(task.getId())
      .projectId(task.getProject().getId())

      .entityTarget(EntityTarget.TASK.name())
      .propertiesTargets(properties)
      .change(logTaskMapper.entityToLogDomain(task, issueMongo))
    ;
    return changeLogBuilder.build();
  }

  @Override
  public ChangeLogRequest taskToCreateRelation(Issue task, com.kltn.server.model.collection.Issue issueMongo) {
    ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
    changeLogBuilder.type(LogType.CREATE)
      .idRef(task.getId())
      .projectId(task.getProject().getId())
      .entityTarget(EntityTarget.TASK.name())
      .propertiesTargets(new String[]{"relations"})
      .change(logTaskMapper.entityToLogDomain(task, issueMongo))
    ;
    return changeLogBuilder.build();
  }

  @Override
  public ChangeLogRequest taskToRemoveRelation(Issue task, com.kltn.server.model.collection.Issue issueMongo) {
    ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
    changeLogBuilder.type(LogType.DELETE)
      .idRef(task.getId())
      .entityTarget(EntityTarget.TASK.name())
      .projectId(task.getProject().getId())
      .propertiesTargets(new String[]{"relations"})
      .change(logTaskMapper.entityToLogDomain(task, issueMongo))
    ;
    return changeLogBuilder.build();
  }

  @Override
  public ChangeLogRequest taskToDeleteLogRequest(Issue task, com.kltn.server.model.collection.Issue issueMongo) {
    ChangeLogRequest.ChangeLogRequestBuilder changeLogBuilder = ChangeLogRequest.builder();
    changeLogBuilder.type(LogType.DELETE)
      .idRef(task.getId())
      .entityTarget(EntityTarget.TASK.name())
      .projectId(task.getProject().getId())
      .change(logTaskMapper.entityToLogDomain(task, issueMongo))

    ;
    return changeLogBuilder.build();
  }
}
