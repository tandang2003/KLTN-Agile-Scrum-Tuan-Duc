package com.kltn.server.DTO.response.issue;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IssueRelationResponse {
    private IssueResponse issue;
    private IssueResponse issueRelated;
    private String typeRelation;

    public IssueRelationResponse() {
    }

    public IssueRelationResponse(IssueRelationResponseBuilder builder) {
        this.issue = builder.issue;
        this.issueRelated = builder.issueRelated;
        this.typeRelation = builder.typeRelation;
    }

    public static class IssueRelationResponseBuilder {
        private IssueResponse issue;
        private IssueResponse issueRelated;
        private String typeRelation;

        public IssueRelationResponseBuilder issue(IssueResponse issue) {
            this.issue = issue;
            return this;
        }

        public IssueRelationResponseBuilder issueRelated(IssueResponse issueRelated) {
            this.issueRelated = issueRelated;
            return this;
        }

        public IssueRelationResponseBuilder typeRelation(String typeRelation) {
            this.typeRelation = typeRelation;
            return this;
        }

        public IssueRelationResponse build() {
            IssueRelationResponse response = new IssueRelationResponse();
            response.issue = this.issue;
            response.issueRelated = this.issueRelated;
            response.typeRelation = this.typeRelation;
            return response;
        }
    }

    public static IssueRelationResponseBuilder builder() {
        return new IssueRelationResponseBuilder();
    }

    public IssueResponse getIssue() {
        return issue;
    }

    public void setIssue(IssueResponse issue) {
        this.issue = issue;
    }

    public IssueResponse getIssueRelated() {
        return issueRelated;
    }

    public void setIssueRelated(IssueResponse issueRelated) {
        this.issueRelated = issueRelated;
    }

    public String getTypeRelation() {
        return typeRelation;
    }

    public void setTypeRelation(String typeRelation) {
        this.typeRelation = typeRelation;
    }
}
