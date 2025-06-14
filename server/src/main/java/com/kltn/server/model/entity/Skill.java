package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill extends BaseEntity {
  private String name;

  public Skill() {
  }

  public Skill(SkillBuilder builder) {
    super(builder);
    this.name = builder.name;
  }

  public static SkillBuilder builder() {
    return new SkillBuilder();
  }

  public static class SkillBuilder extends BaseEntityBuilder<Skill, SkillBuilder> {
    private String name;

    @Override
    protected SkillBuilder self() {
      return this;
    }

    @Override
    public Skill build() {
      return new Skill(this);
    }

    public SkillBuilder name(String name) {
      this.name = name;
      return this;
    }
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
