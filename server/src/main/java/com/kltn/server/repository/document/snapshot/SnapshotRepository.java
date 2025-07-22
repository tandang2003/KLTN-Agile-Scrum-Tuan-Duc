package com.kltn.server.repository.document.snapshot;

import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.type.task.IssueStatus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface SnapshotRepository extends MongoRepository<ProjectSnapshot, ObjectId> {

    boolean existsByProjectIdAndSprintId(String projectId, String sprintId);
    Optional<ProjectSnapshot> findByProjectIdAndSprintId(String projectId, String sprintId);
  @Query(value = "{ 'nk_project_id': ?0, 'nk_sprint_id': ?1, 'issues.assignee': ?2 }", exists = true)
  boolean existsByProjectIdAndSprintIdAndIssues_Id(String projectId, String sprintId, String issueId);
  @Query(value = "{ 'nk_project_id': ?0, 'nk_sprint_id': ?1, 'issues.assignee': ?2, 'issues.status': ?3 }", exists = true)
  boolean existsByProjectIdAndSprintIdAndIssuesAssigneeAndStatus(String id, String id1, String uniId, String issueStatus);
  @Query(value = "{ 'nk_project_id': ?0, 'issues.assignee': ?1, 'issues.status': ?2 }", exists = true)
  int countByProjectIdAndIssues_AssigneeIdAndStatus(String id, String uniId, String issueStatus);
  @Query(value = "{ 'nk_project_id': ?0,  'issues.assignee': ?1 }", exists = true)
  int countByProjectIdAndIssues_AssigneeId(String id, String uniId);
  @Query(value = "{ 'nk_project_id': ?0, 'nk_sprint_id': ?1, 'issues.assignee': ?2 }", exists = true)
  int countByProjectIdAndSprintIdAndIssues_AssigneeId(String id, String id1, String uniId);
  @Query(value = "{ 'nk_project_id': ?0, 'nk_sprint_id': ?1,  'issues.assignee': ?2 ,'issues.status': ?3 }", exists = true)
  int countByProjectIdAndSPrintIdAndIssues_AssigneeIdAndStatus(String id, String id1, String id2, String issueStatus);
}
