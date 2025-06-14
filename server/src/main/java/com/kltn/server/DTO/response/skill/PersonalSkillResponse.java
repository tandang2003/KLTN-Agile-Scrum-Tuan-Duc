package com.kltn.server.DTO.response.skill;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record PersonalSkillResponse(String skillName,
                                    int proficiency) {
  public PersonalSkillResponseBuilder builder() {
    return new PersonalSkillResponseBuilder();
  }

  public static class PersonalSkillResponseBuilder {
    private String skillName;
    private int proficiency;

    public PersonalSkillResponseBuilder skillName(String skillName) {
      this.skillName = skillName;
      return this;
    }

    public PersonalSkillResponseBuilder proficiency(int proficiency) {
      this.proficiency = proficiency;
      return this;
    }

    public PersonalSkillResponse build() {
      return new PersonalSkillResponse(skillName, proficiency);
    }
  }


}

