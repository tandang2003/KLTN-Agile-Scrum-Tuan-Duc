package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.model.collection.model.SubTag;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Task extends BaseDocument {
    @Field("nk_task_id")
    private String nkTaskId;
    @Field
    private String description;
    @Field("tags")
    private String[] tags;
    @Field("subTags")
    private SubTag[] subTags;
    @Field("attachments")
    private Attachment[] attachment;
    @Field("comments")
    private Comment[] comments;

    public Task(TaskBuilder taskBuilder) {
        super(taskBuilder);
        this.nkTaskId = taskBuilder.nkTaskId;
        this.description = taskBuilder.description;
        this.tags = taskBuilder.tags;
        this.attachment = taskBuilder.attachment;
        this.subTags = taskBuilder.subTags;
        this.comments = taskBuilder.comment;
    }

    public TaskBuilder builder() {
        return new TaskBuilder();
    }

    public static class TaskBuilder extends BaseDocumentBuilder<Task, TaskBuilder> {
        private String nkTaskId;
        private String description;
        private String[] tags;
        private Attachment[] attachment;
        private Comment[] comment;
        private SubTag[] subTags;

        public TaskBuilder setNkTaskId(String nkTaskId) {
            this.nkTaskId = nkTaskId;
            return this;
        }

        public TaskBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public TaskBuilder setTags(String[] tags) {
            this.tags = tags;
            return this;
        }

        public TaskBuilder setAttachment(Attachment[] attachment) {
            this.attachment = attachment;
            return this;
        }

        public TaskBuilder setComment(Comment[] comment) {
            this.comment = comment;
            return this;
        }

        public TaskBuilder setSubTags(SubTag[] subTags) {
            this.subTags = subTags;
            return this;
        }

        @Override
        protected TaskBuilder self() {
            return this;
        }

        public Task build() {
            return new Task(this);
        }
    }
}
