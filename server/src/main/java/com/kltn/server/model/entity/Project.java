package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    //    @ManyToOne
//    @JoinColumn(name = "workspace_id")
//    @ManyToMany(mappedBy = "projects")
    @ManyToOne
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;
    @ManyToMany(mappedBy = "projects")
    private Set<User> users;
    @OneToMany(mappedBy = "project")
    private List<Sprint> sprints;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    public Project(ProjectEntityBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.description = builder.description;
        this.workspace = builder.workspace;
        this.users = builder.users;
        this.sprints = builder.sprints;
    }

    public Project() {

    }


    public static class ProjectEntityBuilder extends BaseEntityBuilder<Project, ProjectEntityBuilder> {
        private String name;
        private String description;
        private Workspace workspace;
        private Set<User> users;
        private List<Sprint> sprints;

        @Override
        protected ProjectEntityBuilder self() {
            return this;
        }

        @Override
        public Project build() {
            return new Project(this);
        }

        public ProjectEntityBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectEntityBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectEntityBuilder workspace(Workspace workspace) {
            this.workspace = workspace;
            return this;
        }

        public ProjectEntityBuilder member(Set<User> users) {
            this.users = users;
            return this;
        }

        public ProjectEntityBuilder sprints(List<Sprint> sprints) {
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
