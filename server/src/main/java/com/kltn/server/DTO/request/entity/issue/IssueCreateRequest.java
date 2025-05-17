package com.kltn.server.DTO.request.entity.issue;

import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.SubTask;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;
import java.util.List;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

public class IssueCreateRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String projectId;
    @NotEmpty
    private String sprintId;
    @Enumerated(EnumType.STRING)
    private IssueStatus status;
    @Enumerated(EnumType.STRING)
    private IssuePriority priority;
    @Enumerated(EnumType.STRING)
    private IssueTag tag;
    private int position;
    private List<Topic> topics;
    private List<SubTask> subTasks;
    private List<Attachment> attachments;
    @NotEmpty
    private String description;
    @NotEmpty
    private String assigneeId;
    @NotEmpty
    private String reviewerId;
    @DateTimeFormat(pattern = LOCAL_DATE_TIME)
    private Instant start;
    @DateTimeFormat(pattern = LOCAL_DATE_TIME)
    private Instant end;

    public static IssueCreateRequestBuilder builder() {
        return new IssueCreateRequestBuilder();
    }

    public IssueCreateRequest() {
    }

    public IssueCreateRequest(String name, String projectId, String sprintId, IssueStatus status, IssuePriority priority, IssueTag tag, int position, List<Topic> topics, List<SubTask> subTasks, List<Attachment> attachments, String description, String assigneeId, String reviewerId, Instant start, Instant end) {
        this.name = name;
        this.projectId = projectId;
        this.sprintId = sprintId;
        this.status = status;
        this.priority = priority;
        this.tag = tag;
        this.position = position;
        this.topics = topics;
        this.subTasks = subTasks;
        this.attachments = attachments;
        this.description = description;
        this.assigneeId = assigneeId;
        this.reviewerId = reviewerId;
        this.start = start;
        this.end = end;
    }

    public static class IssueCreateRequestBuilder {
        private String name;
        private String projectId;
        private String sprintId;
        private String status;
        private String priority;
        private String tag;
        private int position;
        private List<Topic> topics;
        private List<SubTask> subTasks;
        private List<Attachment> attachments;
        private String description;
        private String assigneeId;
        private String reviewerId;
        private Instant start;
        private Instant end;

        public IssueCreateRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public IssueCreateRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public IssueCreateRequestBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public IssueCreateRequestBuilder status(String status) {
            this.status = status;
            return this;
        }

        public IssueCreateRequestBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public IssueCreateRequestBuilder topics(List<Topic> topics) {
            this.topics = topics;
            return this;
        }

        public IssueCreateRequestBuilder subTasks(List<SubTask> subTasks) {
            this.subTasks = subTasks;
            return this;
        }

        public IssueCreateRequestBuilder attachments(List<Attachment> attachments) {
            this.attachments = attachments;
            return this;
        }

        public IssueCreateRequestBuilder tag(String tag) {
            this.tag = tag;
            return this;
        }

        public IssueCreateRequestBuilder description(String description) {
            this.description = description;
            return this;
        }

        public IssueCreateRequestBuilder assigneeId(String assigneeId) {
            this.assigneeId = assigneeId;
            return this;
        }

        public IssueCreateRequestBuilder reviewerId(String reviewerId) {
            this.reviewerId = reviewerId;
            return this;
        }

        public IssueCreateRequestBuilder position(int position) {
            this.position = position;
            return this;
        }

        public IssueCreateRequestBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public IssueCreateRequestBuilder end(Instant end) {
            this.end = end;
            return this;
        }

        public IssueCreateRequest build() {
            return new IssueCreateRequest(name, projectId, sprintId, IssueStatus.valueOf(status), IssuePriority.valueOf(priority), IssueTag.valueOf(tag), position, topics, subTasks, attachments, description, assigneeId, reviewerId, start, end);
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getSprintId() {
        return sprintId;
    }

    public void setSprintId(String sprintId) {
        this.sprintId = sprintId;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

    public IssueTag getTag() {
        return tag;
    }

    public void setTag(IssueTag tag) {
        this.tag = tag;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks) {
        this.subTasks = subTasks;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(String assigneeId) {
        this.assigneeId = assigneeId;
    }

    public String getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
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
}
