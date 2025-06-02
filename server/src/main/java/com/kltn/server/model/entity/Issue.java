package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "issues")
public class Issue extends BaseEntity {
    private int position;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "project_id", updatable = false, nullable = false)
    private Project project;
    @ManyToOne
    @JoinColumn(name = "sprint_id", updatable = false)
    private Sprint sprint;
    //    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "project_id", referencedColumnName = "project_id"),
//            @JoinColumn(name = "sprint_id", referencedColumnName = "sprint_id", nullable = true)
//    })
//    private ProjectSprint projectSprint;
    @OneToMany(mappedBy = "issue")
    private List<Resource> resources;
    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;
    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User reviewer;
    private String name;
    @Enumerated(EnumType.STRING)
    private IssueStatus status;
//    private int storyPoint;
    @Enumerated(EnumType.STRING)
    private IssuePriority priority;
    @Enumerated(EnumType.STRING)
    private IssueTag tag;
    @Column(name = "num_changing_of_priority")
    private int numChangeOfPriority;
    @Column(name = "num_changing_of_description")
    private int numChangeOfDescription;
    @Column(name = "commplex_of_description")
    private int complexOfDescription;
    @Column(name = "dt_start")
    private Instant dtStart;
    @Column(name = "dt_end")
    private Instant dtEnd;
    @Column(name = "dt_planning")
    private Instant dtPlanning;


    public Issue(IssueEntityBuilder builder) {
        super(builder);
        this.name = builder.name;
        this.position = builder.position;
        this.description = builder.description;
        this.status = builder.status;
        this.priority = builder.priority;
        this.tag = builder.tag;
        this.numChangeOfPriority = builder.numChangeOfPriority;
        this.numChangeOfDescription = builder.numChangeOfDescription;
        this.complexOfDescription = builder.complexOfDescription;
        this.assignee = builder.assignee;
        this.reviewer = builder.reviewer;
        this.dtStart = builder.dtStart;
        this.dtEnd = builder.dtEnd;
        this.resources = builder.resources;
        this.project = builder.project;
        this.sprint = builder.sprint;
    }

    public Issue() {
    }

    public static IssueEntityBuilder builder() {
        return new IssueEntityBuilder();
    }

    public Instant getDtPlanning() {
        return dtPlanning;
    }

    public void setDtPlanning(Instant dtPlanning) {
        this.dtPlanning = dtPlanning;
    }

    public static class IssueEntityBuilder extends BaseEntityBuilder<Issue, IssueEntityBuilder> {
        private int position;
        private List<Resource> resources;
        private String name;
        private String description;
        private IssueStatus status;
//        private int storyPoint;
        private IssuePriority priority;
        private IssueTag tag;
        private int numChangeOfPriority;
        private int numChangeOfDescription;
        private int complexOfDescription;

        //        private Sprint sprint;
//        private Project project;
        private User assignee;
        private User reviewer;
        private Instant dtStart;
        private Instant dtEnd;
//        private Instant dtPlanning;
        private Project project;
        private Sprint sprint;
//        private ProjectSprint projectSprint;

        public IssueEntityBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public IssueEntityBuilder sprint(Sprint sprint) {
            this.sprint = sprint;
            return this;
        }

        public IssueEntityBuilder name(String name) {
            this.name = name;
            return this;
        }

        public IssueEntityBuilder description(String description) {
            this.description = description;
            return this;
        }

        public IssueEntityBuilder position(int position) {
            this.position = position;
            return this;
        }

        public IssueEntityBuilder status(IssueStatus status) {
            this.status = status;
            return this;
        }

//        public IssueEntityBuilder storyPoint(int storyPoint) {
//            this.storyPoint = storyPoint;
//            return this;
//        }

        public IssueEntityBuilder resource(List<Resource> resources) {
            this.resources = resources;
            return this;
        }

        public IssueEntityBuilder priority(IssuePriority priority) {
            this.priority = priority;
            return this;
        }

        public IssueEntityBuilder tag(IssueTag tag) {
            this.tag = tag;
            return this;
        }

        public IssueEntityBuilder numChangeOfPriority(int numChangeOfPriority) {
            this.numChangeOfPriority = numChangeOfPriority;
            return this;
        }

        public IssueEntityBuilder numChangeOfDescription(int numChangeOfDescription) {
            this.numChangeOfDescription = numChangeOfDescription;
            return this;
        }

        public IssueEntityBuilder complexOfDescription(int complexOfDescription) {
            this.complexOfDescription = complexOfDescription;
            return this;
        }

        public IssueEntityBuilder assignee(User assignee) {
            this.assignee = assignee;
            return this;
        }

        public IssueEntityBuilder reviewer(User reviewer) {
            this.reviewer = reviewer;
            return this;
        }

//        public IssueEntityBuilder sprint(Sprint sprint) {
//            this.sprint = sprint;
//            return this;
//        }
//
//        public IssueEntityBuilder project(Project project) {
//            this.project = project;
//            return this;
//        }

        public IssueEntityBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public IssueEntityBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

//        public IssueEntityBuilder dtPlanning(Instant dtPlanning) {
//            this.dtPlanning = dtPlanning;
//            return this;
//        }

//        public IssueEntityBuilder projectSprint(ProjectSprint projectSprint) {
//            this.projectSprint = projectSprint;
//            return this;
//        }

        @Override
        protected IssueEntityBuilder self() {
            return this;
        }

        @Override
        public Issue build() {
            return new Issue(this);
        }
    }

//    public Sprint getSprint() {
//        return sprint;
//    }
//
//    public void setSprint(Sprint sprint) {
//        this.sprint = sprint;
//    }
//
//    public Project getProject() {
//        return project;
//    }
//
//    public void setProject(Project project) {
//        this.project = project;
//    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getNumChangeOfPriority() {
        return numChangeOfPriority;
    }

    public void setNumChangeOfPriority(int numChangeOfPriority) {
        this.numChangeOfPriority = numChangeOfPriority;
    }

    public int getNumChangeOfDescription() {
        return numChangeOfDescription;
    }

    public void setNumChangeOfDescription(int numChangeOfDescription) {
        this.numChangeOfDescription = numChangeOfDescription;
    }

    public int getComplexOfDescription() {
        return complexOfDescription;
    }

    public void setComplexOfDescription(int complexOfDescription) {
        this.complexOfDescription = complexOfDescription;
    }


    public List<Resource> getResources() {
        return resources;
    }


    public void setResources(List<Resource> resources) {

        this.resources = resources;
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

//    public Instant getDtPlanning() {
//        return dtPlanning;
//    }
//
//    public void setDtPlanning(Instant dtPlanning) {
//        this.dtPlanning = dtPlanning;
//    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }
}
