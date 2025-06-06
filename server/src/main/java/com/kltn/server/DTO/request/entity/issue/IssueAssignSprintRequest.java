package com.kltn.server.DTO.request.entity.issue;

import com.kltn.server.model.type.task.IssueRelationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;

public class IssueAssignSprintRequest {
    @NotEmpty
    private String issueId;
    @NotEmpty
    private String issueRelatedId;
    @NotEmpty
    @Enumerated(EnumType.STRING)
    private IssueRelationType typeRelation;

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

    public IssueRelationType getTypeRelation() {
        return typeRelation;
    }

    public void setTypeRelation(IssueRelationType typeRelation) {
        this.typeRelation = typeRelation;
    }
}
