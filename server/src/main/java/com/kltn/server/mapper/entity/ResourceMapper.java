package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.resource.ResourceTaskUploadRequest;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.type.resource.PlaceContent;
import org.mapstruct.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResourceMapper {


    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "extension", source = "extension"),
            @Mapping(target = "contentType", source = "contentType"),
            @Mapping(target = "placeContent", source = "placeContent"),
    })
    @BeanMapping(ignoreByDefault = true)
    @Named("toResourceResponse")
    ResourceResponse toResourceResponse(Resource resource);

    @Named("toListResponse")
    List<ResourceResponse> toResourceResponseList(List<Resource> resources);

    @Mappings({
            @Mapping(target = "name",
                    expression = "java(request.getSail() != null && !request.getSail().isBlank() ? request.getName() + \"_\" + request.getSail() : request.getName())"),
            @Mapping(target = "extension", source = "extension"),
            @Mapping(target = "contentType", source = "contentType"),
            @Mapping(target = "placeContent", expression = "java(com.kltn.server.model.type.resource.PlaceContent.ISSUE)"),
            @Mapping(target = "size", source = "size"),
    })
    Resource toResource(ResourceTaskUploadRequest request);

}
