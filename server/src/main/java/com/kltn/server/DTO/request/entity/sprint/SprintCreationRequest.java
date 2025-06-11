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
public record SprintCreationRequest(@NotEmpty String workspaceId,
                                    String title,
                                    @DateTimeFormat(pattern = LOCAL_DATE_TIME) Instant start,
                                    @DateTimeFormat(pattern = LOCAL_DATE_TIME) Instant end,
                                    int storyPoint,
                                    @DateTimeFormat(pattern = LOCAL_DATE_TIME) Instant predict,
                                    int position) {


  public static class SprintCreationRequestBuilder {
    private String workspaceId;
    private String title;
    private Instant dtStart;
    private Instant dtEnd;
    private Instant predict;
    private int storyPoint;
    private int position;

    public SprintCreationRequestBuilder workspaceId(String workspaceId) {
      this.workspaceId = workspaceId;
      return this;
    }

    public SprintCreationRequestBuilder title(String title) {
      this.title = title;
      return this;
    }

    public SprintCreationRequestBuilder storyPoint(int storyPoint) {
      this.storyPoint = storyPoint;
      return this;
    }

    public SprintCreationRequestBuilder predict(Instant predict) {
      this.predict = predict;
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

    public SprintCreationRequestBuilder position(int position) {
      this.position = position;
      return this;
    }

    public SprintCreationRequest build() {
      return new SprintCreationRequest(workspaceId, title, dtStart, dtEnd, storyPoint, predict, position);
    }

  }

  public static SprintCreationRequestBuilder builder() {
    return new SprintCreationRequestBuilder();
  }

}
