package com.kltn.server.DTO.request.entity.workspace;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

public record WorkspaceUpdateRequest(
    @NotEmpty String description,
    @DateTimeFormat(pattern = LOCAL_DATE_TIME) Instant end) {

  @Override
  public String description() {
    return description;
  }

  @Override
  public Instant end() {
    return end;
  }
}
