package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.User;
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

  int countByProjectIdAndSprintIdAndDtCreatedBefore(String projectId, String sprintId, Instant dtCreatedBefore);

  int countByProjectIdAndSprintIdAndDtCreatedAfter(String id, String id1, Instant dtStart);

  int countByProjectIdAndSprintIdAndDtEndBeforeAndStatus(String id, String id1, Instant now, IssueStatus issueStatus);

  int countByProjectIdAndSprintIdAndStatus(String projectId, String sprintId, IssueStatus status);

  int countByProjectIdAndSprintIdAndAssigneeNotNull(String projectId, String sprintId);
  @Query(
    "SELECT COUNT(DISTINCT i.sprint) " +
    "FROM IssueRelation ir " +
    "JOIN ir.issueRelated i " +
    "WHERE ir.typeRelation = 'IS_BLOCKED_BY' " +
    "AND ir.issue.id = :issueId"
  )
  int getNumberOfAffectVersions(@Param("issueId") String id);
}
