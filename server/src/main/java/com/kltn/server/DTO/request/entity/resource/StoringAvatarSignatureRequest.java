package com.kltn.server.DTO.request.entity.resource;

import com.kltn.server.model.type.resource.ContentType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class StoringAvatarSignatureRequest {
  @NotEmpty
  private String name;
  @NotEmpty
  private String extension;
  @NotNull
  @Enumerated(EnumType.STRING)
  private ContentType contentType;
  @NotNull
  private long size;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

}
