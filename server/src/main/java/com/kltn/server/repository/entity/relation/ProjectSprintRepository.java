package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectSprintRepository extends JpaRepository<ProjectSprint, ProjectSprintId> {
    @Override
    Optional<ProjectSprint> findById(ProjectSprintId projectSprintId);
}
