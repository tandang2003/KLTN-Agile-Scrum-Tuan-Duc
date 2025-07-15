package com.kltn.server.DTO.response.resource;

import java.util.List;

public record ResourceSprintAcrossProjectResponse(
  String id,
  String title,
  List<ResourceResponse> daily,
  ResourceResponse backlog
) {

  public static class ResourceSprintAcrossProjectResponseBuilder {
    private String id;
    private String title;
    private List<ResourceResponse> daily;
    private ResourceResponse backlog;

    public ResourceSprintAcrossProjectResponseBuilder id(String id) {
      this.id = id;
      return this;
    }

    public ResourceSprintAcrossProjectResponseBuilder title(String title) {
      this.title = title;
      return this;
    }

    public ResourceSprintAcrossProjectResponseBuilder daily(List<ResourceResponse> daily) {
      this.daily = daily;
      return this;
    }

    public ResourceSprintAcrossProjectResponseBuilder backlog(ResourceResponse backlog) {
      this.backlog = backlog;
      return this;
    }

    public ResourceSprintAcrossProjectResponse build() {
      return new ResourceSprintAcrossProjectResponse(id, title, daily, backlog);
    }
  }

  public static ResourceSprintAcrossProjectResponseBuilder builder() {
    return new ResourceSprintAcrossProjectResponseBuilder();
  }
}

