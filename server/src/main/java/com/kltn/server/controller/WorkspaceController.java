package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.request.entity.workspace.WorkspaceUpdationRequest;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.service.entity.UserService;
import com.kltn.server.service.entity.WorkspaceService;
import jakarta.validation.Valid;
import org.apache.kafka.shaded.com.google.protobuf.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<ApiPaging<UserResponse>>> getStudentInWorkspace(@PathVariable String workspaceId, @RequestParam(defaultValue = "0") int page,
                                                                                      @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok().body(
                ApiResponse.<ApiPaging<UserResponse>>builder()
                        .message("get student in workspace success")
                        .data(workspaceService.getStudentInWorkspace(workspaceId, page , size ))
                        .build());
    }


}
