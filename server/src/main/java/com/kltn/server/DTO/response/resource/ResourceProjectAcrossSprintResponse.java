package com.kltn.server.DTO.response.resource;

import java.util.List;

public record ResourceProjectAcrossSprintResponse (String id,
  String name,
  List<ResourceResponse> daily,
ResourceResponse backlog
) {

public static class ResourceProjectAcrossSprintResponseBuilder {
  private String id;
  private String name;
  private List<ResourceResponse> daily;
  private ResourceResponse backlog;

  public ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder id(String id) {
    this.id = id;
    return this;
  }

  public ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder name(String name) {
    this.name = name;
    return this;
  }

  public ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder daily(List<ResourceResponse> daily) {
    this.daily = daily;
    return this;
  }

  public ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder backlog(ResourceResponse backlog) {
    this.backlog = backlog;
    return this;
  }

  public ResourceProjectAcrossSprintResponse build() {
    return new ResourceProjectAcrossSprintResponse(id, name, daily, backlog);
  }
}

public static ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder builder() {
  return new ResourceProjectAcrossSprintResponse.ResourceProjectAcrossSprintResponseBuilder();
}
}
