package com.kltn.server.model.type.task;

public enum IssueStatus {
    BACKLOG, TODO, INPROCESS, REVIEW, DONE;
    public static IssueStatus fromString(String status) {
        for (IssueStatus taskStatus : IssueStatus.values()) {
            if (taskStatus.name().equalsIgnoreCase(status)) {
                return taskStatus;
            }
        }
        return BACKLOG;
    }
}
