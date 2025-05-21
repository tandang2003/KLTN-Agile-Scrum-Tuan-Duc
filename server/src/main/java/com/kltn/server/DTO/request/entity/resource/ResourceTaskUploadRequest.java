package com.kltn.server.DTO.request.entity.resource;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ResourceTaskUploadRequest {
    @NotEmpty
    private String name;
    private String sail;
    @NotEmpty
    private String extension;
    @NotNull
    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    @NotNull
    private long size;
    //    private String projectId;
    private String issueId;

    public ResourceTaskUploadRequest() {
    }

    public static ResourceUploadRequestBuilder builder() {
        return new ResourceUploadRequestBuilder();
    }

    public ResourceTaskUploadRequest(ResourceUploadRequestBuilder builder) {
        this.name = builder.name;
        this.sail = builder.sail;
        this.extension = builder.extension;
        this.contentType = builder.contentType;
        this.size = builder.size;
        this.issueId = builder.issueId;
    }

    public static class ResourceUploadRequestBuilder {
        private String name;
        private String extension;
        private ContentType contentType;
        private long size;
        private String issueId;
        private String sail;

        public ResourceUploadRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ResourceUploadRequestBuilder sail(String sail) {
            this.sail = sail;
            return this;
        }

        public ResourceUploadRequestBuilder extension(String extension) {
            this.extension = extension;
            return this;
        }

        public ResourceUploadRequestBuilder contentType(ContentType contentType) {
            this.contentType = contentType;
            return this;
        }

        public ResourceUploadRequestBuilder size(long size) {
            this.size = size;
            return this;
        }

        public ResourceUploadRequestBuilder issueId(String issueId) {
            this.issueId = issueId;
            return this;
        }

        public ResourceTaskUploadRequest build() {
            return new ResourceTaskUploadRequest(this);
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getSail() {
        return sail;
    }

    public void setSail(String sail) {
        this.sail = sail;
    }
}
