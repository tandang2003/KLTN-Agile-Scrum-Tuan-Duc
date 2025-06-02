package com.kltn.server.model.collection.snapshot;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document
public class ProjectSnapshot {
    @MongoId
    private ObjectId id;
    @Field("nk_project_id")
    private String projectId;
    @Field("nk_sprint_id")
    private String sprintId;
    private List<IssueSnapshot> issues;

    public ProjectSnapshot(ProjectSnapshotBuilder projectSnapshotBuilder) {
        this.projectId = projectSnapshotBuilder.projectId;
        this.sprintId = projectSnapshotBuilder.sprintId;
        this.issues = projectSnapshotBuilder.issues;
    }
    public static ProjectSnapshotBuilder builder() {
        return new ProjectSnapshotBuilder();
    }

    public static class ProjectSnapshotBuilder {
        private ObjectId id;
        private String projectId;
        private String sprintId;
        private List<IssueSnapshot> issues;

        public ProjectSnapshotBuilder id(ObjectId id) {
            this.id = id;
            return this;
        }

        public ProjectSnapshotBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public ProjectSnapshotBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public ProjectSnapshotBuilder issues(List<IssueSnapshot> issues) {
            this.issues = issues;
            return this;
        }

        public ProjectSnapshot build() {
            return new ProjectSnapshot(this);
        }
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    public List<IssueSnapshot> getIssues() {
        return issues;
    }

    public void setIssues(List<IssueSnapshot> issues) {
        this.issues = issues;
    }
}
