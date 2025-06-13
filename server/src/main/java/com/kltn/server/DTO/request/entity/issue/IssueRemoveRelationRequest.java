package com.kltn.server.DTO.request.entity.issue;

import jakarta.validation.constraints.NotEmpty;

public class IssueRemoveRelationRequest {
  @NotEmpty
  private String issueId;
  @NotEmpty
  private String issueRelatedId;


    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getIssueRelatedId() {
        return issueRelatedId;
    }

    public void setIssueRelatedId(String issueRelatedId) {
        this.issueRelatedId = issueRelatedId;
    }

}
