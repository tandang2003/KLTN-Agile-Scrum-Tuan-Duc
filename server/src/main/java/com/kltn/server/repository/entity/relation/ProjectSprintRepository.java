package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProjectSprintRepository extends JpaRepository<ProjectSprint, ProjectSprintId> {
    Optional<ProjectSprint> findById(ProjectSprintId projectSprintId);

    boolean existsById(ProjectSprintId projectSprintId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO project_sprint (project_id, sprint_id) VALUES (:projectId, :sprintId)", nativeQuery = true)
    void save(@Param("projectId") String projectId, @Param("sprintId") String sprintId);

    @Transactional
    @Query(value = "select project_id from project_sprint where sprint_id = :sprintId", nativeQuery = true)
    Optional<List<String>> findProjectIdBySprintId(String sprintId);

  List<ProjectSprint> findBySprintId(String sprintId);
  Page<ProjectSprint> findBySprintId(String sprintId, Pageable pageable);

  List<ProjectSprint> findByProjectId(String projectId);

  ProjectSprint findFirstByProjectId(String projectId);


//    Optional<List<String>> findProjectIdBySprintId(String sprintId);
}
