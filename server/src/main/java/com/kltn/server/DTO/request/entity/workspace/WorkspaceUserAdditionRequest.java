package com.kltn.server.DTO.request.entity.workspace;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record WorkspaceUserAdditionRequest(
        @NotBlank String workspaceId,
        @NotEmpty String[] studentIds) {
    @Override
    public String[] studentIds() {
        return studentIds;
    }

    @Override
    public String workspaceId() {
        return workspaceId;
    }
}
