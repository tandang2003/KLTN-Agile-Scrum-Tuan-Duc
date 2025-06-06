package com.kltn.server.DTO.request.entity.issue;

import com.kltn.server.model.type.task.IssueStatus;

public class IssueUpdateStatusRequest {
    private String id;
    private IssueStatus status;
    private String position;

    public IssueUpdateStatusRequest() {
    }

    public String getId() {
        return id;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public String getPosition() {
        return position;
    }
}
