package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.entity.relationship.IssueRelation;
import com.kltn.server.model.type.task.IssueRelationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRelationRepository extends JpaRepository<IssueRelation, IssueRelationId> {


  int countIssueRelationByTypeRelationAndIssue(IssueRelationType typeRelation, Issue issue);

  int countIssueRelationByTypeRelationAndIssueId(IssueRelationType typeRelation, String issueId);
}
