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
    @JoinColumn(name = "issue_id")
    private Issue issueId;
    @MapsId("issueId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "issue_related_id")
    private Issue issueRelatedId;
    @Enumerated(EnumType.STRING)
    private IssueRelationType typeRelation;

    public IssueRelation() {
    }

}
