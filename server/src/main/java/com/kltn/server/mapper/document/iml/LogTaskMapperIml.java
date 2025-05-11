package com.kltn.server.mapper.document.iml;

import com.kltn.server.mapper.document.LogTaskMapper;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.collection.model.LogTask;
import org.springframework.context.annotation.Primary;

import java.util.ArrayList;
@Primary
public class LogTaskMapperIml implements LogTaskMapper {

    public LogTask entityToLogDomain(com.kltn.server.model.entity.Issue entity, Issue document) {
        var builder = LogTask.builder();
        if (entity != null) {
            builder.description(entity.getDescription());
            builder.description(entity.getDescription());
            builder.status(entity.getStatus().name());
            builder.priority(entity.getPriority().name());
            builder.storyPoint(entity.getStoryPoint());
            builder.dtStart(entity.getDtStart());
            builder.dtEnd(entity.getDtEnd());
            builder.dtPlanning(entity.getDtPlanning());
            builder.complexDescription(entity.getComplexOfDescription());
            if (entity.getAssigner() != null) builder.assigner(entity.getAssigner().getId());
            if (entity.getReviewer() != null) builder.reviewer(entity.getReviewer().getId());
            if (entity.getPriority() != null) {
                builder.projectId(entity.getProjectSprint().getId().getProjectId());
                builder.sprintId(entity.getProjectSprint().getId().getSprintId());
            }
            if (document.getTopics() != null) builder.topics(new ArrayList<>(document.getTopics()));
            if (document.getAttachment() != null) builder.attachment(new ArrayList<>(document.getAttachment()));
            if (document.getSubTasks() != null) builder.subTask(document.getSubTasks());

        }
        return builder.build();
    }

}
