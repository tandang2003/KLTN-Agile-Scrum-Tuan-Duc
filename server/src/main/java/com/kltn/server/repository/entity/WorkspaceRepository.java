package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, String>, PagingAndSortingRepository<Workspace, String> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "dt_created");

    Page<Workspace> findAllByOwnerId(String ownerId, Pageable pageable);
    @Query(
            value = "SELECT u.* FROM workspaces u " +
                    "WHERE u.id IN (SELECT DISTINCT w.workspace_id FROM workspaces_users_projects w WHERE w.user_id = :memberId)",
            countQuery = "SELECT COUNT(*) FROM workspaces u " +
                    "WHERE u.id IN (SELECT DISTINCT w.workspace_id FROM workspaces_users_projects w WHERE w.user_id = :memberId)",
            nativeQuery = true)
    Page<Workspace> findAllByMembersId(String memberId, Pageable pageable);
}
