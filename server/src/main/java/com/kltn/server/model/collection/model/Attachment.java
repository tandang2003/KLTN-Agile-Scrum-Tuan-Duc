package com.kltn.server.model.collection.model;

import jakarta.persistence.PrePersist;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

public class Attachment {
    private ObjectId id;

    @Field
    private String resourceId;


    public String getResourceId() {
        return resourceId;
    }

    private Attachment(AttachmentBuilder builder) {
        this.resourceId = builder.resourceId;
        this.id = builder.id;
    }

    public static AttachmentBuilder builder() {
        return new AttachmentBuilder();
    }

    public static class AttachmentBuilder {
        private String resourceId;
        private ObjectId id;

        public AttachmentBuilder resourceId(String resourceId) {
            this.resourceId = resourceId;
            return this;
        }

        public AttachmentBuilder id(ObjectId id) {
            this.id = id;
            return this;
        }

        public void prePersist() {
            if (this.id == null) {
                this.id = new ObjectId();
            }
        }

        public Attachment build() {
            prePersist();
            return new Attachment(this);
        }
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }
}
