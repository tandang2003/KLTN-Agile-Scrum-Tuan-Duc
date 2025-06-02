package com.kltn.server.service.file;


import java.util.Map;

public interface FileService {
    FileSignature getSignature(Map<String, Object> paramsToSign);
    String getUrl(String publishId);
}
