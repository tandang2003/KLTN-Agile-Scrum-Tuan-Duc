package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Project;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, String> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "dtCreated");

    Project findByName(String name);

    Optional<Project> findById(String id);

}
