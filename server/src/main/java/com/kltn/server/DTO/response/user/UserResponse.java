package com.kltn.server.DTO.response.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.Issue;

import java.util.List;
import java.util.Set;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public record   UserResponse(String id, String name, String email, String uniId, String uniPassword, String className,
                           String role, List<ProjectResponse> projects,
                           Set<Issue> assignedTasks,
                           Set<Issue> reviewedTasks,
                           Boolean alive,
                           List<WorkspaceResponse> workspaces
) {
    public UserResponse(UserResponseBuilder b) {
        this(b.getId(), b.name, b.email, b.uniId, b.uniPassword, b.className, b.role,
                b.projects, b.assignedTasks, b.reviewedTasks, b.alive, b.workspaces);
    }

    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder extends BaseEntity.BaseEntityBuilder<UserResponse, UserResponseBuilder> {
        private String className;
        private String name;
        private String email;
        private String uniId;
        private String uniPassword;
        private String role;
        private List<ProjectResponse> projects;
        private Set<Issue> assignedTasks;
        private Set<Issue> reviewedTasks;
        private Boolean alive;
        private List<WorkspaceResponse> workspaces;

        public UserResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserResponseBuilder workspaces(List<WorkspaceResponse> workspaces) {
            this.workspaces = workspaces;
            return this;
        }


        public UserResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserResponseBuilder uniId(String uniId) {
            this.uniId = uniId;
            return this;
        }

        public UserResponseBuilder className(String className) {
            this.className = className;
            return this;
        }

        public UserResponseBuilder uniPassword(String uniPassword) {
            this.uniPassword = uniPassword;
            return this;
        }

        public UserResponseBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserResponseBuilder project(List<ProjectResponse> projects) {
            this.projects = projects;
            return this;
        }

        public UserResponseBuilder assignedTasks(Set<Issue> assignedTasks) {
            this.assignedTasks = assignedTasks;
            return this;
        }

        public UserResponseBuilder reviewedTasks(Set<Issue> reviewedTasks) {
            this.reviewedTasks = reviewedTasks;
            return this;
        }

        public UserResponseBuilder workspace(List<WorkspaceResponse> workspaces) {
            this.workspaces = workspaces;
            return this;
        }

        public UserResponseBuilder alive(Boolean alive) {
            this.alive = alive;
            return this;
        }

        @Override
        protected UserResponseBuilder self() {
            return this;
        }

        @Override
        public UserResponse build() {
            return new UserResponse(this);
        }
    }
//getter/setter section
    @Override
    public String id() {
        return id;
    }

    @Override
    public String name() {
        return name;
    }

    @Override
    public String email() {
        return email;
    }

    @Override
    public String uniId() {
        return uniId;
    }

    @Override
    public String uniPassword() {
        return uniPassword;
    }

    @Override
    public String className() {
        return className;
    }

    @Override
    public String role() {
        return role;
    }

    @Override
    public List<ProjectResponse> projects() {
        return projects;
    }

    @Override
    public Set<Issue> assignedTasks() {
        return assignedTasks;
    }

    @Override
    public Set<Issue> reviewedTasks() {
        return reviewedTasks;
    }

    @Override
    public Boolean alive() {
        return alive;
    }

    @Override
    public List<WorkspaceResponse> workspaces() {
        return workspaces;
    }
}
