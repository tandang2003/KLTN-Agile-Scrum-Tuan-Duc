package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, String> {
}
