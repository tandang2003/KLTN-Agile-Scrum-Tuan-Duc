package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface SprintRepository extends JpaRepository<Sprint, String> {
    List<Sprint> findAllByWorkspaceId(String workspaceId);

}
