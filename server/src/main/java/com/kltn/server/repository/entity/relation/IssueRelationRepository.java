package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.entity.relationship.IssueRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface IssueRelationRepository extends JpaRepository<IssueRelation, IssueRelationId> {


}
