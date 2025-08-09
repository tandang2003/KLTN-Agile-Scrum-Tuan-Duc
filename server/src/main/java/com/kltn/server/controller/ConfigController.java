package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.message.MessageResponse;
import com.kltn.server.DTO.response.message.TimeMessageResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.model.type.task.MessageType;
import com.kltn.server.schedular.PredictScheduler;
import com.kltn.server.schedular.SprintScheduler;
import com.kltn.server.service.message.RoomService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
public class ConfigController {

  private final SprintScheduler sprintScheduler;
  private final RoomService roomService;
  private final ClockSimulator clockSimulator;
  private final PredictScheduler predictScheduler1;

  public ConfigController(SprintScheduler sprintScheduler, RoomService roomService, ClockSimulator clockSimulator, PredictScheduler predictScheduler1) {
    this.sprintScheduler = sprintScheduler;
    this.roomService = roomService;
    this.clockSimulator = clockSimulator;
    this.predictScheduler1 = predictScheduler1;
  }

  @PostMapping("config/timespeech")
  public ResponseEntity<ApiResponse<Instant>> simulateTimeSpeech(@RequestParam("timeSpeech") int timeSpeech,
                                                                 @RequestParam(value = "to", required = false)
                                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                                                 LocalDateTime to,
                                                                 @RequestParam("senderId")
                                                                 String senderId) {
    sprintScheduler.updateTimeSpeech(timeSpeech);
    predictScheduler1.updateTimeSpeech(timeSpeech);
    roomService.sentToApp(new MessageResponse(
      MessageType.TIME,
      new TimeMessageResponse(
        timeSpeech,
        ClockSimulator.now(),
        senderId,
        to != null ? to.format(DateTimeFormatter.ISO_DATE_TIME) : ClockSimulator.nowAsLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME)
      )));
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
