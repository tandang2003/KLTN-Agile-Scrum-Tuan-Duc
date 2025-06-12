package com.kltn.server.DTO.request.entity.resource;

import com.kltn.server.model.type.resource.ContentType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class DailyResourceSignatureRequest {
  @NotEmpty
  private String name;
  @NotEmpty
  private String extension;
  @NotNull
  @Enumerated(EnumType.STRING)
  private ContentType contentType;
  @NotNull
  private long size;
  private String projectId;
  private String sprintId;
  private String publicId;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getExtension() {
    return extension;
  }

  public void setExtension(String extension) {
    this.extension = extension;
  }

  public ContentType getContentType() {
    return contentType;
  }

  public void setContentType(ContentType contentType) {
    this.contentType = contentType;
  }

  public long getSize() {
    return size;
  }

  public void setSize(long size) {
    this.size = size;
  }

  public String getSprintId() {
    return sprintId;
  }

  public void setSprintId(String sprintId) {
    this.sprintId = sprintId;
  }

  public String getPublicId() {
    return publicId;
  }

  public void setPublicId(String publicId) {
    this.publicId = publicId;
  }
}
