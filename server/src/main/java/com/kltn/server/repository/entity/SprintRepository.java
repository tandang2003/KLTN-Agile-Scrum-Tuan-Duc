package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Sprint;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, String> {
    List<Sprint> findAllByWorkspaceId(String workspaceId);
}
