package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.dashboard.DashboardResponse;
import com.kltn.server.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/dashboard")
public class DashboardController {

  private final DashBoardService dashBoardService;

  @Autowired
  public DashboardController(DashBoardService dashBoardService) {
    this.dashBoardService = dashBoardService;
  }

  @GetMapping("/project")
  public ResponseEntity<ApiResponse<DashboardResponse>> getProjects(
      @RequestParam String projectId, @RequestParam(required = false) String sprintId) {
    var response = dashBoardService.getForStudent(projectId, sprintId);
    return ResponseEntity.ok(response);
  }

}
