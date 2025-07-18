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
                             String description,
                             int storyPoint,
                             Instant predict,
                             Instant start,
                             Instant end,
                             Instant planning,
                             Instant preview
) {
    public static class SprintResponseBuilder {
        private String id;
        private Map<String, String> process;
        private String title;
        private String description;
        private int storyPoint;
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

        public SprintResponseBuilder storyPoint(int storyPoint) {
            this.storyPoint = storyPoint;
            return this;
        }

public SprintResponseBuilder description(String description) {
          this.description = description;
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


        public SprintResponse build() {
            return new SprintResponse(id, title, process,description, storyPoint, predict, dtStart, dtEnd, planning,
                    preview);
        }
    }

    public static SprintResponseBuilder builder() {
        return new SprintResponseBuilder();
    }

}
