package com.kltn.server.DTO.response.message;

import com.kltn.server.model.type.task.MessageType;

public record MessageResponse(
    MessageType type,
    Object message) {
}
