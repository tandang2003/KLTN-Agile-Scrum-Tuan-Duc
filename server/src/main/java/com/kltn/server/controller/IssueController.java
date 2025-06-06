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
    public IssueController(IssueService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/backlog")
    @PreAuthorize("hasAuthority('create_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> createTaskInBacklog(
            @Valid @RequestBody IssueCreateRequest taskResponse) {
        var task = taskService.createTaskBacklog(taskResponse);
        return ResponseEntity.ok()
                             .body(task);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> createTask(@Valid @RequestBody IssueCreateRequest taskResponse) {
        var task = taskService.createTask(taskResponse);
        return ResponseEntity.ok()
                             .body(task);
    }

    @GetMapping("{issueId}/{sprintId}")
    public ResponseEntity<ApiResponse<IssueDetailResponse>> getIssueDetailById(@PathVariable String issueId,
                                                                               @PathVariable String sprintId) {
        ApiResponse<IssueDetailResponse> task = taskService.getIssueDetailById(
                new IssueDetailRequest(issueId, sprintId));
        return ResponseEntity.status(task.getCode())
                             .body(task);
    }

    @GetMapping("{issueId}")
    public ResponseEntity<ApiResponse<IssueDetailResponse>> getIssueDetailByIdWithoutSprintID(
            @PathVariable String issueId) {
        ApiResponse<IssueDetailResponse> task = taskService.getCurrentIssueDetailById(issueId);
        return ResponseEntity.status(task.getCode())
                             .body(task);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('update_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> updateTask(@Valid @RequestBody IssueUpdateRequest taskResponse) {
        var task = taskService.updateTask(taskResponse);
        return ResponseEntity.status(task.getCode())
                             .body(task);
    }

    @PutMapping("/update-status")
    @PreAuthorize("hasAuthority('update_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> updateTask(@Valid @RequestBody IssueUpdateStatusRequest request) {
        var task = taskService.updateTask(request);
        return ResponseEntity.status(task.getCode())
                             .body(task);
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<IssueResponse>>> getIssues(@RequestParam("project_id") String projectId,
                                                                      @RequestParam(value = "sprint_id", required = false) String sprintId) {
        var issues = taskService.getIssuesBySprintId(new IssueOfSprintRequest(sprintId, projectId));
        return ResponseEntity.status(issues.getCode())
                             .body(issues);
    }

    @PostMapping("/relation")
    public ResponseEntity<ApiResponse<IssueResponse>> relationShipIssue(
            @Valid @RequestBody IssueAssignSprintRequest request) {
        var task = taskService.createRelation(request);
        return ResponseEntity.status(task.getCode())
                             .body(task);
    }


}
