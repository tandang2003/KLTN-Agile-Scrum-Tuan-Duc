package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.service.DecisionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("decision")
public class DecisionController {

  private final DecisionService decisionService;

  public DecisionController(DecisionService decisionService) {
    this.decisionService = decisionService;
  }

  @GetMapping("{projectId}/{sprintId}/predict")
  public ResponseEntity<ApiResponse<Void>> makePredict(@PathVariable String projectId, @PathVariable String sprintId) {
    var response = decisionService.makePredict(projectId, sprintId);

    // Placeholder for decision logic
    return ResponseEntity.ok(ApiResponse.<Void>builder()
                                        .code(200)
                                        .message("Decision retrieved successfully")
                                        .data(null)
                                        .build());
  }
}
