package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Skill;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.entity.embeddedKey.PersonalSkillId;
import jakarta.persistence.*;

@Entity
public class PersonalSkill {
  @EmbeddedId
  private PersonalSkillId id;
  @MapsId("skillId")
  @ManyToOne(optional = false)
  @JoinColumn(name = "skill_id")
  private Skill skill;
  @MapsId("personalId")
  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  private User user;
  private int proficiency;

  public PersonalSkill() {
  }

  public PersonalSkill(PersonalSkillBuilder builder) {
    this.id = builder.id;
    this.skill = builder.skill;
    this.user = builder.user;
    this.proficiency = builder.proficiency; // Default proficiency value
  }

  public static PersonalSkillBuilder builder() {
    return new PersonalSkillBuilder();
  }

  public static class PersonalSkillBuilder {
    private PersonalSkillId id;
    private Skill skill;
    private User user;
    private int proficiency; // Default proficiency value

    public PersonalSkillBuilder id(PersonalSkillId id) {
      this.id = id;
      return this;
    }

    public PersonalSkillBuilder skill(Skill skill) {
      this.skill = skill;
      return this;
    }

    public PersonalSkillBuilder proficiency(int proficiency) {
      this.proficiency = proficiency;
      return this;
    }

    public PersonalSkillBuilder user(User user) {
      this.user = user;
      return this;
    }

    public PersonalSkill build() {
      return new PersonalSkill(this);
    }
  }

  public PersonalSkillId getId() {
    return id;
  }

  public void setId(PersonalSkillId id) {
    this.id = id;
  }

  public Skill getSkill() {
    return skill;
  }

  public void setSkill(Skill skill) {
    this.skill = skill;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public int getProficiency() {
    return proficiency;
  }

  public void setProficiency(int proficiency) {
    this.proficiency = proficiency;
  }
}
