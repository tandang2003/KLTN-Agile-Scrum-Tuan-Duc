package com.kltn.server.model.entity.relationship;

import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import jakarta.persistence.*;

import java.util.List;

import java.time.Instant;

@Entity
public class ProjectSprint {
    @EmbeddedId
    private ProjectSprintId id;
    @MapsId("projectId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", insertable = false)
    private Project project;
    @MapsId("sprintId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "sprint_id", nullable = false)
    private Sprint sprint;

//    @OneToMany(mappedBy = "projectSprint", fetch = FetchType.LAZY)
//    private List<Issue> issues;

    @Column(name = "dt_planning")
    private Instant dtPlanning;
    @Column(name = "dt_preview")
    private Instant dtPreview;

    public ProjectSprint() {
    }

    public static ProjectSprintBuilder builder() {
        return new ProjectSprintBuilder();
    }

    public ProjectSprint(ProjectSprintBuilder builder) {
        this.id = builder.id;
        this.project = builder.project;
        this.sprint = builder.sprint;
//        this.issues = builder.issues;
        this.dtPlanning = builder.DTPlanning;
        this.dtPreview = builder.DTPreview;
    }

    public static class ProjectSprintBuilder {
        private ProjectSprintId id;
        private Project project;
        private Sprint sprint;
        private List<Issue> issues;
        private Instant DTPlanning;
        private Instant DTPreview;

        public ProjectSprintBuilder id(ProjectSprintId id) {
            this.id = id;
            return this;
        }

        public ProjectSprintBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public ProjectSprintBuilder sprint(Sprint sprint) {
            this.sprint = sprint;
            return this;
        }

        public ProjectSprintBuilder tasks(List<Issue> issues) {
            this.issues = issues;
            return this;
        }

        public ProjectSprintBuilder dtPlanning(Instant dtPlanning) {
            this.DTPlanning = dtPlanning;
            return this;
        }

        public ProjectSprintBuilder dtPreview(Instant dtPreview) {
            this.DTPreview = dtPreview;
            return this;
        }

        public ProjectSprint build() {
            return new ProjectSprint(this);
        }
    }

    public ProjectSprintId getId() {
        return id;
    }

    public void setId(ProjectSprintId id) {
        this.id = id;
    }

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

//    public List<Issue> getTasks() {
//        return issues;
//    }
//
//    public void setTasks(List<Issue> issues) {
//        this.issues = issues;
//    }

    public Instant getDtPlanning() {
        return dtPlanning;
    }

    public void setDtPlanning(Instant DTPlanning) {
        this.dtPlanning = DTPlanning;
    }

    public Instant getDtPreview() {
        return dtPreview;
    }

    public void setDtPreview(Instant DTPreview) {
        this.dtPreview = DTPreview;
    }
}
