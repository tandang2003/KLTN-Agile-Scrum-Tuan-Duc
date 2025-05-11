package com.kltn.server.model.entity.embeddedKey;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class ProjectSprintId implements Serializable {
    private String projectId;
    private String sprintId;

    public ProjectSprintId() {
    }

    private ProjectSprintId(ProjectSprintIdBuilder projectSprintIdBuilder) {
        this.projectId = projectSprintIdBuilder.projectId;
        this.sprintId = projectSprintIdBuilder.sprintId;
    }

    public static class ProjectSprintIdBuilder {
        private String projectId;
        private String sprintId;

        public ProjectSprintIdBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public ProjectSprintIdBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public ProjectSprintId build() {
            return new ProjectSprintId(this);
        }
    }

    public static ProjectSprintIdBuilder builder() {
        return new ProjectSprintIdBuilder();
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
}
