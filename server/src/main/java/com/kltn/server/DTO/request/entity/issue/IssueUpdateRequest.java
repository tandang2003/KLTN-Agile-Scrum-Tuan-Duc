package com.kltn.server.DTO.request.entity.issue;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.request.base.SubTaskRequest;
import com.kltn.server.DTO.request.base.TopicRequest;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.SubTask;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import jakarta.validation.constraints.NotEmpty;

import java.time.Instant;
import java.util.List;

public class IssueUpdateRequest {
    @NotEmpty
    String id;
    String name;
    String description;
    IssuePriority priority;
//    IssueStatus status;
//    IssueTag tag;
//    int position;
    List<TopicRequest> topics;
    List<SubTaskRequest> subTasks;
    List<AttachmentRequest> attachments;
    String assignee;
    String reviewer;
    Instant start;
    Instant end;
    Instant planning;
    int complexOfDescription;
    @NotEmpty
    String fieldChanging;

    public Instant getPlanning() {
        return planning;
    }

    public void setPlanning(Instant planning) {
        this.planning = planning;
    }

    public int getComplexOfDescription() {
        return complexOfDescription;
    }

    public void setComplexOfDescription(int complexOfDescription) {
        this.complexOfDescription = complexOfDescription;
    }

    public String getFieldChanging() {
        return fieldChanging;
    }

    public void setFieldChanging(String fieldChanging) {
        this.fieldChanging = fieldChanging;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

//    public IssueTag getTag() {
//        return tag;
//    }
//
//    public void setTag(IssueTag tag) {
//        this.tag = tag;
//    }

//    public int getPosition() {
//        return position;
//    }
//
//    public void setPosition(int position) {
//        this.position = position;
//    }

    public List<TopicRequest> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicRequest> topics) {
        this.topics = topics;
    }

    public List<SubTaskRequest> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTaskRequest> subTasks) {
        this.subTasks = subTasks;
    }

    public List<AttachmentRequest> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<AttachmentRequest> attachments) {
        this.attachments = attachments;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

//    public IssueStatus getStatus() {
//        return status;
//    }
//
//    public void setStatus(IssueStatus status) {
//        this.status = status;
//    }
}
