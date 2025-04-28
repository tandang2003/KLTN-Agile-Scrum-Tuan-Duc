package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Topic;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Project extends BaseDocument {
    @Field("nk_project_id")
    private String nkProjectId;
    @Field("description")
    private String description;
    @Field("topics")
    private Topic[] topics;

    public Project(ProjectBuilder builder) {
        super(builder);
        this.nkProjectId = builder.nkProjectId;
        this.description = builder.description;
        this.topics = builder.topics;
    }

    public static class ProjectBuilder extends BaseDocument.BaseDocumentBuilder<Project, ProjectBuilder> {
        private String nkProjectId;
        private String description;
        private Topic[] topics;

        public ProjectBuilder nkProjectId(String nkProjectId) {
            this.nkProjectId = nkProjectId;
            return this;
        }

        public ProjectBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectBuilder topics(Topic[] topics) {
            this.topics = topics;
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

    public Topic[] getTags() {
        return topics;
    }

    public void setTags(Topic[] topics) {
        this.topics = topics;
    }
}