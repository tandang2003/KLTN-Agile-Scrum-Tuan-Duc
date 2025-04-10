package com.kltn.server.model.collection.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Comment {
    @Field
    private String to;
    @Field
    private String from;
    @Field
    private String message;
    @Field
    private Attachment attachment;
    @Field("is_delete")
    private boolean deleted;
    @Field("delete_by")
    private String deletedBy;

    private Comment(CommentBuilder builder) {
        this.to = builder.to;
        this.from = builder.from;
        this.message = builder.message;
        this.attachment = builder.attachment;
        this.deleted = builder.deleted;
        this.deletedBy = builder.deletedBy;
    }

    public static CommentBuilder builder() {
        return new CommentBuilder();
    }

    public static class CommentBuilder {
        private String to;
        private String from;
        private String message;
        private Attachment attachment;
        private boolean deleted;
        private String deletedBy;

        public CommentBuilder to(String to) {
            this.to = to;
            return this;
        }

        public CommentBuilder from(String from) {
            this.from = from;
            return this;
        }

        public CommentBuilder message(String message) {
            this.message = message;
            return this;
        }

        public CommentBuilder attachment(Attachment attachment) {
            this.attachment = attachment;
            return this;
        }

        public CommentBuilder deleted(boolean deleted) {
            this.deleted = deleted;
            return this;
        }

        public CommentBuilder deletedBy(String deletedBy) {
            this.deletedBy = deletedBy;
            return this;
        }

        public Comment build() {
            return new Comment(this);
        }
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Attachment getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(String deletedBy) {
        this.deletedBy = deletedBy;
    }
}
