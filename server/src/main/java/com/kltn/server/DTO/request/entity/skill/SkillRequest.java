package com.kltn.server.DTO.request.entity.skill;

import jakarta.validation.constraints.NotEmpty;

public class SkillRequest {
  @NotEmpty
  private String skillName;
  private int proficiency;



  public String getSkillName() {
    return skillName;
  }

  public void setSkillName(String skillName) {
    this.skillName = skillName;
  }

  public int getProficiency() {
    return proficiency;
  }

  public void setProficiency(int proficiency) {
    this.proficiency = proficiency;
  }
}
