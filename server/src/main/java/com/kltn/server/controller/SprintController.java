package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintStudentUpdateTimeRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.service.entity.SprintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ApiResponse<SprintResponse>> createSprint(@RequestBody @Valid SprintCreationRequest sprintCreationRequest) {
        var sprint = sprintService.createSprint(sprintCreationRequest);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }

    @PutMapping("student/update")
    @PreAuthorize("hasAuthority('update_sprint')")
    public ResponseEntity<ApiResponse<SprintResponse>> updateSprint(@RequestBody @Valid SprintStudentUpdateTimeRequest sprintStudentUpdateTimeRequest) {
        var sprint = sprintService.updateSprint(sprintStudentUpdateTimeRequest);
        return ResponseEntity.status(sprint.getCode()).body(sprint);
    }
}
