package com.kltn.server.model.entity;

import com.kltn.server.model.base.BaseEntity;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "sprints")
public class Sprint extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @Column(name ="dt_planning")
    private Instant DTPlanning;
    @Column(name ="dt_preview")
    private Instant DTPreview;
    @Column(name ="dt_start")
    private Instant DTStart;
    @Column(name ="dt_end")
    private Instant DTEnd;
    @OneToMany(mappedBy = "sprint")
    private List<Task> tasks;

    public Sprint(SprintEntityBuilder sprintBuilder) {
        super(sprintBuilder);
        this.project = sprintBuilder.project;
        this.DTPlanning = sprintBuilder.DTPlanning;
        this.DTPreview = sprintBuilder.DTPreview;
        this.DTStart = sprintBuilder.DTStart;
        this.DTEnd = sprintBuilder.DTEnd;
        this.tasks = sprintBuilder.tasks;
    }

    public Sprint() {
    }

    public static class SprintEntityBuilder extends BaseEntityBuilder<Sprint, SprintEntityBuilder> {
        private Project project;
        private Instant DTPlanning;
        private Instant DTPreview;
        private Instant DTStart;
        private Instant DTEnd;
        private List<Task> tasks;

        @Override
        protected SprintEntityBuilder self() {
            return this;
        }

        @Override
        public Sprint build() {
            return new Sprint(this);
        }

        public SprintEntityBuilder project(Project project) {
            this.project = project;
            return this;
        }


        public SprintEntityBuilder DTPlanning(Instant DTPlanning) {
            this.DTPlanning = DTPlanning;
            return this;
        }

        public SprintEntityBuilder DTPreview(Instant DTPreview) {
            this.DTPreview = DTPreview;
            return this;
        }

        public SprintEntityBuilder DTStart(Instant DTStart) {
            this.DTStart = DTStart;
            return this;
        }

        public SprintEntityBuilder DTEnd(Instant DTEnd) {
            this.DTEnd = DTEnd;
            return this;
        }

        public SprintEntityBuilder tasks(List<Task> tasks) {
            this.tasks = tasks;
            return this;
        }

    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


    public Instant getDTPlanning() {
        return DTPlanning;
    }

    public void setDTPlanning(Instant DTPlanning) {
        this.DTPlanning = DTPlanning;
    }

    public Instant getDTPreview() {
        return DTPreview;
    }

    public void setDTPreview(Instant DTPreview) {
        this.DTPreview = DTPreview;
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

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}

