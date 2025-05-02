package com.kltn.server.model.entity.embeddedKey;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class WorkspacesUsersId implements Serializable {
    private String workspaceId;
    private String userId;

    public WorkspacesUsersId() {
    }

    public WorkspacesUsersId(String workspaceId, String userId) {
        this.workspaceId = workspaceId;
        this.userId = userId;
    }

    // equals() and hashCode() are required for composite keys
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WorkspacesUsersId)) return false;
        WorkspacesUsersId that = (WorkspacesUsersId) o;
        return Objects.equals(workspaceId, that.workspaceId) &&
                Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workspaceId, userId);
    }

    public String getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
