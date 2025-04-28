package com.kltn.server.DTO.response.project;

public record ProjectResponse(String id, String name) {

    public static class ProjectResponseBuilder {
        private String id;
        private String name;

        public ProjectResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ProjectResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectResponse build() {
            return new ProjectResponse(id, name);
        }
    }

    public static ProjectResponseBuilder builder() {
        return new ProjectResponseBuilder();
    }

}
