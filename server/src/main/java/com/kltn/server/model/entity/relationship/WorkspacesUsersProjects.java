package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class WorkspacesUsersProjects implements Serializable {
    @EmbeddedId
    private WorkspacesUsersId id;

    @MapsId("workspaceId")
    @ManyToOne(optional = false)
    private Workspace workspace;
    //@Id
    @MapsId("userId")
    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = true)
    private Project project;

    @ManyToOne(optional = true)
    private Role role;

    private boolean inProject;
    private boolean inWorkspace;

    private WorkspacesUsersProjects(WorkspacesUsersProjectsBuilder builder) {
        super();
        this.workspace = builder.workspace;
        this.user = builder.user;
        this.project = builder.project;
        this.role = builder.role;
        this.id = builder.id;
        this.inProject = builder.inProject;
        this.inWorkspace = builder.inWorkspace;

    }

    public WorkspacesUsersProjects() {
        this.project = null;
        this.role = null;
        this.user = null;
        this.workspace = null;
    }

    public static WorkspacesUsersProjectsBuilder builder() {
        return new WorkspacesUsersProjectsBuilder();
    }

    public static class WorkspacesUsersProjectsBuilder {
        private Workspace workspace;
        private User user;
        private Project project;
        private Role role;
        private WorkspacesUsersId id;
        private boolean inProject;
        private boolean inWorkspace;

        public WorkspacesUsersProjectsBuilder inProject(boolean inProject) {
            this.inProject = inProject;
            return this;
        }

        public WorkspacesUsersProjectsBuilder inWorkspace(boolean inWorkspace) {
            this.inWorkspace = inWorkspace;
            return this;
        }

        public WorkspacesUsersProjectsBuilder id(WorkspacesUsersId id) {
            this.id = id;
            return this;
        }

        public WorkspacesUsersProjectsBuilder workspace(Workspace workspace) {
            this.workspace = workspace;
            return this;
        }

        public WorkspacesUsersProjectsBuilder user(User user) {
            this.user = user;
            return this;
        }

        public WorkspacesUsersProjectsBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public WorkspacesUsersProjectsBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public WorkspacesUsersProjects build() {
            return new WorkspacesUsersProjects(this);
        }
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public User getUser() {
        return user;
    }

    public Project getProject() {
        return project;
    }

    public Role getRole() {
        return role;
    }

    public WorkspacesUsersId getId() {
        return id;
    }

    public void setId(WorkspacesUsersId id) {
        this.id = id;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isInProject() {
        return inProject;
    }

    public void setInProject(boolean inProject) {
        this.inProject = inProject;
    }

    public boolean isInWorkspace() {
        return inWorkspace;
    }

    public void setInWorkspace(boolean inWorkspace) {
        this.inWorkspace = inWorkspace;
    }
}
