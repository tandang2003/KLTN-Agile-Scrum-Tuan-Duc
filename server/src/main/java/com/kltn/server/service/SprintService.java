package com.kltn.server.service;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintStudentUpdateTimeRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.sprint.SprintCreateResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.SprintMapper;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.entity.ProjectSprintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SprintService {
    private SprintMapper sprintMapper;
    private SprintRepository sprintRepository;
    private ProjectService projectService;
    private ProjectSprintService projectSprintService;

    @Autowired
    public SprintService(ProjectSprintService projectSprintService, SprintMapper sprintMapper, SprintRepository sprintRepository, ProjectService projectService) {
        this.sprintMapper = sprintMapper;
        this.sprintRepository = sprintRepository;
        this.projectService = projectService;
        this.projectSprintService = projectSprintService;
    }

    public ApiResponse<SprintResponse> createSprint(SprintCreationRequest sprintCreationRequest) {
        var sprint = sprintMapper.toSprint(sprintCreationRequest);
        var project = projectService.getProjectById(sprintCreationRequest.projectId());
//        sprint.setProject(project);
        sprint = sprintRepository.save(sprint);
        ProjectSprint projectSprint = projectSprintService.create(project, sprint);

        return ApiResponse.<SprintResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(sprintMapper.toSprintCreateResponse(sprint))
                .message("Create sprint successfully")
                .build();


    }

    public ApiResponse<SprintResponse> updateSprint(@Valid SprintStudentUpdateTimeRequest sprintStudentUpdateTimeRequest) {
        ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
                .projectId(sprintStudentUpdateTimeRequest.projectId())
                .sprintId(sprintStudentUpdateTimeRequest.sprintId()).build());
        projectSprint.setDtPlanning(sprintStudentUpdateTimeRequest.dtPlanning());
        projectSprint.setDtPreview(sprintStudentUpdateTimeRequest.dtPreview());

        projectSprint = projectSprintService.save(projectSprint);
        SprintResponse sprintResponse = sprintMapper.toSprintResponse(projectSprint);
        return ApiResponse.<SprintResponse>builder()
                .data(sprintResponse)
                .message("Update sprint successfully")
                .build();
    }

    public Sprint getSprintById(String sprintId) {
        return sprintRepository.findById(sprintId).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }
}
