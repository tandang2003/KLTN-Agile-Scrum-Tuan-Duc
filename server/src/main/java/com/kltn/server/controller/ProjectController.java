package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.service.entity.ProjectService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
public class ProjectController {
    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            @RequestBody @Valid ProjectCreationRequest creationRequest) {
        return ResponseEntity.ok().body(projectService.createProject(creationRequest));
    }

    @PostMapping("/invite")
    public ResponseEntity<ApiResponse<Void>> addUserToProject(
            @RequestBody @Valid ProjectInvitationRequest invitationRequest) {
        return ResponseEntity.ok().body(
                projectService.inviteUserToProject(invitationRequest));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable String projectId) {
        ApiResponse<ProjectResponse> projectResponse = projectService.getById(projectId);
        return ResponseEntity.status(projectResponse.getCode()).body(projectResponse);
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectIdJoinedByWorkspaceId(
            @RequestParam("workspaceId") String workspaceId) {
        return ResponseEntity.ok().body(this.projectService.getWorkspaceByWorkspaceId(workspaceId));
    }
}
