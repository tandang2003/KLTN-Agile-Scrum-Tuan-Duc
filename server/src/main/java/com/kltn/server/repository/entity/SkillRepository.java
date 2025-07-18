package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Skill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, String> {
  boolean existsByName(String name);

  Optional<Skill> findByName(String name);

  List<Skill> findAll();
}
