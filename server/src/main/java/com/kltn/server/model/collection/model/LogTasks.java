package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

public class LogTasks implements ILog {
    @Field
    private String projectId;
    @Field
    private String sprintId;
    @Field
    private String assigner;
    @Field
    private String reviewer;
    @Field
    private String description;
    @Field
    private String status;
    @Field
    private String priority;
    @Field
    private int storyPoint;
    @Field
    private Instant dtStart;
    @Field
    private Instant dtEnd;
    @Field
    private Instant dtPlanning;
    @Field
    private Instant dtPredictComplete;
    @Field
    private int complexDescription;
    @Field("topics")
    private Topic[] topics;
    @Field("subTags")
    private SubTask[] subTags;
    @Field("attachments")
    private Attachment[] attachment;
    @Field("comments")
    private Comment[] comments;

    private LogTasks(LogTasksBuilder builder) {
        this.projectId = builder.projectId;
        this.sprintId = builder.sprintId;
        this.assigner = builder.assigner;
        this.reviewer = builder.reviewer;
        this.description = builder.description;
        this.status = builder.status;
        this.priority = builder.priority;
        this.storyPoint = builder.storyPoint;
        this.dtStart = builder.dtStart;
        this.dtEnd = builder.dtEnd;
        this.dtPlanning = builder.dtPlanning;
        this.dtPredictComplete = builder.dtPredictComplete;
        this.complexDescription = builder.complexDescription;
        this.topics = builder.topics;
        this.subTags = builder.subTags;
        this.attachment = builder.attachment;
        this.comments = builder.comments;
    }

    public static LogTasksBuilder builder() {
        return new LogTasksBuilder();
    }

    public static class LogTasksBuilder {
        private String projectId;
        private String sprintId;
        private String assigner;
        private String reviewer;
        private String description;
        private String status;
        private String priority;
        private int storyPoint;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant dtPlanning;
        private Instant dtPredictComplete;
        private int complexDescription;
        private Topic[] topics;
        private SubTask[] subTags;
        private Attachment[] attachment;
        private Comment[] comments;


        public LogTasksBuilder setProjectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public LogTasksBuilder setSprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public LogTasksBuilder setAssigner(String assigner) {
            this.assigner = assigner;
            return this;
        }

        public LogTasksBuilder setReviewer(String reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public LogTasksBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public LogTasksBuilder setStatus(String status) {
            this.status = status;
            return this;
        }

        public LogTasksBuilder setPriority(String priority) {
            this.priority = priority;
            return this;
        }

        public LogTasksBuilder setStoryPoint(int storyPoint) {
            this.storyPoint = storyPoint;
            return this;
        }

        public LogTasksBuilder setDtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public LogTasksBuilder setDtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

        public LogTasksBuilder setDtPlanning(Instant dtPlanning) {
            this.dtPlanning = dtPlanning;
            return this;
        }

        public LogTasksBuilder setDtPredictComplete(Instant dtPredictComplete) {
            this.dtPredictComplete = dtPredictComplete;
            return this;
        }

        public LogTasksBuilder setComplexDescription(int complexDescription) {
            this.complexDescription = complexDescription;
            return this;
        }

        public LogTasksBuilder setTags(Topic[] topics) {
            this.topics = topics;
            return this;
        }

        public LogTasksBuilder setSubTags(SubTask[] subTags) {
            this.subTags = subTags;
            return this;
        }

        public LogTasksBuilder setAttachment(Attachment[] attachment) {
            this.attachment = attachment;
            return this;
        }

        public LogTasksBuilder setComments(Comment[] comments) {
            this.comments = comments;
            return this;
        }

        public LogTasks build() {
            return new LogTasks(this);
        }
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

    public String getAssigner() {
        return assigner;
    }

    public void setAssigner(String assigner) {
        this.assigner = assigner;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public Instant getDtStart() {
        return dtStart;
    }

    public void setDtStart(Instant dtStart) {
        this.dtStart = dtStart;
    }

    public Instant getDtEnd() {
        return dtEnd;
    }

    public void setDtEnd(Instant dtEnd) {
        this.dtEnd = dtEnd;
    }

    public Instant getDtPlanning() {
        return dtPlanning;
    }

    public void setDtPlanning(Instant dtPlanning) {
        this.dtPlanning = dtPlanning;
    }

    public Instant getDtPredictComplete() {
        return dtPredictComplete;
    }

    public void setDtPredictComplete(Instant dtPredictComplete) {
        this.dtPredictComplete = dtPredictComplete;
    }

    public int getComplexDescription() {
        return complexDescription;
    }

    public void setComplexDescription(int complexDescription) {
        this.complexDescription = complexDescription;
    }

    public Topic[] getTags() {
        return topics;
    }

    public void setTags(Topic[] topics) {
        this.topics = topics;
    }

    public SubTask[] getSubTags() {
        return subTags;
    }

    public void setSubTags(SubTask[] subTags) {
        this.subTags = subTags;
    }

    public Attachment[] getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment[] attachment) {
        this.attachment = attachment;
    }

    public Comment[] getComments() {
        return comments;
    }

    public void setComments(Comment[] comments) {
        this.comments = comments;
    }
}
