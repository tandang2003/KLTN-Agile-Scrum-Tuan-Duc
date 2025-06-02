package com.kltn.server.DTO.request.entity.resource;

import jakarta.validation.constraints.NotBlank;

public class ResourceSignatureRequest {
    @NotBlank
    private String projectId;
    @NotBlank
    private String issueId;
//    private String userId;
    @NotBlank
    private String nameFile;
    private String extension;

    public ResourceSignatureRequest() {
    }

    public ResourceSignatureRequest(String projectId, String issueId, String userId, String nameFile, String extension) {
        this.projectId = projectId;
        this.issueId = issueId;
//        this.userId = userId;
        this.nameFile = nameFile;
        this.extension = extension;
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

//    public String getUserId() {
//        return userId;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }

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
}
