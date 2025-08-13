package com.kltn.server.service.file;

import java.util.Map;

import com.kltn.server.model.type.resource.ContentType;

public interface FileService {
  FileSignature getSignature(Map<String, Object> paramsToSign);

  String getUrl(String publishId);

  String getUrl(String publishId, ContentType type);

  void deleteFile(String publicId);
}
