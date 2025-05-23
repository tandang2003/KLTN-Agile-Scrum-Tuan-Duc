package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Tag {
    @Field("_id")
    private String id;
    @Field
    private String name;
    @Field
    private String color;

    private Tag(TagBuilder builder) {
        this.name = builder.name;
        this.color = builder.color;
    }

    public static TagBuilder builder() {
        return new TagBuilder();
    }

    public static class TagBuilder {
        private String name;
        private String color;

        public TagBuilder setName(String name) {
            this.name = name;
            return this;
        }

        public TagBuilder setColor(String color) {
            this.color = color;
            return this;
        }

        public Tag build() {
            return new Tag(this);
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
