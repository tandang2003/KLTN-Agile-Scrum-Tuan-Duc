package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkspacesUsersProjectsRepository extends JpaRepository<WorkspacesUsersProjects, WorkspacesUsersId> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "project.dtCreated");

    Optional<WorkspacesUsersProjects> findById(WorkspacesUsersId id);

    Optional<WorkspacesUsersProjects> findByUserIdAndProjectId(String userId, String projectId);

    @Query(
            value = "SELECT p FROM WorkspacesUsersProjects wup " +
                    "JOIN Project p ON wup.project.id = p.id WHERE wup.workspace.id = ?1",
            countQuery = "SELECT COUNT(*) FROM WorkspacesUsersProjects wup " +
                    "JOIN Project p ON wup.project.id = p.id WHERE wup.workspace.id = :workspaceId"
    )
    Page<Project> getProjecByWorkspaceId(String workspaceId, Pageable sort);

  Page<WorkspacesUsersProjects> findByWorkspace(Workspace workspace, Pageable pageRequest);
}
