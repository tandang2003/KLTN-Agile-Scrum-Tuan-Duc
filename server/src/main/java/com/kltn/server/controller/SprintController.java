package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.issue.IssueOfSprintRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintStudentUpdateTimeRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintTeacherUpdateTimeRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.service.entity.SprintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/sprint")
public class SprintController {
    private SprintService sprintService;

    @Autowired
    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create_sprint')")
    public ResponseEntity<ApiResponse<SprintResponse>> createSprint(
            @RequestBody @Valid SprintCreationRequest sprintCreationRequest) {
        var sprint = sprintService.createSprint(sprintCreationRequest);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }

    @PutMapping("student/update")
    @PreAuthorize("hasAuthority('update_sprint')")
    public ResponseEntity<ApiResponse<SprintResponse>> updateSprint(
            @RequestBody @Valid SprintStudentUpdateTimeRequest sprintStudentUpdateTimeRequest) {
        var sprint = sprintService.studentUpdateSprint(sprintStudentUpdateTimeRequest);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }

    @PutMapping("teacher/update")
    @PreAuthorize("hasRole('TEACHER') ")
    public ResponseEntity<ApiResponse<SprintResponse>> updateSprint(
            @RequestBody @Valid SprintTeacherUpdateTimeRequest sprintStudentUpdateTimeRequest) {
        var sprint = sprintService.teacherUpdateSprint(sprintStudentUpdateTimeRequest);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<SprintResponse>>> getList(@RequestParam("workspace_id") String workspaceId) {
        var sprint = sprintService.getListSprintByWorkspaceId(workspaceId);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }



}
