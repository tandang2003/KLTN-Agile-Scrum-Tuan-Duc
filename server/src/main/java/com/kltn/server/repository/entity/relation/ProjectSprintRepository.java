package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ProjectSprintRepository extends JpaRepository<ProjectSprint, ProjectSprintId> {
    Optional<ProjectSprint> findById(ProjectSprintId projectSprintId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO project_sprint (project_id, sprint_id) VALUES (:projectId, :sprintId)", nativeQuery = true)
    void save(@Param("projectId") String projectId, @Param("sprintId") String sprintId);


}
