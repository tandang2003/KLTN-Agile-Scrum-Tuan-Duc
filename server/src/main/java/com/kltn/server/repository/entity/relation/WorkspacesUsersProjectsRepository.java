package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspacesUsersProjectsRepository extends JpaRepository<WorkspacesUsersProjects, WorkspacesUsersId> {
    Optional<WorkspacesUsersProjects> findById(WorkspacesUsersId id);
    @Query("SELECT wup FROM WorkspacesUsersProjects wup WHERE wup.user.uniId = :userId AND wup.project.id = :projectId")
    Optional<WorkspacesUsersProjects> findByUserIdAndProjectId(String userId, String projectId);
}
