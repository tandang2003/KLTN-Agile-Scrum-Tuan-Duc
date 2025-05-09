package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectSprintRepository extends JpaRepository<ProjectSprint, ProjectSprintId> {
}
