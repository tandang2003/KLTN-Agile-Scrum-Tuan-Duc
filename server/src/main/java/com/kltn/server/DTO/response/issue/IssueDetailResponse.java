package com.kltn.server.DTO.response.issue;

import com.kltn.server.DTO.response.auth.AuthenticationResponse;
import com.kltn.server.DTO.response.base.SubTaskResponse;
import com.kltn.server.DTO.response.base.TopicResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;

import java.time.Instant;
import java.util.List;

public class IssueDetailResponse {
    private String id;
    private int position;
    private String description;
    private List<ResourceResponse> resources;
    private AuthenticationResponse.UserDetailDTO assigner;
    private AuthenticationResponse.UserDetailDTO reviewer;
    private String title;
    private int storyPoint;
    private IssueStatus status;
    private IssuePriority priority;
    private IssueTag tag;
    private List<TopicResponse> topics;
    private List<SubTaskResponse> subTasks;
    private int complexOfDescription;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant dtPlanning;

    public static IssueDetailResponseBuilder builder() {
        return new IssueDetailResponseBuilder();
    }

    public static class IssueDetailResponseBuilder {
        private String id;
        private int position;
        private String description;
        private List<ResourceResponse> resources;
        private     AuthenticationResponse.UserDetailDTO assigner;
        private     AuthenticationResponse.UserDetailDTO reviewer;
        private String title;
        private int storyPoint;
        private IssueStatus status;
        private IssuePriority priority;
        private IssueTag tag;
        private List<TopicResponse> topics;
        private List<SubTaskResponse> subTasks;
        private int complexOfDescription;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant dtPlanning;

        public IssueDetailResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public IssueDetailResponseBuilder position(int position) {
            this.position = position;
            return this;
        }

        public IssueDetailResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public IssueDetailResponseBuilder assigner(    AuthenticationResponse.UserDetailDTO assigner) {
            this.assigner = assigner;
            return this;
        }

        public IssueDetailResponseBuilder reviewer(    AuthenticationResponse.UserDetailDTO reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public IssueDetailResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public IssueDetailResponseBuilder storyPoint(int storyPoint) {
            this.storyPoint = storyPoint;
            return this;
        }

        public IssueDetailResponseBuilder status(IssueStatus status) {
            this.status = status;
            return this;
        }

        public IssueDetailResponseBuilder priority(IssuePriority priority) {
            this.priority = priority;
            return this;
        }

        public IssueDetailResponseBuilder tag(IssueTag tag) {
            this.tag = tag;
            return this;
        }

        public IssueDetailResponseBuilder topics(List<TopicResponse> topics) {
            this.topics = topics;
            return this;
        }

        public IssueDetailResponseBuilder subTasks(List<SubTaskResponse> subTasks) {
            this.subTasks = subTasks;
            return this;
        }

        public IssueDetailResponseBuilder resources(List<ResourceResponse> resources) {
            this.resources = resources;
            return this;
        }

        public IssueDetailResponseBuilder complexOfDescription(int complexOfDescription) {
            this.complexOfDescription = complexOfDescription;
            return this;
        }

        public IssueDetailResponseBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public IssueDetailResponseBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

        public IssueDetailResponseBuilder dtPlanning(Instant dtPlanning) {
            this.dtPlanning = dtPlanning;
            return this;
        }

        public IssueDetailResponse build() {
            return new IssueDetailResponse(this);
        }
    }

    public IssueDetailResponse(IssueDetailResponseBuilder builder) {
        this.id = builder.id;
        this.position = builder.position;
        this.description = builder.description;
        this.resources = builder.resources;
        this.assigner = builder.assigner;
        this.reviewer = builder.reviewer;
        this.title = builder.title;
        this.storyPoint = builder.storyPoint;
        this.status = builder.status;
        this.priority = builder.priority;
        this.tag = builder.tag;
        this.topics = builder.topics;
        this.complexOfDescription = builder.complexOfDescription;
        this.dtStart = builder.dtStart;
        this.dtEnd = builder.dtEnd;
        this.dtPlanning = builder.dtPlanning;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ResourceResponse> getResources() {
        return resources;
    }

    public void setResources(List<ResourceResponse> resources) {
        this.resources = resources;
    }

    public AuthenticationResponse.UserDetailDTO getAssigner() {
        return assigner;
    }

    public void setAssigner(AuthenticationResponse.UserDetailDTO assigner) {
        this.assigner = assigner;
    }

    public AuthenticationResponse.UserDetailDTO getReviewer() {
        return reviewer;
    }

    public void setReviewer(AuthenticationResponse.UserDetailDTO reviewer) {
        this.reviewer = reviewer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

    public IssueTag getTag() {
        return tag;
    }

    public void setTag(IssueTag tag) {
        this.tag = tag;
    }

    public List<TopicResponse> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicResponse> topics) {
        this.topics = topics;
    }

    public int getComplexOfDescription() {
        return complexOfDescription;
    }

    public void setComplexOfDescription(int complexOfDescription) {
        this.complexOfDescription = complexOfDescription;
    }

    public Instant getDtStart() {
        return dtStart;
    }

    public void setDtStart(Instant dtStart) {
        this.dtStart = dtStart;
    }

    public Instant getDtEnd() {
        return dtEnd;
    }

    public void setDtEnd(Instant dtEnd) {
        this.dtEnd = dtEnd;
    }

    public Instant getDtPlanning() {
        return dtPlanning;
    }

    public void setDtPlanning(Instant dtPlanning) {
        this.dtPlanning = dtPlanning;
    }
}
