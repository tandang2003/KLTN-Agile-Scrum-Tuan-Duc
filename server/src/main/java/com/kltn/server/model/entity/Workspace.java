package com.kltn.server.model.entity;


import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "workspaces")
public class Workspace extends BaseEntity {
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "workspace")
    private List<Project> projects;

    private Workspace(WorkspaceBuilder workspaceBuilder) {
        super(workspaceBuilder);
        this.name = workspaceBuilder.name;
        this.description = workspaceBuilder.description;
        this.owner = workspaceBuilder.owner;
        this.projects = workspaceBuilder.projects;
    }

    public Workspace() {
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Workspace workspace)) return false;
        if (!super.equals(o)) return false;
        return Objects.equals(name, workspace.name) && Objects.equals(description, workspace.description) && Objects.equals(owner, workspace.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, description, owner);
    }

    public static class WorkspaceBuilder extends BaseBuilder<Workspace, WorkspaceBuilder> {
        private String name;
        private String description;
        private User owner;
        private List<Project> projects;

        @Override
        protected WorkspaceBuilder self() {
            return this;
        }

        @Override
        public Workspace build() {
            return new Workspace(this);
        }

        public WorkspaceBuilder name(String name) {
            this.name = name;
            return this;
        }

        public WorkspaceBuilder description(String description) {
            this.description = description;
            return this;
        }

        public WorkspaceBuilder owner(User owner) {
            this.owner = owner;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
