package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.service.entity.ProjectService;
import jakarta.validation.Valid;
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
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(@RequestBody @Valid ProjectCreationRequest creationRequest) {
        return ResponseEntity.ok().body(projectService.createProject(creationRequest));
    }
    @PostMapping("/invite")
    public ResponseEntity<ApiResponse<Void>> addUserToProject(@RequestBody @Valid ProjectInvitationRequest invitationRequest) {
        projectService.inviteUserToProject(invitationRequest);
        return ResponseEntity.ok().body(
                ApiResponse.<Void>builder()
                        .message("Invite student to project")
                        .build());
    }

}
