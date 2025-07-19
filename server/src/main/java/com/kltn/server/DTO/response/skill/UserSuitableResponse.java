package com.kltn.server.DTO.response.skill;

import java.util.ArrayList;
import java.util.List;

public record UserSuitableResponse(String id, String name, List<PersonalSkillResponse> skills) {
  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private String id;
    private String name;
    private List<PersonalSkillResponse> skills = new ArrayList<>();

    public Builder id(String id) {
      this.id = id;
      return this;
    }

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder skills(List<PersonalSkillResponse> skills) {
      this.skills = skills;
      return this;
    }

    public Builder addSkill(PersonalSkillResponse skill) {
      this.skills.add(skill);
      return this;
    }

    public UserSuitableResponse build() {
      return new UserSuitableResponse(id, name, skills);
    }
  }
}
