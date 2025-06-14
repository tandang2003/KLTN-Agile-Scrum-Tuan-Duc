package com.kltn.server.DTO.response.resource;

import java.util.List;

public record ResourceOfSprintResponse(List<ResourceResponse> daily,
                                       ResourceResponse fileBacklog) {
  public static ResourceOfSprintResponseBuilder builder() {
    return new ResourceOfSprintResponseBuilder();
  }

  public static class ResourceOfSprintResponseBuilder {
    private List<ResourceResponse> daily;
    private ResourceResponse fileBacklog;

    public ResourceOfSprintResponseBuilder daily(List<ResourceResponse> daily) {
      this.daily = daily;
      return this;
    }

    public ResourceOfSprintResponseBuilder fileBacklog(ResourceResponse fileBacklog) {
      this.fileBacklog = fileBacklog;
      return this;
    }

    public ResourceOfSprintResponse build() {
      return new ResourceOfSprintResponse(this.daily, this.fileBacklog);
    }
  }
}
