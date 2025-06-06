package com.kltn.server.model.collection.snapshot;

import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.model.collection.model.SubTask;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.type.task.IssueStatus;

import java.time.Instant;
import java.util.List;

public class IssueSnapshot {
    private String nkTaskId;
    private String name;
    private String description;
    private List<Topic> topics;
    private String assignee;
    private String reviewer;
    private String status;
    private String priority;
    private String tag;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant dtPlanning;
    private int complexOfDescription;
    private List<SubTask> subTasks;
    private List<ResourceSnapshot> resources;
    private List<Comment> comments;
    private int numChangeOfPriority;
    private int numChangeOfDescription;
    private String position;

    public IssueSnapshot(IssueSnapshotBuilder issueSnapshotBuilder) {
        this.nkTaskId = issueSnapshotBuilder.nkTaskId;
        this.name = issueSnapshotBuilder.name;
        this.description = issueSnapshotBuilder.description;
        this.topics = issueSnapshotBuilder.topics;
        this.assignee = issueSnapshotBuilder.assignee;
        this.reviewer = issueSnapshotBuilder.reviewer;
        this.status = issueSnapshotBuilder.status;
        this.priority = issueSnapshotBuilder.priority;
        this.tag = issueSnapshotBuilder.tag;
        this.dtStart = issueSnapshotBuilder.dtStart;
        this.dtEnd = issueSnapshotBuilder.dtEnd;
        this.dtPlanning = issueSnapshotBuilder.dtPlanning;
        this.complexOfDescription = issueSnapshotBuilder.complexOfDescription;
        this.subTasks = issueSnapshotBuilder.subTasks;
        this.resources = issueSnapshotBuilder.resources;
        this.comments = issueSnapshotBuilder.comments;
        this.numChangeOfPriority = issueSnapshotBuilder.numChangeOfPriority;
        this.numChangeOfDescription = issueSnapshotBuilder.numChangeOfDescription;
        this.position = issueSnapshotBuilder.position;
    }

    public static IssueSnapshotBuilder builder() {
        return new IssueSnapshotBuilder();
    }


    public static class IssueSnapshotBuilder {
        private String nkTaskId;
        private String name;
        private String position;
        private String description;
        private List<Topic> topics;
        private String assignee;
        private String reviewer;
        private String status;
        private String priority;
        private String tag;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant dtPlanning;
        private int complexOfDescription;
        private List<SubTask> subTasks;
        private List<ResourceSnapshot> resources;
        private List<Comment> comments;
        private int numChangeOfPriority;
        private int numChangeOfDescription;


        public IssueSnapshotBuilder numChangeOfPriority(int numChangeOfPriority) {
            this.numChangeOfPriority = numChangeOfPriority;
            return this;
        }

        public IssueSnapshotBuilder name(String name) {
            this.name = name;
            return this;
        }

        public IssueSnapshotBuilder numChangeOfDescription(int numChangeOfDescription) {
            this.numChangeOfDescription = numChangeOfDescription;
            return this;
        }

        public IssueSnapshotBuilder nkTaskId(String nkTaskId) {
            this.nkTaskId = nkTaskId;
            return this;
        }

        public IssueSnapshotBuilder description(String description) {
            this.description = description;
            return this;
        }

        public IssueSnapshotBuilder topics(List<Topic> topics) {
            this.topics = topics;
            return this;
        }

        public IssueSnapshotBuilder assignee(String assignee) {
            this.assignee = assignee;
            return this;
        }

        public IssueSnapshotBuilder reviewer(String reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public IssueSnapshotBuilder status(String status) {
            this.status = status;
            return this;
        }

        public IssueSnapshotBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public IssueSnapshotBuilder tag(String tag) {
            this.tag = tag;
            return this;
        }

        public IssueSnapshotBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public IssueSnapshotBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

        public IssueSnapshotBuilder dtPlanning(Instant dtPlanning) {
            this.dtPlanning = dtPlanning;
            return this;
        }

        public IssueSnapshotBuilder complexOfDescription(int complexOfDescription) {
            this.complexOfDescription = complexOfDescription;
            return this;
        }

        public IssueSnapshotBuilder subTasks(List<SubTask> subTasks) {
            this.subTasks = subTasks;
            return this;
        }

        public IssueSnapshotBuilder resources(List<ResourceSnapshot> resources) {
            this.resources = resources;
            return this;
        }

        public IssueSnapshotBuilder comments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }

        public IssueSnapshot build() {
            return new IssueSnapshot(this);
        }

        public IssueSnapshotBuilder position(String position) {
            this.position= position;
            return this;
        }
    }

    public String getNkTaskId() {
        return nkTaskId;
    }

    public void setNkTaskId(String nkTaskId) {
        this.nkTaskId = nkTaskId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
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

    public int getComplexOfDescription() {
        return complexOfDescription;
    }

    public void setComplexOfDescription(int complexOfDescription) {
        this.complexOfDescription = complexOfDescription;
    }

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks) {
        this.subTasks = subTasks;
    }

    public List<ResourceSnapshot> getResources() {
        return resources;
    }

    public void setResources(List<ResourceSnapshot> resources) {
        this.resources = resources;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getNumChangeOfPriority() {
        return numChangeOfPriority;
    }

    public void setNumChangeOfPriority(int numChangeOfPriority) {
        this.numChangeOfPriority = numChangeOfPriority;
    }

    public int getNumChangeOfDescription() {
        return numChangeOfDescription;
    }

    public void setNumChangeOfDescription(int numChangeOfDescription) {
        this.numChangeOfDescription = numChangeOfDescription;
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }
}
