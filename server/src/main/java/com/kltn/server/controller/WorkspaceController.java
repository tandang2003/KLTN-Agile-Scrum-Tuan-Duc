package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUserAdditionRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.model.entity.Project;
import com.kltn.server.service.entity.UserService;
import com.kltn.server.service.entity.WorkspaceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {
    private final WorkspaceService workspaceService;
    private final UserService userService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService, UserService userService) {
        this.workspaceService = workspaceService;
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create_workspace')")
    public ResponseEntity<ApiResponse<WorkspaceResponse>> createWorkspace(
            @Valid @RequestBody WorkspaceCreationRequest workspaceCreationRequest) {
        return ResponseEntity.ok().body(
                ApiResponse.<WorkspaceResponse>builder()
                        .code(HttpStatus.CREATED.value())
                        .message("Create workspace success")
                        .data(workspaceService.createWorkspace(workspaceCreationRequest))
                        .build());
    }

    @GetMapping("/{workspaceId}")
    public ResponseEntity<ApiResponse<WorkspaceResponse>> getWorkspace(@PathVariable String workspaceId) {
        return ResponseEntity.ok().body(
                ApiResponse.<WorkspaceResponse>builder()
                        .message("get workspace success")
                        .data(workspaceService.getWorkspaceById(workspaceId))
                        .build());
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<ApiPaging<WorkspaceResponse>>> listWorkspaces(@RequestParam(defaultValue = "0") int page,
                                                                                    @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok().body(
                ApiResponse.<ApiPaging<WorkspaceResponse>>builder()
                        .message("get list workspaces success")
                        .data(workspaceService.getWorkspaceByOwnerIdPaging(page, size))
                        .build());
    }

    @PutMapping("/{workspaceId}")
    @PreAuthorize("hasAuthority('update_workspace')")
    public ResponseEntity<ApiResponse<WorkspaceResponse>> updateWorkspace(@PathVariable String workspaceId,
                                                                          @Valid @RequestBody WorkspaceUpdationRequest workspaceUpdationRequest
    ) {
        return ResponseEntity.ok().body(
                ApiResponse.<WorkspaceResponse>builder()
                        .message("Workspace and project info retrieved successfully")
                        .data(workspaceService.updateWorkspace(workspaceId, workspaceUpdationRequest))
                        .build());
    }

    @GetMapping("/{workspaceId}/student")
//    @PreAuthorize("hasAuthority('manage_workspace_members')")
    public ResponseEntity<ApiResponse<ApiPaging<UserResponse>>> getStudentInWorkspace(
            @PathVariable String workspaceId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok().body(
                ApiResponse.<ApiPaging<UserResponse>>builder()
                        .message("get student in workspace success")
                        .data(workspaceService.getStudentInWorkspace(workspaceId, page, size))
                        .build());
    }

    @PostMapping("/{workspaceId}/student")
    @PreAuthorize("hasAuthority('manage_workspace_members')")
    public ResponseEntity<ApiResponse<Void>> addStudentToWorkspace(@PathVariable String workspaceId,
                                                                   @Valid @RequestBody
                                                                   WorkspaceUserAdditionRequest
                                                                           workspaceUserAdditionRequest) {
        workspaceService.addStudentToWorkspace(workspaceId, workspaceUserAdditionRequest.studentIds());

        return ResponseEntity.ok().body(
                ApiResponse.<Void>builder()
                        .message("Invite student to workspace")
                        .build());
    }

//    @GetMapping("/{workspaceId}/project")
//    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectInWorkspace(@PathVariable String workspaceId) {
//        return ResponseEntity.ok().body(
//                ApiResponse.<WorkspaceResponse>builder()
//                        .message("get project in workspace success")
//                        .data(workspaceService.getProjectInWorkspace(workspaceId))
//                        .build());
//    }

}
