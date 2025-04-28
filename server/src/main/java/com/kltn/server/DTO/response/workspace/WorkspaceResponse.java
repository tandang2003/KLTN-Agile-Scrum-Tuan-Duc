package com.kltn.server.DTO.response.workspace;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.user.UserResponse;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public record WorkspaceResponse(String id, String name, String description, int sprintNum, int timePerSprint,
                                UserResponse user, Instant start, Instant end, List<ProjectResponse> projects,
                                Instant createdAt) {
    public static WorkspaceResponseBuilder builder() {
        return new WorkspaceResponseBuilder();
    }

    public static class WorkspaceResponseBuilder {
        String id;
        String name;
        String description;
        int sprintNum;
        int timePerSprint;
        Instant start;
        Instant end;
        UserResponse user;
        List<ProjectResponse> projects;
        Instant createdAt;

        public WorkspaceResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public WorkspaceResponseBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public WorkspaceResponseBuilder createdAt(Instant createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public WorkspaceResponseBuilder end(Instant end) {
            this.end = end;
            return this;
        }

        public WorkspaceResponseBuilder sprintNum(int sprintNum) {
            this.sprintNum = sprintNum;
            return this;
        }

        public WorkspaceResponseBuilder timePerSprint(int timePerSprint) {
            this.timePerSprint = timePerSprint;
            return this;
        }


        public WorkspaceResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public WorkspaceResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public WorkspaceResponseBuilder user(UserResponse user) {
            this.user = user;
            return this;
        }

        public WorkspaceResponseBuilder projects(List<ProjectResponse> projects) {
            this.projects = projects;
            return this;
        }

        public WorkspaceResponse build() {
            return new WorkspaceResponse(id, name, description, sprintNum, timePerSprint, user, start, end, projects, createdAt);
        }
    }

}
