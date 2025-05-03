package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.document.ProjectLogRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.RoleRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private ProjectMapper projectMapper;
    private TopicMapper topicMapper;
    private ProjectRepository projectRepository;
    private WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
    private RoleRepository roleRepository;

    @Autowired
    public ProjectService(TopicMapper topicMapper, RoleRepository roleRepository, ProjectMapper projectMapper, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, ProjectRepository projectRepository) {
        this.roleRepository = roleRepository;
        this.topicMapper = topicMapper;
        this.projectMapper = projectMapper;
        this.projectRepository = projectRepository;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    }

    @SendKafkaEvent(topic = "project-created")
    public ApiResponse<ProjectResponse> createProject(ProjectCreationRequest creationRequest) {
        var project = projectMapper.toEntity(creationRequest);
        var savedProject = projectRepository.save(project);

        if (savedProject.getId() == null || savedProject.getId().isEmpty()) {
            throw new RuntimeException("Failed to create project");
        }
        WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
                .workspaceId(creationRequest.workspaceId())
                .userId(creationRequest.userId())
                .build();

        WorkspacesUsersProjects workspacesUsersProjects = workspacesUsersProjectsRepository.findById(workspacesUsersId)
                .orElseThrow(() -> AppException.builder()
                        .error(Error.NOT_FOUND)
                        .build());

        if (workspacesUsersProjects.getProject() != null) {
            throw AppException.builder()
                    .error(Error.ALREADY_EXISTS)
                    .build();
        }

        workspacesUsersProjects.setProject(savedProject);
        workspacesUsersProjects.setRole(roleRepository.getByName(Role.LEADER.getName()).orElseThrow(() -> AppException.builder().error(Error.SERVER_ERROR).build()));

        workspacesUsersProjectsRepository.save(workspacesUsersProjects);
        List<Topic> topics = topicMapper.toTopicList(creationRequest.tags());
        var logProject = ProjectLogRequest.builder()
                .projectId(project.getId())
                .description(project.getDescription())
                .tags(
                        topics
                ).build();

        return ApiResponse.<ProjectResponse>builder()
                .message("Create project success")
                .data(projectMapper.toCreationResponse(savedProject, topics))
                .logData(logProject)
                .build()
                ;
    }
}
