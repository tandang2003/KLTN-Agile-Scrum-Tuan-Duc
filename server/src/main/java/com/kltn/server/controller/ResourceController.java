package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.resource.ResourceTaskUploadRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.ResourcePathResponse;
import com.kltn.server.service.entity.ResourceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
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
        return ResponseEntity.ok().body(ApiResponse.<String>builder().code(201).data(LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))).build()); // e.g. 20250521_103015
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<ResourcePathResponse>> getResourceById(@PathVariable  String id) {
        var response = resourceService.getResourceById(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/task/upload")
    public ResponseEntity<ApiResponse<Void>> uploadFile(@RequestBody @Valid ResourceTaskUploadRequest request) {
        var response = resourceService.uploadFile(request);
        return ResponseEntity.ok().body(response);
    }


//    @PostMapping("/project/upload")
//    public ResponseEntity<ApiResponse<Void>> uploadFile(ResourceProjectUploadRequest request) {
//        var response = resourceService.uploadFile(request);
//        return ResponseEntity.ok().body(response);
//    }
//
//    @PostMapping("/sprint/upload")
//    public ResponseEntity<ApiResponse<Void>> uploadFile(ResourceSprintUploadRequest request) {
//        var response = resourceService.uploadFile(request);
//        return ResponseEntity.ok().body(response);
//    }
}
