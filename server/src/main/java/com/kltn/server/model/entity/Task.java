package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.type.task.TaskPriority;
import com.kltn.server.model.type.task.TaskStatus;
import com.kltn.server.model.type.task.TaskTag;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;
    @OneToMany(mappedBy = "task")
    private List<Resource> resources;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "assigner")
    private User assigner;
    @ManyToOne
    @JoinColumn(name = "reviewer")
    private User reviewer;

    private String title;
    @Enumerated(EnumType.STRING)
    private TaskStatus type;
    private int storyPoint;
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    @Enumerated(EnumType.STRING)
    private TaskTag tag;
    @Column(name = "num_changing_of_priority")
    private int numChangeOfPriority;
    @Column(name = "num_changing_of_description")
    private int numChangeOfDescription;
    @Column(name = "commplex_of_description")
    private int complexOfDescription;
    @Column(name = "dt_start")
    private Instant DTStart;
    @Column(name = "dt_end")
    private Instant DTEnd;
    @Column(name = "dt_planning")
    private Instant DTPlanning;

    public Task(TaskBuilder builder) {
        super(builder);
        this.title = builder.title;
        this.type = builder.type;
        this.storyPoint = builder.storyPoint;
        this.priority = builder.priority;
        this.tag = builder.tag;
        this.numChangeOfPriority = builder.numChangeOfPriority;
        this.numChangeOfDescription = builder.numChangeOfDescription;
        this.complexOfDescription = builder.complexOfDescription;
        this.assigner = builder.assigner;
        this.reviewer = builder.reviewer;
        this.project = builder.project;
        this.sprint = builder.sprint;
        this.DTStart = builder.DTStart;
        this.DTEnd = builder.DTEnd;
        this.DTPlanning = builder.DTPlanning;
        this.resources = builder.resources;
    }

    public static class TaskBuilder extends BaseBuilder<Task, TaskBuilder> {
        private List<Resource> resources;
        private String title;
        private TaskStatus type;
        private int storyPoint;
        private TaskPriority priority;
        private TaskTag tag;
        private int numChangeOfPriority;
        private int numChangeOfDescription;
        private int complexOfDescription;

        private Sprint sprint;
        private Project project;
        private User assigner;
        private User reviewer;
        private Instant DTStart;
        private Instant DTEnd;
        private Instant DTPlanning;

        public TaskBuilder title(String title) {
            this.title = title;
            return this;
        }

        public TaskBuilder type(TaskStatus type) {
            this.type = type;
            return this;
        }

        public TaskBuilder storyPoint(int storyPoint) {
            this.storyPoint = storyPoint;
            return this;
        }

        public TaskBuilder resource(List<Resource> resources) {
            this.resources = resources;
            return this;
        }

        public TaskBuilder priority(TaskPriority priority) {
            this.priority = priority;
            return this;
        }

        public TaskBuilder tag(TaskTag tag) {
            this.tag = tag;
            return this;
        }

        public TaskBuilder numChangeOfPriority(int numChangeOfPriority) {
            this.numChangeOfPriority = numChangeOfPriority;
            return this;
        }

        public TaskBuilder numChangeOfDescription(int numChangeOfDescription) {
            this.numChangeOfDescription = numChangeOfDescription;
            return this;
        }

        public TaskBuilder complexOfDescription(int complexOfDescription) {
            this.complexOfDescription = complexOfDescription;
            return this;
        }

        public TaskBuilder assigner(User assigner) {
            this.assigner = assigner;
            return this;
        }

        public TaskBuilder reviewer(User reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public TaskBuilder sprint(Sprint sprint) {
            this.sprint = sprint;
            return this;
        }

        public TaskBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public TaskBuilder DTStart(Instant DTStart) {
            this.DTStart = DTStart;
            return this;
        }

        public TaskBuilder DTEnd(Instant DTEnd) {
            this.DTEnd = DTEnd;
            return this;
        }

        public TaskBuilder DTPlanning(Instant DTPlanning) {
            this.DTPlanning = DTPlanning;
            return this;
        }

        @Override
        protected TaskBuilder self() {
            return this;
        }

        @Override
        public Task build() {
            return new Task(this);
        }
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getAssigner() {
        return assigner;
    }

    public void setAssigner(User assigner) {
        this.assigner = assigner;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TaskStatus getType() {
        return type;
    }

    public void setType(TaskStatus type) {
        this.type = type;
    }

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public TaskTag getTag() {
        return tag;
    }

    public void setTag(TaskTag tag) {
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

    public Instant getDTStart() {
        return DTStart;
    }

    public void setDTStart(Instant DTStart) {
        this.DTStart = DTStart;
    }

    public Instant getDTEnd() {
        return DTEnd;
    }

    public void setDTEnd(Instant DTEnd) {
        this.DTEnd = DTEnd;
    }

    public Instant getDTPlanning() {
        return DTPlanning;
    }

    public void setDTPlanning(Instant DTPlanning) {
        this.DTPlanning = DTPlanning;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }
}
