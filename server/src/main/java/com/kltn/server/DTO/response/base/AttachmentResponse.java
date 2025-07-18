package com.kltn.server.DTO.response.base;


import org.bson.types.ObjectId;

public record AttachmentResponse(ObjectId id, String resourceIdz) {
    public static AttachmentResponseBuilder builder() {
        return new AttachmentResponseBuilder();
    }

    public static class AttachmentResponseBuilder {
        private ObjectId id;
        private String resourceId;

        public AttachmentResponseBuilder id(ObjectId id) {
            this.id = id;
            return this;
        }

        public AttachmentResponseBuilder setResourceId(String resourceId) {
            this.resourceId = resourceId;
            return this;
        }

        public AttachmentResponse build() {
            return new AttachmentResponse(id,resourceId);
        }
    }
}
