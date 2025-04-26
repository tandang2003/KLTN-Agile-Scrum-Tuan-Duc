package com.kltn.server.controller;

import com.kltn.server.DTO.request.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.service.entity.WorkspaceService;
import jakarta.validation.Valid;
import org.apache.kafka.shaded.com.google.protobuf.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
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
    public ResponseEntity<ApiResponse<List<WorkspaceResponse>>> listWorkspaces(@RequestParam(defaultValue = "0") int page,
                                                                               @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok().body(
                ApiResponse.<List<WorkspaceResponse>>builder()
                        .message("get list workspaces success")
                        .data(workspaceService.getWorkspaceByOwnerIdPaging(page,size))
                        .build());
    }

}
