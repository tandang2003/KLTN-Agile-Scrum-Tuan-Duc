package com.kltn.server.DTO.request.entity.issue;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.bind.DefaultValue;

public record IssueCreateRequest(@NotEmpty String name,
                                 @NotEmpty String projectId,
                                 @NotEmpty String sprintId,
                                 @DefaultValue(value = "Backlog") String status,
                                 String priority,
                                 @NotEmpty String description,
                                 @NotEmpty String assigneeId,
                                 @NotEmpty String reviewerId,
                                 String start,
                                 String end) {


}
