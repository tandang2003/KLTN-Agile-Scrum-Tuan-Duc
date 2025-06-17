package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, String> {

  Optional<List<Issue>> findAllByProjectIdAndSprintId(String projectId, String sprintId);

  @Query("SELECT i FROM Issue i WHERE i.project.id = ?1 AND i.id != ?2")
  Optional<List<Issue>> findByProjectIdAndIdNot(String projectId, String issueId);
}
