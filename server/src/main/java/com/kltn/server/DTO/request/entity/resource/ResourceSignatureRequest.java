package com.kltn.server.DTO.request.entity.resource;

import jakarta.validation.constraints.NotBlank;

public class ResourceSignatureRequest {
    @NotBlank
    private String projectId;
    @NotBlank
    private String issueId;
    private String userId;

    public ResourceSignatureRequest() {
    }

    public ResourceSignatureRequest(String projectId, String issueId, String userId) {
        this.projectId = projectId;
        this.issueId = issueId;
        this.userId = userId;

    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
