package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.model.collection.model.SubTask;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Task extends BaseDocument {
    @Field("nk_task_id")
    private String nkTaskId;
    @Field
    private String description;
    @Field("Topics")
    private String[] Topics;
    @Field("subTasks")
    private SubTask[] subTasks;
    @Field("attachments")
    private Attachment[] attachment;
    @Field("comments")
    private Comment[] comments;

    public Task(TaskBuilder taskBuilder) {
        super(taskBuilder);
        this.nkTaskId = taskBuilder.nkTaskId;
        this.description = taskBuilder.description;
        this.Topics = taskBuilder.Topics;
        this.attachment = taskBuilder.attachment;
        this.subTasks = taskBuilder.subTasks;
        this.comments = taskBuilder.comment;
    }

    public TaskBuilder builder() {
        return new TaskBuilder();
    }

    public static class TaskBuilder extends BaseDocumentBuilder<Task, TaskBuilder> {
        private String nkTaskId;
        private String description;
        private String[] Topics;
        private Attachment[] attachment;
        private Comment[] comment;
        private SubTask[] subTasks;

        public TaskBuilder setNkTaskId(String nkTaskId) {
            this.nkTaskId = nkTaskId;
            return this;
        }

        public TaskBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public TaskBuilder setTags(String[] Topics) {
            this.Topics = Topics;
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

        public TaskBuilder setSubTags(SubTask[] subTasks) {
            this.subTasks = subTasks;
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
