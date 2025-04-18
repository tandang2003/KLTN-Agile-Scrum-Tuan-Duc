package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Tag;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Project extends BaseDocument {
    @Field("nk_project_id")
    private String nkProjectId;
    @Field("description")
    private String description;
    @Field("tags")
    private Tag[] tags;

    public Project(ProjectBuilder builder) {
        super(builder);
        this.nkProjectId = builder.nkProjectId;
        this.description = builder.description;
        this.tags = builder.tags;
    }

    public static class ProjectBuilder extends BaseDocument.BaseDocumentBuilder<Project, ProjectBuilder> {
        private String nkProjectId;
        private String description;
        private Tag[] tags;

        public ProjectBuilder nkProjectId(String nkProjectId) {
            this.nkProjectId = nkProjectId;
            return this;
        }

        public ProjectBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectBuilder tags(Tag[] tags) {
            this.tags = tags;
            return this;
        }

        @Override
        protected ProjectBuilder self() {
            return this;
        }

        public Project build() {
            return new Project(this);
        }
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public String getNkProjectId() {
        return nkProjectId;
    }

    public void setNkProjectId(String nkProjectId) {
        this.nkProjectId = nkProjectId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Tag[] getTags() {
        return tags;
    }

    public void setTags(Tag[] tags) {
        this.tags = tags;
    }
}