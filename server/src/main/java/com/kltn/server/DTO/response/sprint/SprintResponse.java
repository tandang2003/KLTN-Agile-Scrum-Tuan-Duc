package com.kltn.server.DTO.response.sprint;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltn.server.model.collection.model.Topic;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SprintResponse(String id,
        String title,
        Map<String, String> process,
        int position,
        @JsonProperty("minimumStoryPoint") int miniumStoryPoint,
        Instant predict,
        Instant start,
        Instant end,
        Instant planning,
        Instant preview) {
    public static class SprintResponseBuilder {
        private String id;
        private Map<String, String> process;
        private String title;
        private int miniumStoryPoint;
        private int position;
        private Instant predict;
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

        public SprintResponseBuilder miniumStoryPoint(int miniumStoryPoint) {
            this.miniumStoryPoint = miniumStoryPoint;
            return this;
        }

        public SprintResponseBuilder predict(Instant predict) {
            this.predict = predict;
            return this;
        }

        public SprintResponseBuilder process(Map<String, String> process) {
            this.process = process;
            return this;
        }

        public SprintResponseBuilder start(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public SprintResponseBuilder end(Instant dtEnd) {
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

        public SprintResponseBuilder position(int position) {
            this.position = position;
            return this;
        }

        public SprintResponse build() {
            return new SprintResponse(id, title, process, position, miniumStoryPoint, predict, dtStart, dtEnd, planning,
                    preview);
        }
    }

    public static SprintResponseBuilder builder() {
        return new SprintResponseBuilder();
    }

}
