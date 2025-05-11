package com.kltn.server.mapper.base;

import com.kltn.server.DTO.response.base.AttachmentResponse;
import com.kltn.server.model.collection.model.Attachment;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttachmentMapper {
    @Named("toResponse")
    AttachmentResponse toAttachmentResponse(Attachment attachment);
    @Named("toListResponse")
    List<AttachmentResponse> toAttachmentResponseList(List<Attachment> attachments);
}
