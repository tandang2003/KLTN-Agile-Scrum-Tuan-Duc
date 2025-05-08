package com.kltn.server.DTO.response.sprint;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kltn.server.model.collection.model.Topic;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SprintResponse(String id,
                             String title,
                             Map<String, String> process,
                             Instant dtStart,
                             Instant dtEnd,
                             Instant planning,
                             Instant preview
) {
    public static class SprintResponseBuilder {
        private String id;
        private Map<String, String> process;
        private String title;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant planning;
        private Instant preview;

        public SprintResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SprintResponseBuilder title(String title) {
            this.title = title;
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

        public SprintResponseBuilder planning(Instant planning) {
            this.planning = planning;
            return this;
        }

        public SprintResponseBuilder preview(Instant preview) {
            this.preview = preview;
            return this;
        }

        public SprintResponse build() {
            return new SprintResponse(id, title, process, dtStart, dtEnd, planning, preview);
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

    @Override
    public Instant planning() {
        return planning;
    }

    @Override
    public Instant preview() {
        return preview;
    }

    @Override
    public String title() {
        return title;
    }
}
