package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.dashboard.*;
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
  public ResponseEntity<ApiResponse<DashboardProjectResponse>> getProjects(
      @RequestParam String projectId, @RequestParam(required = false) String sprintId) {
    var response = dashBoardService.getForStudent(projectId, sprintId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/workspace")
  public ResponseEntity<ApiResponse<DashboardWorkspaceResponse>> getWorkspace(
      @RequestParam String workspaceId, @RequestParam(required = false) String sprintId) {
    var response = dashBoardService.getForTeacher(workspaceId, sprintId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/workspace/workload")
  public ResponseEntity<ApiResponse<ApiPaging<Workload>>> getWorkloadPaging(
      @RequestParam String workspaceId,
      @RequestParam(required = false) String sprintId, @RequestParam int page,
      @RequestParam(defaultValue = "10") int size) {
    var response = dashBoardService.getWorkloadForTeacher(workspaceId, sprintId, page, size);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/workspace/project")
  public ResponseEntity<ApiResponse<ApiPaging<ProjectLoad>>> getProjectLoadPaging(
      @RequestParam String workspaceId,
      @RequestParam(required = false) String sprintId, @RequestParam int page,
      @RequestParam(defaultValue = "10") int size) {
    var response = dashBoardService.getProjectLoadForTeacher(workspaceId, sprintId, page, size);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/workspace/project/predict")
  public ResponseEntity<ApiResponse<ApiPaging<ProjectPredictResponse>>> getProjectPredictCurrentPaging(
      @RequestParam String workspaceId,
      @RequestParam int page,
      @RequestParam String sprintId,
      @RequestParam(defaultValue = "10") int size) {
    var response = dashBoardService.getPredictForTeacher(workspaceId, sprintId, page, size);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/workspace/project/predict/current")
  public ResponseEntity<ApiResponse<ProjectPredictResponse>> getProjectPredict(
      @RequestParam String sprintId,
      @RequestParam String projectId) {
    var response = dashBoardService.getPredictForTeacher(sprintId, projectId);
    return ResponseEntity.ok(response);
  }
}
