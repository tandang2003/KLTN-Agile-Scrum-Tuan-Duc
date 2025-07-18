package com.kltn.server.model.type.task;

public enum IssueTag {
    THEORY, PRACTICE;

    public static IssueTag fromString(String tag) {
        for (IssueTag issueTag : IssueTag.values()) {
            if (issueTag.name().equalsIgnoreCase(tag)) {
                return issueTag;
            }
        }
        return THEORY;
    }

}
