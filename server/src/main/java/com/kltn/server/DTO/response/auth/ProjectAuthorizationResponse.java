package com.kltn.server.DTO.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.DTO.response.project.ProjectResponse;

public class ProjectAuthorizationResponse {
    @JsonProperty("project_authorization_token")
    private String authorizationProject;
    @JsonProperty("project")
    private ProjectResponse project;

    private ProjectAuthorizationResponse() {
    }

    private ProjectAuthorizationResponse(String authorizationProject, ProjectResponse project) {
        this.authorizationProject = authorizationProject;
        this.project = project;

    }

    public static ProjectAuthorizationResponseBuilder builder() {
        return new ProjectAuthorizationResponseBuilder();
    }

    public static class ProjectAuthorizationResponseBuilder {
        private String authorizationProject;
        private ProjectResponse project;

        public ProjectAuthorizationResponseBuilder authorizationProject(String authorizationProject) {
            this.authorizationProject = authorizationProject;
            return this;
        }

        public ProjectAuthorizationResponseBuilder project(ProjectResponse project) {
            this.project = project;
            return this;
        }

        public ProjectAuthorizationResponse build() {
            return new ProjectAuthorizationResponse(authorizationProject, project);
        }
    }

}
