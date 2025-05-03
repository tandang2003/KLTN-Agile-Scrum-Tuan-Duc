package com.kltn.server.DTO.request.entity.project;

import com.kltn.server.DTO.request.base.TopicRequest;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ProjectCreationRequest(@NotEmpty String name,
                                     String description,
                                     @NotEmpty String workspaceId,
                                     @NotEmpty String userId,
                                     List<TopicRequest> tags) {
    public static class ProjectCreationRequestBuilder {
        private String name;
        private String description;
        private String workspaceId;
        private String userId;
        private List<TopicRequest> tags;


        public ProjectCreationRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectCreationRequestBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectCreationRequestBuilder workspaceId(String workspaceId) {
            this.workspaceId = workspaceId;
            return this;
        }

        public ProjectCreationRequestBuilder tags(List<TopicRequest> tags) {
            this.tags = tags;
            return this;
        }

        public ProjectCreationRequestBuilder tag(TopicRequest tag) {
            this.tags.add(tag);
            return this;
        }

        public ProjectCreationRequestBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public ProjectCreationRequest build() {
            return new ProjectCreationRequest(name, description, workspaceId, userId, tags);
        }
    }

    public static ProjectCreationRequestBuilder builder() {

        return new ProjectCreationRequestBuilder();
    }
//getters/setters section

    @Override
    public String name() {
        return name;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public String workspaceId() {
        return workspaceId;
    }

    @Override
    public List<TopicRequest> tags() {
        return tags;
    }
}
