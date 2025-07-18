package com.kltn.server.DTO.response.user;

import java.time.Instant;

public record UserResponseAll(String id,
                              String name,
                              String email,
                              String uniId,
                              String className,
                              String role,
                              Instant createdAt,
                              Instant modifiedAt,
                              Instant deletedAt,
                              String createdBy,
                              String modifiedBy,
                              String deletedBy) {
  public UserResponseAll(UserResponseAllBuilder b) {
    this(b.id, b.name, b.email, b.uniId, b.className, b.role, b.createdAt, b.modifiedAt, b.deletedAt, b.createdBy,
         b.modifiedBy, b.deletedBy);
  }

  public static UserResponseAllBuilder builder() {
    return new UserResponseAllBuilder();
  }

  public static class UserResponseAllBuilder {
    private String id;
    private String name;
    private String email;
    private String uniId;
    private String className;
    private String role;
    private Instant createdAt;
    private Instant modifiedAt;
    private Instant deletedAt;
    private String createdBy;
    private String modifiedBy;
    private String deletedBy;

    public UserResponseAllBuilder id(String id) {
      this.id = id;
      return this;
    }

    public UserResponseAllBuilder name(String name) {
      this.name = name;
      return this;
    }

    public UserResponseAllBuilder email(String email) {
      this.email = email;
      return this;
    }

    public UserResponseAllBuilder uniId(String uniId) {
      this.uniId = uniId;
      return this;
    }

    public UserResponseAllBuilder className(String className) {
      this.className = className;
      return this;
    }

    public UserResponseAllBuilder role(String role) {
      this.role = role;
      return this;
    }

    public UserResponseAllBuilder createdAt(Instant createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public UserResponseAllBuilder modifiedAt(Instant modifiedAt) {
      this.modifiedAt = modifiedAt;
      return this;
    }

    public UserResponseAllBuilder deletedAt(Instant deletedAt) {
      this.deletedAt = deletedAt;
      return this;
    }

    public UserResponseAllBuilder createdBy(String createdBy) {
      this.createdBy = createdBy;
      return this;
    }

    public UserResponseAllBuilder modifiedBy(String modifiedBy) {
      this.modifiedBy = modifiedBy;
      return this;
    }

    public UserResponseAllBuilder deletedBy(String deletedBy) {
      this.deletedBy = deletedBy;
      return this;
    }

    public UserResponseAllBuilder build() {
      return this;
    }
  }
}
