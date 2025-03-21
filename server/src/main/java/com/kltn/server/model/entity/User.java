package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "users")
public class User extends BaseEntity {
    private String name;
    private String password;
    private String email;
    private String uniId;
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


    public User() {
        super();
    }


    public static UserBuilder builder() {
        return new UserBuilder();
    }

    private User(UserBuilder builder) {
        super(builder);
        this.name = builder.name;
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

    public static class UserBuilder extends BaseBuilder<User, UserBuilder> {
        private String name;
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

        private UserBuilder() {
            super();
        }

        @Override
        protected UserBuilder self() {
            return this;
        }

        @Override
        public User build() {
            return new User(this);
        }


        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder uniId(String uniId) {
            this.uniId = uniId;
            return this;
        }

        public UserBuilder uniPassword(String uniPassword) {
            this.uniPassword = uniPassword;
            return this;
        }

        public UserBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public UserBuilder project(List<Project> projects) {
            this.projects = projects;
            return this;
        }

        public UserBuilder assignedTasks(Set<Task> assignedTasks) {
            this.assignedTasks = assignedTasks;
            return this;
        }

        public UserBuilder reviewedTasks(Set<Task> reviewedTasks) {
            this.reviewedTasks = reviewedTasks;
            return this;
        }

        public UserBuilder workspace(List<Workspace> workspace) {
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

    public String getPassword() {
        return password;
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

    public void setReviewedTasks(Set<Task> reviewedTasks) {
        this.reviewedTasks = reviewedTasks;
    }
}


