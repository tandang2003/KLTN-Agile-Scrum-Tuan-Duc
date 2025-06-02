package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.issue.*;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.service.entity.IssueService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("issue")
public class IssueController {
    private IssueService taskService;

    @Autowired
    public IssueController(IssueService taskService, IssueService issueService) {
        this.taskService = taskService;
    }

    @PostMapping("/backlog")
    @PreAuthorize("hasAuthority('create_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> createTaskInBacklog(@Valid @RequestBody IssueCreateRequest taskResponse) {
        var task = taskService.createTaskBacklog(taskResponse);
        return ResponseEntity.ok().body(task);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('create_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> createTask(@Valid @RequestBody IssueCreateRequest taskResponse) {
        var task = taskService.createTask(taskResponse);
        return ResponseEntity.ok().body(task);
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<IssueDetailResponse>> getIssueDetailById(@RequestBody @Valid IssueDetailRequest request) {
        ApiResponse<IssueDetailResponse> task = taskService.getIssueDetailById(request);
        return ResponseEntity.status(task.getCode()).body(task);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('update_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> updateTask(@Valid @RequestBody IssueUpdateRequest taskResponse) {
        var task = taskService.updateTask(taskResponse);
        return ResponseEntity.status(task.getCode()).body(task);
    }

    @PutMapping("/update-status")
    @PreAuthorize("hasAuthority('update_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> updateTask(@Valid @RequestBody IssueUpdateStatusRequest request) {
        var task = taskService.updateTask(request);
        return ResponseEntity.status(task.getCode()).body(task);
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<IssueResponse>>> getIssues(@RequestParam("project_id") String projectId, @RequestParam(value = "sprint_id", required = false) String sprintId) {
        var isssues = taskService.getIssuesBySprintId(new IssueOfSprintRequest(sprintId, projectId));
        return ResponseEntity.status(isssues.getCode()).body(isssues);
    }




}
