package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.response.skill.PersonalSkillResponse;
import com.kltn.server.model.entity.relationship.PersonalSkill;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {

  @Mappings({@Mapping(target = "skillName",
                      source = "skill.skill.name"),
             @Mapping(target = "proficiency",
                      source = "skill.proficiency")})
  @BeanMapping(ignoreByDefault = true)
  @Named("toPersonalSkillResponse")
  PersonalSkillResponse toPersonalSkillResponse(PersonalSkill skill);

  @IterableMapping(qualifiedByName = "toPersonalSkillResponse")
  List<PersonalSkillResponse> toListPersonalSkillResponse(List<PersonalSkill> skills);

}
