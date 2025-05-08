package com.kltn.server.DTO.request.entity.sprint;

import com.kltn.server.util.constant.DateConstraint;
import com.kltn.server.util.validation.ValidTimeRangeValidator;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

@ValidTimeRangeValidator(mainField = "start", dependencyField = "end", constraint = DateConstraint.BEFORE)
@ValidTimeRangeValidator(mainField = "end", dependencyField = "start", constraint = DateConstraint.AFTER)
public record SprintCreationRequest(@NotEmpty String projectId,
                                    String title,
                                    @DateTimeFormat(pattern = LOCAL_DATE_TIME)
                                    Instant start,
                                    @DateTimeFormat(pattern = LOCAL_DATE_TIME)
                                    Instant end
) {


    public static class SprintCreationRequestBuilder {
        private String projectId;
        private String title;
        private Instant dtStart;
        private Instant dtEnd;
        private Instant dtPlanning;
        private Instant dtPreview;

        public SprintCreationRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public SprintCreationRequestBuilder title(String title) {
            this.title = title;
            return this;
        }

        public SprintCreationRequestBuilder dtStart(Instant dtStart) {
            this.dtStart = dtStart;
            return this;
        }

        public SprintCreationRequestBuilder dtEnd(Instant dtEnd) {
            this.dtEnd = dtEnd;
            return this;
        }

        public SprintCreationRequestBuilder dtPlanning(Instant dtPlanning) {
            this.dtPlanning = dtPlanning;
            return this;
        }

        public SprintCreationRequestBuilder dtPreview(Instant dtPreview) {
            this.dtPreview = dtPreview;
            return this;
        }

        public SprintCreationRequest build() {
            return new SprintCreationRequest(projectId, title, dtStart, dtEnd);
        }

    }
    public static SprintCreationRequestBuilder builder() {
        return new SprintCreationRequestBuilder();
    }


    @Override
    public String projectId() {
        return projectId;
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
