package com.kltn.server.service.entity;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectSprintService {
    private ProjectSprintRepository projectSprintRepository;
    private ProjectService projectService;
    private SprintService sprintService;

    @Autowired
    public ProjectSprintService(ProjectSprintRepository projectSprintRepository) {
        this.projectSprintRepository = projectSprintRepository;
    }

    public ProjectSprint create(Project project, Sprint sprint) {
        ProjectSprintId projectSprintId = ProjectSprintId.builder().sprintId(sprint.getId()).projectId(project.getId()).build();
        ProjectSprint projectSprint = ProjectSprint.builder()
                .id(projectSprintId)
                .project(project)
                .sprint(sprint)
                .build();
        projectSprint = projectSprintRepository.save(projectSprint);
        return projectSprint;
    }

    public ProjectSprint getProjectSprintById(ProjectSprintId projectSprintId) {
        return projectSprintRepository.findById(projectSprintId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND_SPRINT_PROJECT_RELATION).build());
    }

    public ProjectSprint save(ProjectSprint projectSprint) {
        ProjectSprint savedProjectSprint = projectSprintRepository.save(projectSprint);
        if (savedProjectSprint == null || savedProjectSprint.getId() == null) {
            throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
        }
        return savedProjectSprint;
    }

    @Transactional
    public void save(String project, List<String> sprints) {
//        var projectSprintId = ProjectSprintId.builder();
//        projectSprintId.projectId(project);
        sprints.forEach(
                sprintId -> {
//                    projectSprintId.sprintId(sprintId);
//                    ProjectSprint projectSprint = ProjectSprint.builder().id(projectSprintId.build()).build();
                    projectSprintRepository.save(project, sprintId);
                }
        );

    }

//    @Transactional
    public void save(List<String> projectIds, String sprintId) {
//        var projectSprintId = ProjectSprintId.builder();
//        projectSprintId.sprintId(sprintId);
        projectIds.forEach(
                projectId -> {
//                    projectSprintId.projectId(projectId);
//                    ProjectSprint projectSprint = ProjectSprint.builder().id(projectSprintId.build()).build();
                    projectSprintRepository.save(projectId, sprintId);

                }
        );
    }
}
