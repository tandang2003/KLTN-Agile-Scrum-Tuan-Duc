package com.kltn.server.DTO.response.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.DTO.response.project.ProjectResponse;

import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class WorkspaceAuthorizationResponse {
    @JsonProperty("project_authorization_token")
    private String authorizationProject;
    @JsonProperty("project_id")
    private String projectId;
    @JsonProperty("project_ids")
    private List<String> projectIds;

//    @JsonProperty("project")
//    private ProjectResponse project;

    private WorkspaceAuthorizationResponse() {
    }

    private WorkspaceAuthorizationResponse(String authorizationProject, String projectId, List<String> projectIds) {
        this.authorizationProject = authorizationProject;
        this.projectId = projectId;
        this.projectIds = projectIds;
    }

    public static ProjectAuthorizationResponseBuilder builder() {
        return new ProjectAuthorizationResponseBuilder();
    }

    public static class ProjectAuthorizationResponseBuilder {
        private String authorizationProject;
        private String projectId;
        private List<String> projectIds;


        public ProjectAuthorizationResponseBuilder authorizationProject(String authorizationProject) {
            this.authorizationProject = authorizationProject;
            return this;
        }

        public ProjectAuthorizationResponseBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }
        public ProjectAuthorizationResponseBuilder projectIds(List<String> projectIds) {
            this.projectIds = projectIds;
            return this;
        }


        public WorkspaceAuthorizationResponse build() {
            return new WorkspaceAuthorizationResponse(authorizationProject, projectId, projectIds);
        }
    }

    public String getAuthorizationProject() {
        return authorizationProject;
    }

    public void setAuthorizationProject(String authorizationProject) {
        this.authorizationProject = authorizationProject;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public List<String> getProjectIds() {
        return projectIds;
    }

    public void setProjectIds(List<String> projectIds) {
        this.projectIds = projectIds;
    }
}
