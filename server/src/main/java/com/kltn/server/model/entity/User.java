package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {
    private String name;
    private String password;
    private String email;
    private String uniId;
    private String className;
    private String uniPassword;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    @OneToMany(mappedBy = "owner")
    private List<Workspace> workspace;
    @ManyToMany
    @JoinTable(name = "users_projects",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    private List<Project> projects;
    @OneToMany(mappedBy = "assigner")
    private Set<Task> assignedTasks;
    // One user can review multiple tasks
    @OneToMany(mappedBy = "reviewer")
    private Set<Task> reviewedTasks;
    @Transient
    private boolean alive;


    public User() {
        super();
    }


    public static UserEntityBuilder builder() {
        return new UserEntityBuilder();
    }

    private User(UserEntityBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.className = builder.className;
        this.password = builder.password;
        this.email = builder.email;
        this.uniId = builder.uniId;
        this.uniPassword = builder.uniPassword;
        this.role = builder.role;
        this.projects = builder.projects;
        this.assignedTasks = builder.assignedTasks;
        this.reviewedTasks = builder.reviewedTasks;
        this.workspace = builder.workspace;
    }

    public static class UserEntityBuilder extends BaseEntityBuilder<User, UserEntityBuilder> {
        private String name;
        private String className;
        private String password;
        private String email;
        private String uniId;
        private String uniPassword;
        private Role role;
        private List<Project> projects;
        private List<Workspace> workspace;
        private Set<Task> assignedTasks;
        // One user can review multiple tasks
        private Set<Task> reviewedTasks;

        private UserEntityBuilder() {
            super();
        }

        @Override
        protected UserEntityBuilder self() {
            return this;
        }

        @Override
        public User build() {
            return new User(this);
        }


        public UserEntityBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserEntityBuilder className(String className) {
            this.className = className;
            return this;
        }

        public UserEntityBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserEntityBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserEntityBuilder uniId(String uniId) {
            this.uniId = uniId;
            return this;
        }

        public UserEntityBuilder uniPassword(String uniPassword) {
            this.uniPassword = uniPassword;
            return this;
        }

        public UserEntityBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public UserEntityBuilder project(List<Project> projects) {
            this.projects = projects;
            return this;
        }

        public UserEntityBuilder assignedTasks(Set<Task> assignedTasks) {
            this.assignedTasks = assignedTasks;
            return this;
        }

        public UserEntityBuilder reviewedTasks(Set<Task> reviewedTasks) {
            this.reviewedTasks = reviewedTasks;
            return this;
        }

        public UserEntityBuilder workspace(List<Workspace> workspace) {
            this.workspace = workspace;
            return this;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        // Convert role permissions to authorities
        Collection<GrantedAuthority> authorities = new ArrayList<>(
                role.getPermissions().stream()
                        .map(p -> new SimpleGrantedAuthority(p.getName()))
                        .toList()
        );

        // Add role with "ROLE_" prefix
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUniId() {
        return uniId;
    }

    public void setUniId(String uniId) {
        this.uniId = uniId;
    }

    public String getUniPassword() {
        return uniPassword;
    }

    public void setUniPassword(String uniPassword) {
        this.uniPassword = uniPassword;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Workspace> getWorkspace() {
        return workspace;
    }

    public void setWorkspace(List<Workspace> workspace) {
        this.workspace = workspace;
    }

    public List<Project> getProject() {
        return projects;
    }

    public void setProject(List<Project> projects) {
        this.projects = projects;
    }

    public Set<Task> getAssignedTasks() {
        return assignedTasks;
    }

    public void setAssignedTasks(Set<Task> assignedTasks) {
        this.assignedTasks = assignedTasks;
    }

    public Set<Task> getReviewedTasks() {
        return reviewedTasks;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public void setReviewedTasks(Set<Task> reviewedTasks) {

        this.reviewedTasks = reviewedTasks;
    }
}


