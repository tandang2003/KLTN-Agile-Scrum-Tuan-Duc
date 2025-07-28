package com.kltn.server.DTO.response.message;

import java.time.Instant;

public record TimeMessageResponse(
  int timeSpeech,
  Instant time,
  String senderId,
  String to) {
}
