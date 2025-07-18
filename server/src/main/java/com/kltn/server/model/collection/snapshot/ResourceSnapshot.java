package com.kltn.server.model.collection.snapshot;

import com.kltn.server.model.entity.User;
import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class ResourceSnapshot {
    private String nkResourceId;
    private String name;
    private String extension;
    @Enumerated(EnumType.STRING)

    private ContentType contentType;
    @Enumerated(EnumType.STRING)
    private PlaceContent placeContent;
    private long size;
    private String publicId;

    public ResourceSnapshot() {
    }

    private ResourceSnapshot(ResourceSnapshotBuilder builder) {
        this.nkResourceId = builder.nkResourceId;
        this.name = builder.name;
        this.extension = builder.extension;
        this.contentType = builder.contentType;
        this.placeContent = builder.placeContent;
        this.size = builder.size;
        this.publicId = builder.publicId;

    }

    public static ResourceSnapshotBuilder builder() {
        return new ResourceSnapshotBuilder();
    }

    public static class ResourceSnapshotBuilder {
        private String nkResourceId;
        private String name;
        private String extension;
        private ContentType contentType;
        private PlaceContent placeContent;
        private long size;
        private String publicId;

        public ResourceSnapshotBuilder nkResourceId(String nkResourceId) {
            this.nkResourceId = nkResourceId;
            return this;
        }

        public ResourceSnapshotBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ResourceSnapshotBuilder extension(String extension) {
            this.extension = extension;
            return this;
        }

        public ResourceSnapshotBuilder contentType(ContentType contentType) {
            this.contentType = contentType;
            return this;
        }

        public ResourceSnapshotBuilder placeContent(PlaceContent placeContent) {
            this.placeContent = placeContent;
            return this;
        }

        public ResourceSnapshotBuilder size(long size) {
            this.size = size;
            return this;
        }

        public ResourceSnapshotBuilder publicId(String publicId) {
            this.publicId = publicId;
            return this;
        }
        public ResourceSnapshot build() {
            return new ResourceSnapshot(this);
        }
    }

    public String getNkResourceId() {
        return nkResourceId;
    }

    public void setNkResourceId(String nkResourceId) {
        this.nkResourceId = nkResourceId;
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

    public PlaceContent getPlaceContent() {
        return placeContent;
    }

    public void setPlaceContent(PlaceContent placeContent) {
        this.placeContent = placeContent;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }
}
