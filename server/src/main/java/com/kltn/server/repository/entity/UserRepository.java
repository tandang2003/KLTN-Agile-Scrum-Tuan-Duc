package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>, PagingAndSortingRepository<User, String> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "id");

    Optional<User> findAllByUniId(String uniId);

    Optional<User> findByUniId(String uniId);

    Optional<User> findByEmail(String email);

    @Query(
            value = "SELECT u.* FROM users u " +
            "WHERE u.id IN (SELECT w.user_id FROM workspaces_users w WHERE w.workspace_id = :workspaceId)",
            countQuery = "SELECT COUNT(*) FROM users u " +
                    "WHERE u.id IN (SELECT w.user_id FROM workspaces_users w WHERE w.workspace_id = :workspaceId)",
            nativeQuery = true)
    Page<User> findAllByWorkspacesId(String workspaceId, PageRequest of);
}
