package com.kltn.server.DTO.request.kafka;

public class SnapshotRequest {
    private String projectId;
    private String sprintId;

    public SnapshotRequest() {
    }

    public SnapshotRequest(SnapshotRequestBuilder builder) {
        this.projectId = builder.projectId;
        this.sprintId = builder.sprintId;
    }

    public static SnapshotRequestBuilder builder() {
        return new SnapshotRequestBuilder();
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

    public static class SnapshotRequestBuilder {
        private String projectId;
        private String sprintId;


        public SnapshotRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public SnapshotRequestBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public SnapshotRequest build() {
            return new SnapshotRequest(this);
        }
    }


}
