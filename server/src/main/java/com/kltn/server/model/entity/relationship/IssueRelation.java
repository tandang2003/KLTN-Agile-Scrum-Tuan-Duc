package com.kltn.server.model.entity.relationship;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class IssueRelation {
    @Id
    private String id;
    private String mainId;
    private String sprintId;
    private String relatedId;

    public IssueRelation(IssueRelationBuilder issueRelationBuilder) {
        this.id = issueRelationBuilder.id;
        this.mainId = issueRelationBuilder.mainId;
        this.sprintId = issueRelationBuilder.sprintId;
        this.relatedId = issueRelationBuilder.relatedId;
    }
    public IssueRelation() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMainId() {
        return mainId;
    }

    public void setMainId(String mainId) {
        this.mainId = mainId;
    }

    public String getSprintId() {
        return sprintId;
    }

    public void setSprintId(String sprintId) {
        this.sprintId = sprintId;
    }

    public String getRelatedId() {
        return relatedId;
    }

    public void setRelatedId(String relatedId) {
        this.relatedId = relatedId;
    }

    public static IssueRelationBuilder builder() {
        return new IssueRelationBuilder();
    }

    public static class IssueRelationBuilder {
        private String id;
        private String mainId;
        private String sprintId;
        private String relatedId;

        public IssueRelationBuilder id(String id) {
            this.id = id;
            return this;
        }

        public IssueRelationBuilder mainId(String mainId) {
            this.mainId = mainId;
            return this;
        }

        public IssueRelationBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public IssueRelationBuilder relatedId(String relatedId) {
            this.relatedId = relatedId;
            return this;
        }

        public IssueRelation build() {
            return new IssueRelation(this);
        }
    }
}
