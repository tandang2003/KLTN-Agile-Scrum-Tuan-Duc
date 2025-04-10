package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Attachment {
    @Field
    private String resourceId;

    public String getResourceId() {
        return resourceId;
    }

    private Attachment(AttachmentBuilder builder) {
        this.resourceId = builder.resourceId;
    }

    public static AttachmentBuilder builder() {
        return new AttachmentBuilder();
    }

    public static class AttachmentBuilder {
        private String resourceId;

        public AttachmentBuilder resourceId(String resourceId) {
            this.resourceId = resourceId;
            return this;
        }

        public Attachment build() {
            return new Attachment(this);
        }
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }
}
