package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.Objects;

//@Document(collection = "projects")
public class Project extends BaseDocument {
    //    private String id;
//    @Field(name = "nk_project_id")
    private String projectId;
    private List<Tag> tags;


    public ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public Project(ProjectBuilder projectBuilder) {
        super(projectBuilder);
        this.projectId = projectBuilder.projectId;
        this.tags = projectBuilder.tags;
    }

    public static class ProjectBuilder extends BaseDocumentBuilder<Project, ProjectBuilder> {

        private String projectId;
        private List<Tag> tags;

        public ProjectBuilder() {
        }

        public ProjectBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public ProjectBuilder tags(List<Tag> tags) {
            this.tags = tags;
            return this;
        }

        @Override
        protected ProjectBuilder self() {
            return this;
        }

        @Override
        public Project build() {
            return new Project(this);
        }
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Project project)) return false;
        if (!super.equals(o)) return false;
        return Objects.equals(projectId, project.projectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), projectId);
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

}
