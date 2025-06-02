package com.kltn.server.DTO.request.entity.issue;

import jakarta.validation.constraints.NotEmpty;

public class IssueDetailRequest {
    @NotEmpty
    private String issueId;
    @NotEmpty
    private String sprintId;

    public IssueDetailRequest(String issueId, String sprintId) {
        this.issueId = issueId;
        this.sprintId = sprintId;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getSprintId() {
        return sprintId;
    }

    public void setSprintId(String sprintId) {
        this.sprintId = sprintId;
    }
}
