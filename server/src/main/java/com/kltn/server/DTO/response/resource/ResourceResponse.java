package com.kltn.server.DTO.response.resource;

import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record ResourceResponse(String id,
                               String name,
                               String extension,
                               @Enumerated(EnumType.STRING)
                               ContentType contentType,
                               @Enumerated(EnumType.STRING)
                               PlaceContent placeContent,
                               long size,
                               String url
) {

    public static ResourceResponseBuilder builder() {
        return new ResourceResponseBuilder();
    }

    public static class ResourceResponseBuilder {
        private String id;
        private String name;
        private String extension;
        @Enumerated(EnumType.STRING)
        private ContentType contentType;
        @Enumerated(EnumType.STRING)
        private PlaceContent placeContent;
        private long size;
        public String url;

        public ResourceResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ResourceResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ResourceResponseBuilder extension(String extension) {
            this.extension = extension;
            return this;
        }

        public ResourceResponseBuilder contentType(ContentType contentType) {
            this.contentType = contentType;
            return this;
        }

        public ResourceResponseBuilder placeContent(PlaceContent placeContent) {
            this.placeContent = placeContent;
            return this;
        }

        public ResourceResponseBuilder size(long size) {
            this.size = size;
            return this;
        }

        public ResourceResponse build() {
            return new ResourceResponse(id, name, extension, contentType, placeContent, size,url);
        }
    }
}
