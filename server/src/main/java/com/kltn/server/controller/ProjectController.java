package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.model.entity.User;
import com.kltn.server.service.entity.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.ok().body(
                projectService.inviteUserToProject(invitationRequest));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable String projectId) {
        ApiResponse<ProjectResponse> projectResponse = projectService.getById(projectId);
        return ResponseEntity.status(projectResponse.getCode()).body(projectResponse);
    }

    @GetMapping("/{projectId}/members")
    @PreAuthorize("hasAuthority('assign_project_members')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getMembersOfProject(@PathVariable String projectId) {
        ApiResponse<List<UserResponse>> members = projectService.getMembersOfProject(projectId);
        return ResponseEntity.status(members.getCode()).body(members);
    }

}
