package com.kltn.server.config.init;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class ClockSimulator {
  private static Instant realTime;
  private static Instant simulatedTime;
  private static volatile long timeSpeech;
  private static ZoneId asiaHoChiMinh = ZoneId.of("Asia/Ho_Chi_Minh");

  public ClockSimulator(long timeSpeech) {
    realTime = getInstantFromLocalDateTime();
    simulatedTime = getInstantFromLocalDateTime();
    ClockSimulator.timeSpeech = timeSpeech;
  }

  public static void setTimeSpeech(long newSpeech) {
    // cập nhật thời gian ảo hiện tại trước
    simulatedTime = now();
    realTime = getInstantFromLocalDateTime();
    timeSpeech = newSpeech;
  }

  public static Instant now() {
    long realElapsedMillis = Duration.between(realTime, getInstantFromLocalDateTime()).toSeconds();
    long simulatedElapsedMillis = realElapsedMillis * timeSpeech;
    return simulatedTime.plusSeconds(simulatedElapsedMillis);
  }

  private static Instant getInstantFromLocalDateTime() {
    return LocalDateTime.now(asiaHoChiMinh).toInstant(ZoneOffset.UTC);
  }

  public static long getTimeSpeech() {
    return timeSpeech;
  }
}
