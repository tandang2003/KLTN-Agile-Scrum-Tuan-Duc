package com.kltn.server.config.init;

import java.time.Duration;
import java.time.Instant;

public class ClockSimulator {
  private Instant realTime;
  private Instant simulatedTime;
  private volatile long timeSpeech;
  public ClockSimulator(long timeSpeech) {
    this.realTime = Instant.now();
    this.simulatedTime = Instant.now();
    this.timeSpeech = timeSpeech;
  }
  public void setTimeSpeech(long newSpeech) {
    // cập nhật thời gian ảo hiện tại trước
    simulatedTime = now();
    realTime = Instant.now();
    this.timeSpeech = newSpeech;
  }
  public Instant now() {
    long realElapsedMillis = Duration.between(realTime, Instant.now()).toSeconds();
    long simulatedElapsedMillis = realElapsedMillis * timeSpeech;
    return simulatedTime.plusSeconds(simulatedElapsedMillis);
  }
}
