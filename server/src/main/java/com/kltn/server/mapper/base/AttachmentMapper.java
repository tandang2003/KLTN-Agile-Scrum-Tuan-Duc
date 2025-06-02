package com.kltn.server.mapper.base;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.response.base.AttachmentResponse;
import com.kltn.server.model.collection.model.Attachment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttachmentMapper {
    @Mappings({@Mapping(target = "resourceId", source = "resourceId"),
    })
    @Named("toDocument")
    Attachment toDocument(AttachmentRequest attachmentResponse);

    @Named("toListDocument")
    List<Attachment> toListDocument(List<AttachmentRequest> attachmentResponse);


    @Named("toResponse")
    AttachmentResponse toAttachmentResponse(Attachment attachment);

    @Named("toListResponse")
    List<AttachmentResponse> toAttachmentResponseList(List<Attachment> attachments);
}
