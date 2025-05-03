package com.kltn.server.DTO.request.entity.project;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ProjectInvitationRequest(@NotEmpty String projectId,
                                       @NotEmpty List<String> userId) {
    public static class ProjectInvitionRequestBuilder {
        private String projectId;
        private List<String> userId;

        public ProjectInvitionRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public ProjectInvitionRequestBuilder userId(List<String> userId) {
            this.userId = userId;
            return this;
        }

        public ProjectInvitationRequest build() {
            return new ProjectInvitationRequest(projectId, userId);
        }
    }

    public static ProjectInvitionRequestBuilder builder() {
        return new ProjectInvitionRequestBuilder();
    }

    @Override
    public String projectId() {
        return projectId;
    }

    @Override
    public List<String> userId() {
        return userId;
    }

}
