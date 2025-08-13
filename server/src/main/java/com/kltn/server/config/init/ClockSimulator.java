package com.kltn.server.config.init;

import java.time.*;

public class ClockSimulator {
  private static final ZoneId ASIA_HO_CHI_MINH = ZoneId.of("Asia/Ho_Chi_Minh");

  private static Instant REAL_BOOT_TIME = Instant.now();
  private static Instant simulatedStartTime;

  private static volatile long timeSpeech;

  public ClockSimulator(long timeSpeech) {
    ClockSimulator.timeSpeech = timeSpeech;
    simulatedStartTime = LocalDateTime.of(2025, 2, 1, 0, 0)
        .atZone(ASIA_HO_CHI_MINH)
        .toInstant();
  }

  public static Instant now() {
    long realElapsedSeconds = Duration.between(REAL_BOOT_TIME, Instant.now()).getSeconds();
    long simulatedElapsedSeconds = realElapsedSeconds * timeSpeech;
    return simulatedStartTime.plusSeconds(simulatedElapsedSeconds);
  }

  public static void setTimeSpeech(long newTimeSpeech) {
    // Adjust simulated start time so "now()" remains consistent
    Instant currentSimulatedNow = now();
    simulatedStartTime = currentSimulatedNow;
    timeSpeech = newTimeSpeech;

    // Reset real time base point
    // so elapsed time is always from the moment of speed change
    // (i.e., now becomes new base real time)
    try {
      java.lang.reflect.Field field = ClockSimulator.class.getDeclaredField("REAL_BOOT_TIME");
      field.setAccessible(true);
      field.set(null, Instant.now());
    } catch (Exception e) {
      throw new RuntimeException("Failed to reset REAL_BOOT_TIME", e);
    }
  }

  public static long getTimeSpeech() {
    return timeSpeech;
  }

  public static LocalDateTime nowAsLocalDateTime() {
    return LocalDateTime.ofInstant(now(), ASIA_HO_CHI_MINH);
  }
}
