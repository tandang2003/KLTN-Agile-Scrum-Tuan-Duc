package com.kltn.server.DTO.request.base;


public class AttachmentRequest {

    private String resourceId;


    public String getResourceId() {
        return resourceId;
    }

    public AttachmentRequest() {
    }

    private AttachmentRequest(AttachmentRequestBuilder builder) {
        this.resourceId = builder.resourceId;
    }

    public static AttachmentRequestBuilder builder() {
        return new AttachmentRequestBuilder();
    }

    public static class AttachmentRequestBuilder {
        private String resourceId;

        public AttachmentRequestBuilder resourceId(String resourceId) {
            this.resourceId = resourceId;
            return this;
        }

        public AttachmentRequest build() {
            return new AttachmentRequest(this);
        }
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

}
