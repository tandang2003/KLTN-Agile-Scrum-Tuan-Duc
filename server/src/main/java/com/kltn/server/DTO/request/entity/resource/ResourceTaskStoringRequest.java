package com.kltn.server.DTO.request.entity.resource;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ResourceTaskStoringRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String extension;
    @NotNull
    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    @NotNull
    private long size;
    //    private String projectId;
    private String issueId;
    private String publicId;
    public ResourceTaskStoringRequest() {
    }

//    public static ResourceTaskStoringRequestBuilder builder() {
//        return new ResourceTaskStoringRequestBuilder();
//    }

//    public ResourceTaskStoringRequest(ResourceTaskStoringRequestBuilder builder) {
//        this.name = builder.name;
//        this.extension = builder.extension;
//        this.contentType = builder.contentType;
//        this.size = builder.size;
//        this.issueId = builder.issueId;
//        this.publicId = builder.publicId;
//    }
//
//    public static class ResourceTaskStoringRequestBuilder {
//        private String name;
//        private String extension;
//        private ContentType contentType;
//        private long size;
//        private String issueId;
//        private String publicId;
//
//
//
//        public ResourceTaskStoringRequestBuilder name(String name) {
//            this.name = name;
//            return this;
//        }
//
//        public ResourceTaskStoringRequestBuilder extension(String extension) {
//            this.extension = extension;
//            return this;
//        }
//
//        public ResourceTaskStoringRequestBuilder contentType(ContentType contentType) {
//            this.contentType = contentType;
//            return this;
//        }
//
//        public ResourceTaskStoringRequestBuilder size(long size) {
//            this.size = size;
//            return this;
//        }
//
//        public ResourceTaskStoringRequestBuilder issueId(String issueId) {
//            this.issueId = issueId;
//            return this;
//        }
//
//        public ResourceTaskStoringRequestBuilder publicId(String publicId) {
//            this.publicId = publicId;
//            return this;
//        }
//
//        public ResourceTaskStoringRequest build() {
//            return new ResourceTaskStoringRequestBuilder(this);
//        }
//    }

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


    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }
}
