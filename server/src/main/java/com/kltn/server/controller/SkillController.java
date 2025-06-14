package com.kltn.server.controller;

import com.kltn.server.DTO.request.entity.skill.SkillRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.skill.PersonalSkillResponse;
import com.kltn.server.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skill")
public class SkillController {
  private SkillService skillService;

  @Autowired
  public SkillController(SkillService skillService) {
    this.skillService = skillService;
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Void>> createSkill(@Valid @RequestBody SkillRequest request) {
    if (request.getProficiency() <= 0) {
      request.setProficiency(1);
    }
    var response = skillService.createSkill(request.getSkillName(), request.getProficiency());
    return ResponseEntity.ok()
                         .body(response);
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse<Void>> deleteSkill(@Valid @RequestBody SkillRequest request) {
    var response = skillService.deleteSkill(request.getSkillName());
    return ResponseEntity.ok()
                         .body(response);
  }

  @PutMapping
  public ResponseEntity<ApiResponse<PersonalSkillResponse>> updateSkill(@Valid @RequestBody SkillRequest request) {
    if (request.getProficiency() <= 0) {
      request.setProficiency(1);
    }
    var response = skillService.updateSkill(request.getSkillName(), request.getProficiency());
    return ResponseEntity.ok()
                         .body(response);
  }

  @GetMapping("/list")
  public ResponseEntity<ApiResponse<List<PersonalSkillResponse>>> getSkills() {
    var response = skillService.getSkills();
    return ResponseEntity.ok()
                         .body(response);
  }
}
