package com.kltn.server.DTO.request.base;

import com.fasterxml.jackson.annotation.JsonInclude;

//@JsonInclude(JsonInclude.Include.NON_NULL)
public record TopicRequest(String name, String color) {

    public static class TopicRequestBuilder {
        private String name;
        private String color;


        public TopicRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public TopicRequestBuilder color(String color) {
            this.color = color;
            return this;
        }

        public TopicRequest build() {
            return new TopicRequest(name, color);
        }
    }

    public static TopicRequestBuilder builder() {
        return new TopicRequestBuilder();
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
