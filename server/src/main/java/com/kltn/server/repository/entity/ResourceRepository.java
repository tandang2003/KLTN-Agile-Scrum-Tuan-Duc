package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, String> {
}
