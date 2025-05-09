package com.kltn.server.DTO.response.base;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TopicResponse(String id, String name, String color) {

    public static class TopicResponseBuilder {
        private String id;
        private String name;
        private String color;

        public TopicResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TopicResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public TopicResponseBuilder color(String color) {
            this.color = color;
            return this;
        }

        public TopicResponse build() {
            return new TopicResponse(id, name, color);
        }
    }

    public static TopicResponseBuilder builder() {
        return new TopicResponseBuilder();
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public String name() {
        return name;
    }

    @Override
    public String color() {
        return color;
    }
}
