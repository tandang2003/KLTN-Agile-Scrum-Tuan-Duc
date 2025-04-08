package com.kltn.server.DTO.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.*;

import java.util.List;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserResponse(String id, String name, String email, String uniId, String uniPassword,
                           String role, List<Workspace> workspace, List<Project> projects, Set<Task> assignedTasks,
                           Set<Task> reviewedTasks) {
    public UserResponse(UserResponseBuilder b) {
        this(b.id, b.name, b.email, b.uniId, b.uniPassword, b.role, b.workspace, b.projects, b.assignedTasks, b.reviewedTasks);
    }


    public UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder extends BaseEntity.BaseEntityBuilder<UserResponse, UserResponseBuilder> {
        private String id;
        private String name;
        private String email;
        private String uniId;
        private String uniPassword;
        private String role;
        private List<Workspace> workspace;
        private List<Project> projects;
        private Set<Task> assignedTasks;
        private Set<Task> reviewedTasks;

        public UserResponseBuilder id() {
            this.id = super.id;
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

        public UserResponseBuilder workspace(List<Workspace> workspace) {
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
