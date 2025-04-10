package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> getByName(String name);
}
