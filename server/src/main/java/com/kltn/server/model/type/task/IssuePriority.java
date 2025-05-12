package com.kltn.server.model.type.task;

public enum IssuePriority {
    CRITICAL, MAJOR, MINOR, TRIVIAL, BLOCKED;

    public static IssuePriority fromString(String priority) {
        for (IssuePriority issuePriority : IssuePriority.values()) {
            if (issuePriority.name().equalsIgnoreCase(priority)) {
                return issuePriority;
            }
        }
       return CRITICAL;
    }
}
