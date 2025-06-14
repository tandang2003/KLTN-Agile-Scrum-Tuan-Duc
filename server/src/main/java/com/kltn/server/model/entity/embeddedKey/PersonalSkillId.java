package com.kltn.server.model.entity.embeddedKey;

import jakarta.persistence.Column;

public class PersonalSkillId {
  @Column(name="user_id")
  private String personalId;
  @Column(name="skill_id")
  private String skillId;

  public PersonalSkillId() {
  }

  public PersonalSkillId(PersonalSkillIdBuilder builder) {
    this.personalId = builder.personalId;
    this.skillId = builder.skillId;
  }

  public static PersonalSkillIdBuilder builder() {
    return new PersonalSkillIdBuilder();
  }

  public static class PersonalSkillIdBuilder {
    private String personalId;
    private String skillId;

    public PersonalSkillIdBuilder personalId(String personalId) {
      this.personalId = personalId;
      return this;
    }

    public PersonalSkillIdBuilder skillId(String skillId) {
      this.skillId = skillId;
      return this;
    }

    public PersonalSkillId build() {
      return new PersonalSkillId(this);
    }
  }


  public String getPersonalId() {
    return personalId;
  }

  public void setPersonalId(String personalId) {
    this.personalId = personalId;
  }

  public String getSkillId() {
    return skillId;
  }

  public void setSkillId(String skillId) {
    this.skillId = skillId;
  }


  }
