package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    @OneToMany(mappedBy = "role")
    private List<User> user;
    @ManyToMany
    @JoinTable(name = "roles_permissions",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    private Set<Permission> roles;

    public Role(RoleEntityBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.description = builder.description;
        this.user = builder.user;
    }

    public Role() {
    }

    public static RoleEntityBuilder builder() {
        return new RoleEntityBuilder();
    }

    public static class RoleEntityBuilder extends BaseEntityBuilder<Role, RoleEntityBuilder> {
        private String name;
        private String description;
        private List<User> user;

        public Role build() {
            return new Role(this);
        }


        @Override
        protected RoleEntityBuilder self() {
            return this;
        }

        public RoleEntityBuilder name(String name) {
            this.name = name;
            return this;
        }

        public RoleEntityBuilder description(String description) {
            this.description = description;
            return this;
        }

        public RoleEntityBuilder user(List<User> user) {
            this.user = user;
            return this;
        }
    }
}
