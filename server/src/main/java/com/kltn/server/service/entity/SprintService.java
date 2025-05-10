package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintStudentUpdateTimeRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.SprintMapper;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.SprintRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SprintService {
    private SprintMapper sprintMapper;
    private SprintRepository sprintRepository;
    private ProjectService projectService;
    private WorkspaceService workspaceService;
    private ProjectSprintService projectSprintService;

    @Autowired
    public SprintService(WorkspaceService workspaceService, ProjectSprintService projectSprintService,
            SprintMapper sprintMapper, SprintRepository sprintRepository, ProjectService projectService) {
        this.sprintMapper = sprintMapper;
        this.sprintRepository = sprintRepository;
        this.projectService = projectService;
        this.projectSprintService = projectSprintService;
        this.workspaceService = workspaceService;
    }

    @Transactional
    public ApiResponse<SprintResponse> createSprint(SprintCreationRequest sprintCreationRequest) {
        var sprint = sprintMapper.toSprint(sprintCreationRequest);
        var workspace = workspaceService.getWorkspaceById(sprintCreationRequest.workspaceId());
        // sprint.setProject(project);
        sprint.setWorkspace(workspace);
        sprint = sprintRepository.save(sprint);
        Sprint finalSprint = sprint;
        workspace.getProjects().forEach(prj -> {
            projectSprintService.create(prj, finalSprint);
        });

        return ApiResponse.<SprintResponse>builder()
                .code(HttpStatus.CREATED.value())
                .data(sprintMapper.toSprintCreateResponse(sprint))
                .message("Create sprint successfully")
                .build();

    }

    public ApiResponse<SprintResponse> updateSprint(
            @Valid SprintStudentUpdateTimeRequest sprintStudentUpdateTimeRequest) {
        ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
                .projectId(sprintStudentUpdateTimeRequest.projectId())
                .sprintId(sprintStudentUpdateTimeRequest.sprintId()).build());
        projectSprint.setDtPlanning(sprintStudentUpdateTimeRequest.dtPlanning());
        projectSprint.setDtPreview(sprintStudentUpdateTimeRequest.dtPreview());

        projectSprint = projectSprintService.save(projectSprint);
        SprintResponse sprintResponse = sprintMapper.toSprintStudentUpdateResponse(projectSprint);
        return ApiResponse.<SprintResponse>builder()
                .data(sprintResponse)
                .message("Update sprint successfully")
                .build();
    }

    public Sprint getSprintById(String sprintId) {
        return sprintRepository.findById(sprintId)
                .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public ApiResponse<List<SprintResponse>> getListSprintByWorkspaceId(String workspaceId) {
        List<Sprint> list = sprintRepository.findAllByWorkspaceId(workspaceId);
        if (list.isEmpty())
            return ApiResponse.<List<SprintResponse>>builder().data(null).build();
        List<SprintResponse> transferList = list.stream().map(sprintMapper::toSprintCreateResponse).toList();
        return ApiResponse.<List<SprintResponse>>builder().code(HttpStatus.OK.value()).data(transferList).build();

    }

}
