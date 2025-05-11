package com.kltn.server.model.type.task;

public enum LogType {
    CREATE, UPDATE, DELETE;

    public static LogType fromString(String type) {
        for (LogType logType : LogType.values()) {
            if (logType.name().equalsIgnoreCase(type)) {
                return logType;
            }
        }
        return CREATE;
    }

}
