package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.resource.DailyResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceTaskStoringRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.ResourcePathResponse;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.DTO.response.resource.ResourceSignatureResponse;
import com.kltn.server.service.entity.ResourceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/resource")
public class ResourceController {
  private ResourceService resourceService;

  @Autowired
  public ResourceController(ResourceService resourceService) {
    this.resourceService = resourceService;
  }

  @GetMapping("unique-sail")
  public ResponseEntity<ApiResponse<String>> getUniqueSail() {
    return ResponseEntity.ok()
                         .body(ApiResponse.<String>builder()
                                          .code(201)
                                          .data(LocalDateTime.now()
                                                             .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")))
                                          .build()); // e.g. 20250521_103015
  }

  @GetMapping("{id}")
  public ResponseEntity<ApiResponse<ResourcePathResponse>> getResourceById(@PathVariable String id) {
    var response = resourceService.getResourceById(id);
    return ResponseEntity.ok()
                         .body(response);
  }

  @PostMapping("/issue")
  public ResponseEntity<ApiResponse<ResourceResponse>> storeResource(
    @RequestBody @Valid ResourceTaskStoringRequest request) {
    var response = resourceService.uploadFileToTask(request);
    return ResponseEntity.ok()
                         .body(response);
  }

  @PostMapping("signature")
  public ResponseEntity<ApiResponse<ResourceSignatureResponse>> getSignature(
    @RequestBody ResourceSignatureRequest request) {
    var response = resourceService.getSignature(request);
    return ResponseEntity.ok()
                         .body(response);
  }

  @PostMapping("daily")
  public ResponseEntity<ApiResponse<ResourceResponse>> uploadDailyFile(
    @RequestBody DailyResourceSignatureRequest request) {
    var response = resourceService.uploadFileToDailySprint(request);
    return ResponseEntity.ok()
                         .body(response);
  }


  @PostMapping("backlog")
  public ResponseEntity<ApiResponse<ResourceResponse>> uploadBacklogFile(
    @RequestBody DailyResourceSignatureRequest request) {
    var response = resourceService.uploadFileToBacklogSprint(request);
    return ResponseEntity.ok()
                         .body(response);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<ApiResponse<Void>> deleteResource(@PathVariable String id) {
    resourceService.deleteFileToDailySprint(id);
    return ResponseEntity.ok()
                         .body(ApiResponse.<Void>builder()
                                          .code(200)
                                          .message("Delete resource successfully")
                                          .build());
  }

}
