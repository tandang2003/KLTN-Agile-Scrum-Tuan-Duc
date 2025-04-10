package com.kltn.server.config;

import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.*;
import com.kltn.server.repository.document.ChangeLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class testMongo implements CommandLineRunner {
    @Autowired
    ChangeLogRepository changeLogRepository;

    @Override
    public void run(String... args) throws Exception {
        // Sample tags, subtags, etc.
        System.out.println(123);
        Tag[] tags = {Tag.builder().setName("Backend").build(), Tag.builder().setName("Urgent").build()};
        SubTag[] subTags = {SubTag.builder().setName("API").build()};
        Attachment[] attachments = {Attachment.builder().resourceId("design_doc.pdf").build()};
        Comment[] comments = {Comment.builder().to("Alice").message("Please review this change.").build()};

        // Create LogTasks
        LogTasks logTasks = LogTasks.builder()
                .setProjectId("project_001")
                .setSprintId("sprint_01")
                .setAssigner("John")
                .setReviewer("Jane")
                .setDescription("Refactor authentication logic")
                .setStatus("In Progress")
                .setPriority("High")
                .setStoryPoint(5)
                .setDtStart(Instant.now())
                .setDtEnd(Instant.now().plusSeconds(86400 * 7))
                .setDtPlanning(Instant.now())
                .setDtPredictComplete(Instant.now().plusSeconds(86400 * 5))
                .setComplexDescription(3)
                .setTags(tags)
                .setSubTags(subTags)
                .setAttachment(attachments)
                .setComments(comments)
                .build();

        // Create ChangeLog
        ChangeLog changeLog = new ChangeLog.ChangeLogBuilder()
                .type("TASK_UPDATE")
                .entityTarget("TaskEntity")
                .propertiesTargets(new String[]{"status", "description"})
                .idRef("task-123")
                .change(logTasks)
                .build();

        changeLogRepository.save(changeLog);

        // Log to verify
        System.out.println("Created ChangeLog:");
        System.out.println("  Type: " + changeLog.getClass().getSimpleName());
        System.out.println("  ID Ref: " + changeLog.getIdRef());
    }
}
