package com.kltn.server.model.collection.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

public class Attachment {
    private ObjectId id;

    @Field
    private String resourceId;
    @Field
    private String publicId;
    @Field
    private long size;


    public String getResourceId() {
        return resourceId;
    }

    public Attachment() {
    }

    private Attachment(AttachmentBuilder builder) {
        this.resourceId = builder.resourceId;
        this.id = builder.id;
        this.publicId = builder.publicId;
        this.size = builder.size;
    }

    public static AttachmentBuilder builder() {
        return new AttachmentBuilder();
    }

    public static class AttachmentBuilder {
        private String resourceId;
        private ObjectId id;
        private String publicId;
        private long size;

        public AttachmentBuilder resourceId(String resourceId) {
            this.resourceId = resourceId;
            return this;
        }

        public AttachmentBuilder id(ObjectId id) {
            this.id = id;
            return this;
        }

        public AttachmentBuilder publicId(String publicId) {
            this.publicId = publicId;
            return this;
        }

        public AttachmentBuilder size(long size) {
            this.size = size;
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
