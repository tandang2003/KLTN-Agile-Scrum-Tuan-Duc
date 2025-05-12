package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.service.entity.IssueService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("issue")
public class IssueController {
    private IssueService taskService;

    @Autowired
    public IssueController(IssueService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create_task')")
    public ResponseEntity<ApiResponse<IssueResponse>> createTask(@Valid @RequestBody IssueCreateRequest taskResponse) {
        var task = taskService.createTask(taskResponse);
        return ResponseEntity.ok().body(task);
    }



}
