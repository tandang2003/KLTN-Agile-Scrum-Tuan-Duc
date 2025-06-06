package com.kltn.server.DTO.response.issue;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.DTO.response.auth.AuthenticationResponse;
import com.kltn.server.DTO.response.base.AttachmentResponse;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record IssueResponse(String id,
                            String name,
                            String projectId,
                            String sprintId,
                            IssueStatus status,
                            IssuePriority priority,
                            IssueTag tag,
                            String position,
                            List<TopicResponse> topics,
                            List<SubTaskResponse> subTasks,
                            List<AttachmentResponse> attachments,
                            String description,
                            AuthenticationResponse.UserDetailDTO assignee,
                            AuthenticationResponse.UserDetailDTO reviewer,
                            Instant start,
                            Instant end
) {
    public static IssueResponseBuilder builder() {
        return new IssueResponseBuilder();
    }

    public static class IssueResponseBuilder {
        private String id;
        private String name;
        private String projectId;
        private String sprintId;
        private IssueStatus status;
        private IssuePriority priority;
        private IssueTag tag;
        private String position;
        private List<TopicResponse> topics;
        private List<SubTaskResponse> subTasks;
        private List<AttachmentResponse> attachments;
        private String description;
        private AuthenticationResponse.UserDetailDTO assignee;
        private AuthenticationResponse.UserDetailDTO reviewer;
        private Instant start;
        private Instant end;

        public IssueResponse build() {
            return new IssueResponse(id,name, projectId, sprintId, status, priority, tag, position, topics, subTasks, attachments, description, assignee, reviewer, start, end);
        }

        public IssueResponseBuilder id(String id) {
            this.id = id;
            return this;
        }
        public IssueResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public IssueResponseBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public IssueResponseBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

        public IssueResponseBuilder status(IssueStatus status) {
            this.status = status;
            return this;
        }

        public IssueResponseBuilder priority(IssuePriority priority) {
            this.priority = priority;
            return this;
        }

        public IssueResponseBuilder tag(IssueTag tag) {
            this.tag = tag;
            return this;
        }

        public IssueResponseBuilder position(String position) {
            this.position = position;
            return this;
        }

        public IssueResponseBuilder topics(List<TopicResponse> topics) {
            this.topics = topics;
            return this;
        }

        public IssueResponseBuilder subTasks(List<SubTaskResponse> subTasks) {
            this.subTasks = subTasks;
            return this;
        }

        public IssueResponseBuilder attachments(List<AttachmentResponse> attachments) {
            this.attachments = attachments;
            return this;
        }

        public IssueResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public IssueResponseBuilder assignee(AuthenticationResponse.UserDetailDTO assignee) {
            this.assignee = assignee;
            return this;
        }

        public IssueResponseBuilder reviewer(AuthenticationResponse.UserDetailDTO reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public IssueResponseBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public IssueResponseBuilder end(Instant end) {
            this.end = end;
            return this;
        }
    }

}
