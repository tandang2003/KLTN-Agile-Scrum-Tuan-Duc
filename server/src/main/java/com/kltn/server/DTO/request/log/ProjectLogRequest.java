package com.kltn.server.DTO.request.log;

import com.kltn.server.model.collection.model.Topic;

import java.util.List;

public record ProjectLogRequest(String projectId, String description,
                                List<Topic> tags) {

    public static class ProjectLogRequestBuilder {
        private String projectId;
        private String description;
        private List<Topic> tags;

        public ProjectLogRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public ProjectLogRequestBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectLogRequestBuilder tags(List<Topic> tags) {
            this.tags = tags;
            return this;
        }

        public ProjectLogRequest build() {
            return new ProjectLogRequest(projectId, description, tags);
        }
    }

    public static ProjectLogRequestBuilder builder() {
        return new ProjectLogRequestBuilder();
    }

    @Override
    public String projectId() {
        return projectId;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public List<Topic> tags() {
        return tags;
    }
}
