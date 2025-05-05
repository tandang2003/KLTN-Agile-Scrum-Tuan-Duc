package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @OneToMany(mappedBy = "project")
    private List<Sprint> sprints;
    @OneToMany(mappedBy = "project")
    private List<WorkspacesUsersProjects> workspacesUserProjects;

    public Project(ProjectEntityBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.description = builder.description;
        this.sprints = builder.sprints;
    }

    public Project() {

    }



    public static class ProjectEntityBuilder extends BaseEntityBuilder<Project, ProjectEntityBuilder> {
        private String name;
        private String description;
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

    public List<Sprint> getSprints() {
        return sprints;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }

    public List<WorkspacesUsersProjects> getWorkspacesUserProjects() {
        return workspacesUserProjects;
    }

    public void setWorkspacesUserProjects(List<WorkspacesUsersProjects> workspacesUserProjects) {
        this.workspacesUserProjects = workspacesUserProjects;
    }
    @Transient
    public Workspace getWorkspace() {
        return workspacesUserProjects == null
                || workspacesUserProjects.isEmpty() ? null :
                workspacesUserProjects.get(0).getWorkspace();
    }

    @Transient
    public List<User> getMembers() {
        return workspacesUserProjects.stream()
                .map(WorkspacesUsersProjects::getUser)
                .toList();
    }
    @Transient
    public Role getMemberRole(String userId) {
        return workspacesUserProjects.stream()
                .filter(
                        workspacesUsersProjects ->
                                workspacesUsersProjects.getUser().getId().equals(userId))
                .map(WorkspacesUsersProjects::getRole)
                .findFirst()
                .orElse(null);
    }

}
