package com.kltn.server.mapper.entity;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class DateMapper {

  @Named("instantToLocalDateTime")
  public LocalDateTime instantToLocalDateTime(Instant instant) {
    return instant != null ?
      LocalDateTime.ofInstant(instant, ZoneId.systemDefault()) : null;
  }

  @Named("localDateTimeToInstant")
  public Instant localDateTimeToInstant(LocalDateTime localDateTime) {
    return localDateTime != null ?
      localDateTime.atZone(ZoneId.systemDefault()).toInstant() : null;
  }
}
