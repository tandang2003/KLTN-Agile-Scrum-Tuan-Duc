package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspacesUsersProjectsRepository extends JpaRepository<WorkspacesUsersProjects, WorkspacesUsersId> {
}
