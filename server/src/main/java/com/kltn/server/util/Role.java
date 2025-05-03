package com.kltn.server.util;

public enum Role {
    USER("student"),
    ADMIN("admin"),
    TEACHER("teacher"),
    LEADER("leader"),
    MEMBER("member");

    private final String name;

    Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
