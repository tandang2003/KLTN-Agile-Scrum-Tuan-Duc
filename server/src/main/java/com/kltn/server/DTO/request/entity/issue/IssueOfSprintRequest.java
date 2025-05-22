package com.kltn.server.DTO.request.entity.issue;

import jakarta.validation.constraints.NotEmpty;

public class IssueOfSprintRequest {
   @NotEmpty
   private String sprintId;
    @NotEmpty
    private String projectId;

    public IssueOfSprintRequest(String sprintId, String projectId) {
        this.sprintId = sprintId;
        this.projectId = projectId;
    }

    public IssueOfSprintRequest() {
    }

    public String getSprintId() {
        return sprintId;
    }

    public void setSprintId(String sprintId) {
        this.sprintId = sprintId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
}
