package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.schedular.SprintScheduler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ConfigController {

  private final SprintScheduler sprintScheduler;

  public ConfigController(SprintScheduler sprintScheduler) {
    this.sprintScheduler = sprintScheduler;
  }

  @PostMapping("config/timespeech")
  public ResponseEntity<ApiResponse<Boolean>> simulateTimeSpeech(@RequestParam int timeSpeech) {
    sprintScheduler.updateTimeSpeech(timeSpeech);
    return ResponseEntity.status(HttpStatus.OK)
                         .build();
  }
}
