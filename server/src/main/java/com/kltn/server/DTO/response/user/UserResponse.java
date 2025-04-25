package com.kltn.server.DTO.response.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.*;

import java.util.List;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record UserResponse(String id, String name, String email, String uniId, String uniPassword, String className,
                           String role, List<WorkspaceResponse> workspaces, List<Project> projects,
                           Set<Task> assignedTasks,
                           Set<Task> reviewedTasks) {
    public UserResponse(UserResponseBuilder b) {
        this(b.getId(), b.name, b.email, b.uniId, b.uniPassword, b.className, b.role, b.workspace, b.projects, b.assignedTasks, b.reviewedTasks);
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
        private List<WorkspaceResponse> workspace;
        private List<Project> projects;
        private Set<Task> assignedTasks;
        private Set<Task> reviewedTasks;

        public UserResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserResponseBuilder name(String name) {
            this.name = name;
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

        public UserResponseBuilder project(List<Project> projects) {
            this.projects = projects;
            return this;
        }

        public UserResponseBuilder assignedTasks(Set<Task> assignedTasks) {
            this.assignedTasks = assignedTasks;
            return this;
        }

        public UserResponseBuilder reviewedTasks(Set<Task> reviewedTasks) {
            this.reviewedTasks = reviewedTasks;
            return this;
        }

        public UserResponseBuilder workspace(List<WorkspaceResponse> workspace) {
            this.workspace = workspace;
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

}
