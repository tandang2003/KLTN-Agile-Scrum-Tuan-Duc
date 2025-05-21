package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.type.resource.ContentType;
import com.kltn.server.model.type.resource.PlaceContent;
import jakarta.persistence.*;

@Entity
@Table(name = "resources")
public class Resource extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private String extension;
    private String sail;
    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    @Enumerated(EnumType.STRING)
    private PlaceContent placeContent;
    private long size;

    public Resource(ResourceEntityBuilder resourceBuilder) {
        super(resourceBuilder);
        this.project = resourceBuilder.project;
        this.name = resourceBuilder.name;
        this.contentType = resourceBuilder.contentType;
        this.extension = resourceBuilder.extension;
        this.placeContent = resourceBuilder.placeContent;
        this.size = resourceBuilder.size;
        this.issue = resourceBuilder.issue;
        this.user = resourceBuilder.user;
    }

    public Resource() {

    }

    public static class ResourceEntityBuilder extends BaseEntityBuilder<Resource, ResourceEntityBuilder> {
        private Project project;
        private Issue issue;
        private User user;
        private String name;
        private String extension;
        private ContentType contentType;
        private PlaceContent placeContent;
        private long size;

        public ResourceEntityBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public ResourceEntityBuilder task(Issue issue) {
            this.issue = issue;
            return this;
        }

        public ResourceEntityBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ResourceEntityBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ResourceEntityBuilder extension(String extension) {
            this.extension = extension;
            return this;
        }

        public ResourceEntityBuilder contentType(ContentType contentType) {
            this.contentType = contentType;
            return this;
        }

        public ResourceEntityBuilder placeContent(PlaceContent placeContent) {
            this.placeContent = placeContent;
            return this;
        }

        public ResourceEntityBuilder size(long size) {
            this.size = size;
            return this;
        }

        @Override
        protected ResourceEntityBuilder self() {
            return this;
        }

        @Override
        public Resource build() {
            return new Resource(this);
        }
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public String getSail() {
        return sail;
    }

    public void setSail(String sail) {
        this.sail = sail;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
}
