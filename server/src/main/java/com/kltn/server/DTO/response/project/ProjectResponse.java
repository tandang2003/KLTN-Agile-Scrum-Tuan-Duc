package com.kltn.server.DTO.response.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProjectResponse(
  String id, String name, String description, Instant start, Instant end,
                              List<TopicResponse> topics,
                              List<SprintResponse> sprints,
                              Instant createdAt,
                              Instant updatedAt,
  SprintResponse currentSprint
  ) {

    public static class ProjectResponseBuilder {
        private String id;
        private String name;
        private List<TopicResponse> topics;
        private String description;
        private Instant start;
        private Instant end;
        private List<SprintResponse> sprints;
        private Instant createdAt;
        private Instant updatedAt;
        private SprintResponse currentSprint;


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

        public ProjectResponseBuilder createAt(Instant createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ProjectResponseBuilder updateAt(Instant updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ProjectResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectResponseBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public ProjectResponseBuilder end(Instant end) {
            this.end = end;
            return this;
        }

        public ProjectResponseBuilder sprints(List<SprintResponse> sprints) {
            this.sprints = sprints;
            return this;
        }
        public ProjectResponseBuilder currentSprint(SprintResponse currentSprint) {
            this.currentSprint = currentSprint;
            return this;
        }


        public ProjectResponse build() {
            return new ProjectResponse(id, name, description, start, end, topics, sprints, createdAt, updatedAt,currentSprint);
        }
    }

    public static ProjectResponseBuilder builder() {
        return new ProjectResponseBuilder();
    }

}
