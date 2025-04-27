package com.kltn.server.DTO.request.entity.workspace;

import com.kltn.server.util.constant.DateConstraint;
import com.kltn.server.util.validation.ValidTimeRangeValidator;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

@ValidTimeRangeValidator(mainField = "start", dependencyField = "end", constraint = DateConstraint.BEFORE)
@ValidTimeRangeValidator(mainField = "end", dependencyField = "start", constraint = DateConstraint.AFTER)
public record WorkspaceCreationRequest(
        @NotEmpty String name,
        @NotEmpty String description,
        @Min(1) int sprintNum,
        @Min(1) int timePerSprint,
        @DateTimeFormat(pattern = LOCAL_DATE_TIME)
        Instant start,
        @DateTimeFormat(pattern = LOCAL_DATE_TIME)
        Instant end
) {
    @Override
    public String name() {
        return name;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public int sprintNum() {
        return sprintNum;
    }

    @Override
    public int timePerSprint() {
        return timePerSprint;
    }

    @Override
    public Instant start() {
        return start;
    }

    @Override
    public Instant end() {
        return end;
    }
}
