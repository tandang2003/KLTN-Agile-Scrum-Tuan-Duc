package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.schedular.SprintScheduler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class ConfigController {

  private final SprintScheduler sprintScheduler;

  public ConfigController(SprintScheduler sprintScheduler) {
    this.sprintScheduler = sprintScheduler;
  }

  @PostMapping("config/timespeech")
  public ResponseEntity<ApiResponse<Instant>> simulateTimeSpeech(@RequestParam int timeSpeech) {
    sprintScheduler.updateTimeSpeech(timeSpeech);
    return ResponseEntity.status(HttpStatus.OK)
        .body(ApiResponse.<Instant>builder().data(ClockSimulator.now()).build());
  }

  @GetMapping("config/timespeech")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getSimulateTimeSpeech() {
    return ResponseEntity.status(HttpStatus.OK)
        .body(ApiResponse.<Map<String, Object>>builder()
            .data(Map.of("timeSpeech", ClockSimulator.getTimeSpeech(), "now", ClockSimulator.now())).build());
  }
}
