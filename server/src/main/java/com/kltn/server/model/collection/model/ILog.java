package com.kltn.server.model.collection.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"  // Add this to your JSON
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = LogProject.class, name = "project"),
        @JsonSubTypes.Type(value = LogTask.class, name = "task")
})
public abstract class ILog {
    public ILog() {
    }
}
