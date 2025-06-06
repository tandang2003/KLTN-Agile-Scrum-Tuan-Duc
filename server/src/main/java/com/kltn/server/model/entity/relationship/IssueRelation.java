package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.type.task.IssueRelationType;
import jakarta.persistence.*;

@Entity
public class IssueRelation {
    @EmbeddedId
    private IssueRelationId id;
    @MapsId("issueId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "id")
    private Issue issue;
    @MapsId("issueId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "id")
    private Issue issueRelated;
    @Enumerated(EnumType.STRING)
    private IssueRelationType typeRelation;

    public IssueRelation() {
    }
    public IssueRelation(IssueRelationBuilder builder) {
        this.id = builder.id;
        this.issue = builder.issue;
        this.issueRelated = builder.issueRelated;
        this.typeRelation = builder.typeRelation;
    }

    public static class IssueRelationBuilder {
        private IssueRelationId id;
        private Issue issue;
        private Issue issueRelated;
        private IssueRelationType typeRelation;

        public IssueRelationBuilder id(IssueRelationId id) {
            this.id = id;
            return this;
        }

        public IssueRelationBuilder issue(Issue issue) {
            this.issue = issue;
            return this;
        }

        public IssueRelationBuilder issueRelated(Issue issueRelated) {
            this.issueRelated = issueRelated;
            return this;
        }

        public IssueRelationBuilder typeRelation(IssueRelationType typeRelation) {
            this.typeRelation = typeRelation;
            return this;
        }

        public IssueRelation build() {
            return new IssueRelation(this);
        }
    }

    public static IssueRelationBuilder builder() {
        return new IssueRelationBuilder();
    }

    public IssueRelationId getId() {
        return id;
    }

    public void setId(IssueRelationId id) {
        this.id = id;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public Issue getIssueRelated() {
        return issueRelated;
    }

    public void setIssueRelated(Issue issueRelated) {
        this.issueRelated = issueRelated;
    }

    public IssueRelationType getTypeRelation() {
        return typeRelation;
    }

    public void setTypeRelation(IssueRelationType typeRelation) {
        this.typeRelation = typeRelation;
    }
}
