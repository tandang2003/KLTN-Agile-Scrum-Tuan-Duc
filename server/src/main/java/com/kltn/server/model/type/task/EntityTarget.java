package com.kltn.server.model.type.task;

public enum EntityTarget {
    TASK, PROJECT;

    @Override
    public String toString() {
        return name();
    }
}
