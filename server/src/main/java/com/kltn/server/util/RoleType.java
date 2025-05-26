package com.kltn.server.util;

public enum RoleType {
    USER("student"),
    ADMIN("admin"),
    TEACHER("teacher"),
    LEADER("leader"),
    MEMBER("member");

    private final String name;

    RoleType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
