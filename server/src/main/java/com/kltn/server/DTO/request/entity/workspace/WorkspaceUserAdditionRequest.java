package com.kltn.server.DTO.request.entity.workspace;

import jakarta.validation.constraints.NotEmpty;

public record WorkspaceUserAdditionRequest(@NotEmpty String[] studentIds) {
    @Override
    public String[] studentIds() {
        return studentIds;
    }
}
