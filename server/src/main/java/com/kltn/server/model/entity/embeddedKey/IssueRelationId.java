package com.kltn.server.model.entity.embeddedKey;

import com.kltn.server.model.type.task.IssueRelationType;
import jakarta.persistence.*;

@Embeddable
public class IssueRelationId {
    @Column(name="issue_id")
    private String issueId;
    @Column(name="issue_related_id")
    private String issueRelatedId;

    public IssueRelationId() {
    }

    public IssueRelationId(IssueRelationBuilder issueRelationBuilder) {
        this.issueId = issueRelationBuilder.issueId;
        this.issueRelatedId = issueRelationBuilder.issueRelatedId;
    }

    public static IssueRelationBuilder builder() {
        return new IssueRelationBuilder();
    }

    public static class IssueRelationBuilder {
        private String id;
        private String issueId;
        private String issueRelatedId;
        private IssueRelationType typeRelation;

        public IssueRelationBuilder id(String id) {
            this.id = id;
            return this;
        }

        public IssueRelationBuilder issueId(String issueId) {
            this.issueId = issueId;
            return this;
        }

        public IssueRelationBuilder issueRelatedId(String issueRelatedId) {
            this.issueRelatedId = issueRelatedId;
            return this;
        }

        public IssueRelationBuilder typeRelation(IssueRelationType typeRelation) {
            this.typeRelation = typeRelation;
            return this;
        }

        public IssueRelationId build() {
            return new IssueRelationId(this);
        }
    }

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
