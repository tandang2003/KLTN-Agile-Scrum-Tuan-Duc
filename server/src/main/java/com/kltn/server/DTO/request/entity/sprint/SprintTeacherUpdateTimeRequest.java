package com.kltn.server.DTO.request.entity.sprint;

import com.kltn.server.util.constant.DateConstraint;
import com.kltn.server.util.validation.ValidTimeRangeValidator;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

@ValidTimeRangeValidator(mainField = "start", dependencyField = "end", constraint = DateConstraint.BEFORE)
@ValidTimeRangeValidator(mainField = "end", dependencyField = "start", constraint = DateConstraint.AFTER)
@ValidTimeRangeValidator(mainField = "predict", dependencyField = "start", constraint = DateConstraint.AFTER)
@ValidTimeRangeValidator(mainField = "start", constraint = DateConstraint.AFTER_NOW)
public record SprintTeacherUpdateTimeRequest(String id,
                                             String title,
                                             String description,
                                             @DateTimeFormat(pattern = LOCAL_DATE_TIME)
                                             Instant start,
                                             @DateTimeFormat(pattern = LOCAL_DATE_TIME)
                                             Instant end,
                                             int storyPoint,
                                             @DateTimeFormat(pattern = LOCAL_DATE_TIME)
                                             Instant predict,
                                             int position
) {

    public static class SprintTeacherUpdateTimeRequestBuilder {
        private String id;
        private String title;
        private String description;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant predict;
        private int storyPoint;
        private int position;


        public SprintTeacherUpdateTimeRequestBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder position(int position) {
            this.position = position;
            return this;
        }


        public SprintTeacherUpdateTimeRequestBuilder title(String title) {
            this.title = title;
            return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder description(String description) {
          this.description = description;
          return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder storyPoint(int storyPoint) {
            this.storyPoint = storyPoint;
            return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder predict(Instant predict) {
            this.predict = predict;
            return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public SprintTeacherUpdateTimeRequestBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }


        public SprintTeacherUpdateTimeRequest build() {
            return new SprintTeacherUpdateTimeRequest(id, title, description,dtStart, dtEnd, storyPoint, predict, position);
        }

    }

    public static SprintTeacherUpdateTimeRequestBuilder builder() {
        return new SprintTeacherUpdateTimeRequestBuilder();
    }
}
