package com.kltn.server.DTO.response.project;

import com.kltn.server.model.type.task.ProjectMessageType;

public record ProjectMessageResponse(
    ProjectMessageType type,
    Object message) {
}
