package com.kltn.server.DTO.request.entity.issue;


public class IssueDetailRequest {
    private String issueId;
    private String sprintId;

    public IssueDetailRequest() {
    }

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
