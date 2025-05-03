package com.kltn.server.DTO.response.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.base.TopicResponse;

import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProjectResponse(String id, String name,
                              List<TopicResponse> topics) {

    public static class ProjectResponseBuilder {
        private String id;
        private String name;
        private List<TopicResponse> topics;

        public ProjectResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ProjectResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectResponseBuilder topics(List<TopicResponse> topics) {
            this.topics = topics;
            return this;
        }

        public ProjectResponse build() {
            return new ProjectResponse(id, name, topics);
        }
    }

    public static ProjectResponseBuilder builder() {
        return new ProjectResponseBuilder();
    }

}
