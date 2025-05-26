package com.kltn.server.DTO.response.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.bson.types.ObjectId;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TopicResponse(ObjectId id, String name, String color) {

    public static class TopicResponseBuilder {
        private ObjectId id;
        private String name;
        private String color;

        public TopicResponseBuilder id(ObjectId id) {
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
    public ObjectId id() {
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
