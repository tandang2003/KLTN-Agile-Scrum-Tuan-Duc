package com.kltn.server.model.collection;

import com.kltn.server.model.base.BaseDocument;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.collection.model.Comment;
import com.kltn.server.model.collection.model.SubTask;
import com.kltn.server.model.collection.model.Topic;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document
public class Issue extends BaseDocument {
    @Field("nk_task_id")
    private String nkTaskId;
    @Field
    private String description;
    @Field("topics")
    private List<Topic> topics;
    @Field("subTasks")
    private List<SubTask> subtasks;
    @Field("attachments")
    private List<Attachment> attachment;
    @Field("comments")
    private List<Comment> comments;

    public Issue(IssueBuilder issueBuilder) {
        super(issueBuilder);
        this.nkTaskId = issueBuilder.nkTaskId;
        this.description = issueBuilder.description;
        this.topics = issueBuilder.topics;
        this.attachment = issueBuilder.attachment;
        this.subtasks = issueBuilder.subtasks;
        this.comments = issueBuilder.comment;
    }

  public Issue() {
  }

  public static IssueBuilder builder() {
    return new IssueBuilder();
  }

    public static class IssueBuilder extends BaseDocumentBuilder<Issue, IssueBuilder> {
        private String nkTaskId;
        private String description;
        private List<Topic> topics;
        private List<Attachment> attachment;
        private List<Comment> comment;
        private List<SubTask> subtasks;


    public IssueBuilder nkTaskId(String nkTaskId) {
      this.nkTaskId = nkTaskId;
      return this;
    }

    public IssueBuilder description(String description) {
      this.description = description;
      return this;
    }

        public IssueBuilder topics(List<Topic> topics) {
            this.topics = topics;
            return this;
        }

        public IssueBuilder attachment(List<Attachment> attachment) {
            this.attachment = attachment;
            return this;
        }

        public IssueBuilder comment(List<Comment> comment) {
            this.comment = comment;
            return this;
        }

        public IssueBuilder subtasks(List<SubTask> subtasks) {
            this.subtasks = subtasks;
            return this;
        }

    @Override
    protected IssueBuilder self() {
      return this;
    }

        public Issue build() {
            return new Issue(this);
        }
    }

    public String getNkTaskId() {
        return nkTaskId;
    }

    public void setNkTaskId(String nkTaskId) {
        this.nkTaskId = nkTaskId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public List<SubTask> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<SubTask> subtasks) {
        this.subtasks = subtasks;
    }

    public List<Attachment> getAttachment() {
        return attachment;
    }

    public void setAttachment(List<Attachment> attachment) {
        this.attachment = attachment;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
