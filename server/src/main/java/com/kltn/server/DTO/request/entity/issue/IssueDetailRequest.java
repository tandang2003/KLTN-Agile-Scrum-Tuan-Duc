package com.kltn.server.DTO.request.entity.issue;

import jakarta.validation.constraints.NotEmpty;

public class IssueDetailRequest {
    @NotEmpty
    private String issueId;
    @NotEmpty
    private String sprintId;

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
