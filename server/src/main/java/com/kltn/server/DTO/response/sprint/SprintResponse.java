package com.kltn.server.DTO.response.sprint;

import com.kltn.server.model.collection.model.Topic;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public record SprintResponse(String id, Map<String, String> process, Instant dtStart, Instant dtEnd) {
    public static class SprintResponseBuilder {
        private String id;
        private Map<String, String> process;
        private Instant dtStart;
        private Instant dtEnd;

        public SprintResponseBuilder id(String id) {
            this.id = id;
            return this;
        }


        public SprintResponseBuilder process(Map<String, String> process) {
            this.process = process;
            return this;
        }

        public SprintResponseBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public SprintResponseBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

        public SprintResponse build() {
            return new SprintResponse(id, process, dtStart, dtEnd);
        }
    }

    public static SprintResponseBuilder builder() {
        return new SprintResponseBuilder();
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public Map<String, String> process() {
        return process;
    }

    @Override
    public Instant dtStart() {
        return dtStart;
    }

    @Override
    public Instant dtEnd() {
        return dtEnd;
    }
}
