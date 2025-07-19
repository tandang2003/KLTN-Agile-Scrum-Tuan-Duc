package com.kltn.server.DTO.request.entity.sprint;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

import static com.kltn.server.util.constant.DateFormatString.LOCAL_DATE_TIME;

public record SprintStudentUpdateTimeRequest(
        @NotEmpty String projectId,
        @NotEmpty String sprintId,
//        @DateTimeFormat(pattern = LOCAL_DATE_TIME)
//        Instant dtPlanning,
        @DateTimeFormat(pattern = LOCAL_DATE_TIME)
        Instant dtPreview

) {
    public static class SprintStudentUpdateTimeRequestBuilder {
        private String projectId;
        private String sprintId;
//        private Instant dtPlanning;
        private Instant dtPreview;

        public SprintStudentUpdateTimeRequestBuilder projectId(String projectId) {
            this.projectId = projectId;
            return this;
        }

        public SprintStudentUpdateTimeRequestBuilder sprintId(String sprintId) {
            this.sprintId = sprintId;
            return this;
        }

//        public SprintStudentUpdateTimeRequestBuilder dtPlanning(Instant dtPlanning) {
//            this.dtPlanning = dtPlanning;
//            return this;
//        }

        public SprintStudentUpdateTimeRequestBuilder dtPreview(Instant dtPreview) {
            this.dtPreview = dtPreview;
            return this;
        }
        public SprintStudentUpdateTimeRequest build() {
            return new SprintStudentUpdateTimeRequest(projectId, sprintId, dtPreview);
        }
    }

    public static SprintStudentUpdateTimeRequestBuilder builder() {
        return new SprintStudentUpdateTimeRequestBuilder();
    }
}
