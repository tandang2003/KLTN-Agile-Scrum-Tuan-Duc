package com.kltn.server.controller;

import java.util.List;
import java.util.Map;

import com.kltn.server.model.collection.SprintBoard;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.notification.NotificationResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.resource.ResourceOfSprintResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.mongo.ProjectMongoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/project")
public class ProjectController {
  private ProjectService projectService;
  private ProjectMongoService projectMongoService;

  @Autowired
  public ProjectController(ProjectService projectService, ProjectMongoService projectMongoService) {
    this.projectService = projectService;
    this.projectMongoService = projectMongoService;
  }

  @PostMapping
  public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
      @RequestBody @Valid ProjectCreationRequest creationRequest) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(projectService.createProject(creationRequest));
  }

  @PostMapping("/invite")
  public ResponseEntity<ApiResponse<Void>> addUserToProject(
      @RequestBody @Valid ProjectInvitationRequest invitationRequest) {
    return ResponseEntity.ok()
        .body(projectService.inviteUserToProject(invitationRequest));
  }

  @GetMapping("/{projectId}")
  public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable String projectId) {
    ApiResponse<ProjectResponse> projectResponse = projectService.getById(projectId);
    return ResponseEntity.status(projectResponse.getCode())
        .body(projectResponse);
  }


  @GetMapping("/{projectId}/members")
  // @PreAuthorize("hasAuthority('assign_project_members')")
  public ResponseEntity<ApiResponse<List<UserResponse>>> getMembersOfProject(@PathVariable String projectId) {
    ApiResponse<List<UserResponse>> members = projectService.getMembersOfProject(projectId);
    return ResponseEntity.status(members.getCode())
        .body(members);
  }

  @GetMapping("/{project_id}/position")
  public ResponseEntity<Map<String, SprintBoard>> getPosition(@PathVariable("project_id") String projectId) {
    return ResponseEntity.ok(this.projectMongoService.getPosition(projectId));
  }

  @PutMapping("/{project_id}/position")
  public ResponseEntity<ApiResponse<Void>> savePosition(@PathVariable("project_id") String projectId,
      @RequestBody Map<String, SprintBoard> body) {
    this.projectMongoService.savePosition(projectId, body);
    return ResponseEntity.ok(ApiResponse.<Void>builder().build());
  }

  @GetMapping("/{projectId}/{sprintId}/resource")
  public ResponseEntity<ApiResponse<ResourceOfSprintResponse>> getResourceByProjectAndSprint(
      @PathVariable String projectId, @PathVariable String sprintId) {
    ApiResponse<ResourceOfSprintResponse> resource = projectService.getResourceByProjectAndSprint(projectId, sprintId);
    return ResponseEntity.status(resource.getCode())
        .body(resource);
  }

  @GetMapping("/{projectId}/notification")
  public ResponseEntity<ApiResponse<ApiPaging<NotificationResponse>>> getNotification(@PathVariable String projectId,
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
    var paging = this.projectMongoService.getNotification(projectId, page, size);
    return ResponseEntity.status(paging.getCode()).body(paging);
  }
}
