package com.kltn.server.model.entity;


import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "workspaces")
public class Workspace extends BaseEntity {
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private int sprintNum;
    private int timePerSprint;
    private Instant start;
    private Instant end;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
    @OneToMany
    @JoinColumn(name = "workspace_id")
    private List<WorkspacesUsersProjects> workspacesUserProjects;

    private Workspace(WorkspaceEntityBuilder workspaceBuilder) {
        super(workspaceBuilder);
        this.name = workspaceBuilder.name;
        this.description = workspaceBuilder.description;
        this.owner = workspaceBuilder.owner;
        this.sprintNum = workspaceBuilder.sprintNum;
        this.timePerSprint = workspaceBuilder.timePerSprint;
        this.start = workspaceBuilder.start;
        this.end = workspaceBuilder.end;
    }

    public Workspace() {
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Workspace workspace)) return false;
        if (!super.equals(o)) return false;
        return Objects.equals(name, workspace.name) && Objects.equals(description, workspace.description) && Objects.equals(start, workspace.start) && Objects.equals(end, workspace.end) && Objects.equals(owner, workspace.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, description, start, end, owner);
    }

    public static class WorkspaceEntityBuilder extends BaseEntityBuilder<Workspace, WorkspaceEntityBuilder> {
        private String name;
        private String description;
        private User owner;
        private int sprintNum;
        private int timePerSprint;
        private Instant start;
        private Instant end;

        @Override
        protected WorkspaceEntityBuilder self() {
            return this;
        }

        @Override
        public Workspace build() {
            return new Workspace(this);
        }

        public WorkspaceEntityBuilder name(String name) {
            this.name = name;
            return this;
        }


        public WorkspaceEntityBuilder sprintNum(int sprintNum) {
            this.sprintNum = sprintNum;
            return this;
        }

        public WorkspaceEntityBuilder timePerSprint(int timePerSprint) {
            this.timePerSprint = timePerSprint;
            return this;
        }

        public WorkspaceEntityBuilder description(String description) {
            this.description = description;
            return this;
        }

        public WorkspaceEntityBuilder owner(User owner) {
            this.owner = owner;
            return this;
        }

        public WorkspaceEntityBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public WorkspaceEntityBuilder end(Instant end) {
            this.end = end;
            return this;
        }


    }

    //getter/setter section
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

    public int getSprintNum() {
        return sprintNum;
    }

    public void setSprintNum(int sprintNum) {
        this.sprintNum = sprintNum;
    }

    public int getTimePerSprint() {
        return timePerSprint;
    }

    public void setTimePerSprint(int timePerSprint) {
        this.timePerSprint = timePerSprint;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public List<WorkspacesUsersProjects> getWorkspacesUserProjects() {
        return workspacesUserProjects;
    }
    @Transient
    public void setWorkspacesUserProjects(List<WorkspacesUsersProjects> workspacesUserProjects) {
        this.workspacesUserProjects = workspacesUserProjects;
    }
    @Transient
    public Set<User> getMembers() {
        return workspacesUserProjects.
                stream().
                map(WorkspacesUsersProjects::getUser).
                collect(java.util.stream.Collectors.toSet());
    }
    @Transient
    public Set<Project> getProjects() {
        return workspacesUserProjects.
                stream()
                .map(WorkspacesUsersProjects::getProject).
                collect(java.util.stream.Collectors.toSet());
    }

}
