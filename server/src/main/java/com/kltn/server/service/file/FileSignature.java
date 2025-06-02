package com.kltn.server.service.file;

public class FileSignature {
    String folder ;
    String signature;
    String urlUpload;
    String apiKey;
    String cloudName;

    public FileSignature() {
    }

    public FileSignature(String folder, String signature, String urlUpload, String apiKey, String cloudName) {
        this.folder = folder;
        this.signature = signature;
        this.urlUpload = urlUpload;
        this.apiKey = apiKey;
        this.cloudName = cloudName;
    }

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getUrlUpload() {
        return urlUpload;
    }

    public void setUrlUpload(String urlUpload) {
        this.urlUpload = urlUpload;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getCloudName() {
        return cloudName;
    }

    public void setCloudName(String cloudName) {
        this.cloudName = cloudName;
    }
}
