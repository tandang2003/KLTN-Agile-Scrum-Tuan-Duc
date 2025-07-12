package com.kltn.server.repository.entity;

import com.kltn.server.model.collection.model.Relation;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.relationship.IssueRelation;
import com.kltn.server.model.type.task.IssueStatus;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, String> {

  Optional<List<Issue>> findAllByProjectIdAndSprintId(String projectId, String sprintId);

  @Query("SELECT i FROM Issue i WHERE i.project.id = ?1 AND i.id != ?2")
  Optional<List<Issue>> findByProjectIdAndIdNot(String projectId, String issueId);

  int countByProjectIdAndSprintIdAndDtCreatedAfter(String id, String id1, Instant dtStart);

  int countByProjectIdAndSprintIdAndDtEndBeforeAndStatus(String id, String id1, Instant now, IssueStatus issueStatus);

  int countByProjectIdAndSprintIdAndStatus(String projectId, String sprintId, IssueStatus status);

  int countByProjectIdAndSprintIdAndAssigneeNotNull(String projectId, String sprintId);

  @Query("SELECT COUNT(DISTINCT i.sprint) " +
      "FROM IssueRelation ir " +
      "JOIN ir.issue i " +
      "WHERE ir.typeRelation = 'IS_BLOCKED_BY' " +
      "AND ir.issueRelated.id = :issueId")
  int getNumberOfAffectVersions(@Param("issueId") String issueId);

  @Query(value = "SELECT r.* FROM issues i JOIN issue_resources rs ON i.id=rs.issue_id" + "JOIN resources r ON r" +
      ".id=rs.issue_id", nativeQuery = true)
  List<Resource> getResources(String issueId);

  @Query(value = "SELECT ir.* FROM issue_relation ir WHERE ir.issue_id= :issueId ", nativeQuery = true)
  List<IssueRelation> getIssueRelation(String issueId);

  int countByProjectIdAndSprintIdAndDtAppendBefore(String projectId, String sprintId, Instant dtAppendBefore);

  int countByProjectIdAndSprintIdAndDtAppendLessThanEqual(String projectId, String sprintId,
      Instant dtAppendIsLessThan);

  int countByProjectIdAndSprintIdAndDtAppendGreaterThan(String projectId, String sprintId,
      Instant dtAppendIsGreaterThan);
}
