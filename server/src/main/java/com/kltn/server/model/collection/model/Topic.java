package com.kltn.server.model.collection.model;

import jakarta.persistence.PrePersist;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

public class Topic {
    private ObjectId id;
    @Field
    private String name;
    @Field
    private String color;

    public Topic() {
    }
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = new ObjectId();
        }
    }

    private Topic(TagBuilder builder) {
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

        public Topic build() {
            return new Topic(this);
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

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }
}
