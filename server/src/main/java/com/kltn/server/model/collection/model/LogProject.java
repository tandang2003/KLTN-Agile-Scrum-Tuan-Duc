package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class LogProject implements ILog {
    @Field("nk_project_id")
    private String nkProjectId;
    @Field("description")
    private String description;
    @Field("tags")
    private Topic[] tags;

    private LogProject(LogProjectBuilder builder) {
        this.nkProjectId = builder.nkProjectId;
        this.description = builder.description;
        this.tags = builder.tags;
    }

    public LogProjectBuilder builder() {
        return new LogProjectBuilder();
    }


    public static class LogProjectBuilder {
        private String nkProjectId;
        private String description;
        private Topic[] tags;

        public LogProjectBuilder setNkProjectId(String nkProjectId) {
            this.nkProjectId = nkProjectId;
            return this;
        }

        public LogProjectBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public LogProjectBuilder setTags(Topic[] tags) {
            this.tags = tags;
            return this;
        }

        public LogProject build() {
            return new LogProject(this);
        }
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
        return tags;
    }

    public void setTags(Topic[] tags) {
        this.tags = tags;
    }
}
