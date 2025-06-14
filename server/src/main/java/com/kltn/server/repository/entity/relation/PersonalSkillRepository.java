package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.PersonalSkillId;
import com.kltn.server.model.entity.relationship.PersonalSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalSkillRepository  extends JpaRepository<PersonalSkill, PersonalSkillId> {
  Optional<List<PersonalSkill>> findByUser(User user);
}
