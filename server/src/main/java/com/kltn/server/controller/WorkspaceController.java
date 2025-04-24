package com.kltn.server.controller;

import com.kltn.server.DTO.request.workspace.WorkspaceCreationRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.workspace.WorkspaceResponse;
import com.kltn.server.service.entity.WorkspaceService;
import jakarta.validation.Valid;
import org.apache.kafka.shaded.com.google.protobuf.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {
    private final WorkspaceService workspaceService;
    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<WorkspaceResponse>> createWorkspace(@Valid @RequestBody WorkspaceCreationRequest workspaceCreationRequest) {
        return ResponseEntity.ok().body(
                ApiResponse.<WorkspaceResponse>builder()
                        .message("Create workspace success")
                        .data(workspaceService.createWorkspace(workspaceCreationRequest))
                        .build());
    }


}
