package com.kltn.server.DTO.request.entity.resource;

import jakarta.validation.constraints.NotBlank;

public class ResourceSignatureRequest {
  @NotBlank
  private String projectId;
  @NotBlank
  private String issueId;
  @NotBlank
  private String nameFile;
  private String extension;
  private String resourceType;

  public ResourceSignatureRequest() {
  }

  public ResourceSignatureRequest(String projectId, String issueId, String userId, String nameFile,
      String extension, String resourceType) {
    this.projectId = projectId;
    this.issueId = issueId;
    this.nameFile = nameFile;
    this.extension = extension;
    this.resourceType = resourceType;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getIssueId() {
    return issueId;
  }

  public void setIssueId(String issueId) {
    this.issueId = issueId;
  }

  public String getNameFile() {
    return nameFile;
  }

  public void setNameFile(String nameFile) {
    this.nameFile = nameFile;
  }

  public String getExtension() {
    return extension;
  }

  public void setExtension(String extension) {
    this.extension = extension;
  }

  public String getResourceType() {
    return resourceType;
  }

  public void setResourceType(String resourceType) {
    this.resourceType = resourceType;
  }
}
