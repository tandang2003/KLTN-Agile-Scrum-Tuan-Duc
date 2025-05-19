package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "sprints")
public class Sprint extends BaseEntity {
    //    @ManyToOne
//    @JoinColumn(name = "project_id")
//    private Project project;
    @Column(name = "title", columnDefinition = "LONGTEXT")
    private String title;
    @Column(name = "dt_start")
    private Instant dtStart;
    @Column(name = "dt_end")
    private Instant dtEnd;
    @OneToMany(mappedBy = "sprint")
    private List<ProjectSprint> projectSprints;
    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;
    private int position;
    private int miniumStoryPoint;
    @Column(name = "dt_predict")
    private Instant dtPredict;
    @OneToMany(mappedBy = "sprint")
    private List<Issue> issues;
    public Sprint(SprintEntityBuilder sprintBuilder) {
        super(sprintBuilder);
//        this.project = sprintBuilder.project;
        this.title = sprintBuilder.title;
//        this.DTPlanning = sprintBuilder.DTPlanning;
//        this.DTPreview = sprintBuilder.DTPreview;
        this.dtStart = sprintBuilder.DTStart;
        this.dtEnd = sprintBuilder.DTEnd;
        this.projectSprints = sprintBuilder.projectSprints;
        this.miniumStoryPoint = sprintBuilder.miniumStoryPoint;
        this.dtPredict = sprintBuilder.dtPredict;
        this.position = sprintBuilder.position;
    }

    public Sprint() {
    }

    public static SprintEntityBuilder builder() {
        return new SprintEntityBuilder();
    }

    public static class SprintEntityBuilder extends BaseEntityBuilder<Sprint, SprintEntityBuilder> {
        //        private Project project;
        private int miniumStoryPoint;
        private Instant dtPredict;
        private String title;
        //        private Instant DTPlanning;
//        private Instant DTPreview;
        private Instant DTStart;
        private Instant DTEnd;
        private List<ProjectSprint> projectSprints;
        private int position;

        @Override
        protected SprintEntityBuilder self() {
            return this;
        }

        @Override
        public Sprint build() {
            return new Sprint(this);
        }

        //        public SprintEntityBuilder project(Project project) {
//            this.project = project;
//            return this;
//        }
        public SprintEntityBuilder title(String title) {
            this.title = title;
            return this;
        }

        public SprintEntityBuilder miniumStoryPoint(int miniumStoryPoint) {
            this.miniumStoryPoint = miniumStoryPoint;
            return this;
        }

        public SprintEntityBuilder dtPredict(Instant dtPredict) {
            this.dtPredict = dtPredict;
            return this;
        }

        public SprintEntityBuilder position(int position) {
            this.position = position;
            return this;
        }

        public SprintEntityBuilder dtStart(Instant DTStart) {
            this.DTStart = DTStart;
            return this;
        }

        public SprintEntityBuilder dtEnd(Instant DTEnd) {
            this.DTEnd = DTEnd;
            return this;
        }

        public SprintEntityBuilder projectSprints(List<ProjectSprint> projectSprints) {
            this.projectSprints = projectSprints;
            return this;
        }

    }

//    public Project getProject() {
//        return project;
//    }
//
//    public void setProject(Project project) {
//        this.project = project;
//    }


//    public Instant getDTPlanning() {
//        return DTPlanning;
//    }
//
//    public void setDTPlanning(Instant DTPlanning) {
//        this.DTPlanning = DTPlanning;
//    }
//
//    public Instant getDTPreview() {
//        return DTPreview;
//    }
//
//    public void setDTPreview(Instant DTPreview) {
//        this.DTPreview = DTPreview;
//    }


    @Transient
    public List<Project> getProjects() {
        return projectSprints.stream()
                .map(ProjectSprint::getProject)
                .toList();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public List<ProjectSprint> getProjectSprints() {
        return projectSprints;
    }

    public void setProjectSprints(List<ProjectSprint> projectSprints) {
        this.projectSprints = projectSprints;
    }

    public int getMiniumStoryPoint() {
        return miniumStoryPoint;
    }

    public void setMiniumStoryPoint(int miniumStoryPoint) {
        this.miniumStoryPoint = miniumStoryPoint;
    }

    public Instant getDtPredict() {
        return dtPredict;
    }

    public void setDtPredict(Instant dtPredict) {
        this.dtPredict = dtPredict;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

}

