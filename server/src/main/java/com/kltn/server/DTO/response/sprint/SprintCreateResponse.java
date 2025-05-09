package com.kltn.server.DTO.response.sprint;

import java.time.Instant;

public record SprintCreateResponse(String id, String title, Instant start, Instant end) {
    public static class SprintCreateResponseBuilder {
        private String id;
        private String title;
        private Instant start;
        private Instant end;

        public SprintCreateResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SprintCreateResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public SprintCreateResponseBuilder start(Instant start) {
            this.start = start;
            return this;
        }

        public SprintCreateResponseBuilder end(Instant end) {
            this.end = end;
            return this;
        }

        public SprintCreateResponse build() {
            return new SprintCreateResponse(id, title, start, end);
        }
    }

    public static SprintCreateResponseBuilder builder() {
        return new SprintCreateResponseBuilder();
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public Instant start() {
        return start;
    }

    @Override
    public Instant end() {
        return end;
    }
}
