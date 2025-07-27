package com.kltn.server.config.init;

import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ClockPrinter {

  private final ClockSimulator clockSimulator;

  @Autowired
  public ClockPrinter(ClockSimulator clockSimulator) {
    this.clockSimulator = clockSimulator;
  }

  @Scheduled(fixedRate = 1000) // every 2 seconds
  public void printSimulatedTime() {
    System.out.println("Simulated Server Time: " +
        clockSimulator.now());
  }
}