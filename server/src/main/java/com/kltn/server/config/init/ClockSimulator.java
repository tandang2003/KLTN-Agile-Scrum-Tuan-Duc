package com.kltn.server.config.init;

import java.time.Duration;
import java.time.Instant;

public class ClockSimulator {
  private static Instant realTime;
  private static Instant simulatedTime;
  private static volatile long timeSpeech;
  public ClockSimulator(long timeSpeech) {
    realTime = Instant.now();
    simulatedTime = Instant.now();
    ClockSimulator.timeSpeech = timeSpeech;
  }
  public static void setTimeSpeech(long newSpeech) {
    // cập nhật thời gian ảo hiện tại trước
    simulatedTime = now();
    realTime = Instant.now();
    timeSpeech = newSpeech;
  }
  public static Instant now() {
    long realElapsedMillis = Duration.between(realTime, Instant.now()).toSeconds();
    long simulatedElapsedMillis = realElapsedMillis * timeSpeech;
    return simulatedTime.plusSeconds(simulatedElapsedMillis);
  }

  public static long getTimeSpeech() {
    return timeSpeech;
  }
}
