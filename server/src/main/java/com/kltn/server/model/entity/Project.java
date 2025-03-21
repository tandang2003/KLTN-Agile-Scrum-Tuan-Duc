package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;
    @ManyToMany(mappedBy = "projects")
    private Set<User> users;
    @OneToMany(mappedBy = "project")
    private List<Sprint> sprints;

    public Project(ProjectBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.description = builder.description;
        this.workspace = builder.workspace;
        this.users = builder.users;
        this.sprints = builder.sprints;
    }

    public Project() {

    }


    public static class ProjectBuilder extends BaseBuilder<Project, ProjectBuilder> {
        private String name;
        private String description;
        private Workspace workspace;
        private Set<User> users;
        private List<Sprint> sprints;

        @Override
        protected ProjectBuilder self() {
            return this;
        }

        @Override
        public Project build() {
            return new Project(this);
        }

        public ProjectBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectBuilder workspace(Workspace workspace) {
            this.workspace = workspace;
            return this;
        }

        public ProjectBuilder member(Set<User> users) {
            this.users = users;
            return this;
        }

        public ProjectBuilder sprints(List<Sprint> sprints) {
            this.sprints = sprints;
            return this;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public Set<User> getMember() {
        return users;
    }

    public void setMember(Set<User> users) {
        this.users = users;
    }

    public List<Sprint> getSprints() {
        return sprints;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }
}
