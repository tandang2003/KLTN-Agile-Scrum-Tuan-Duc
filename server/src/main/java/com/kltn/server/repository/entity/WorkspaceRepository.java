package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, String>, PagingAndSortingRepository<Workspace, String> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "dtCreated");

    Page<Workspace> findAllByOwnerId(String ownerId, Pageable pageable);

}
