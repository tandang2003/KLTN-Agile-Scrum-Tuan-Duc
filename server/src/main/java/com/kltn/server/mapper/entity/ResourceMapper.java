package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.request.entity.resource.ResourceTaskStoringRequest;
import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.service.file.FileService;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ResourceMapper {
    @Autowired
    protected FileService fileService;

    @Named("toUrl")
    public String toUrl(String publicId) {
        return fileService.getUrl(publicId);
    }

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "extension", source = "extension"),
            @Mapping(target = "contentType", source = "contentType"),
            @Mapping(target = "placeContent", source = "placeContent"),
            @Mapping(target = "size", source = "size"),
            @Mapping(target = "url", source = "publicId",
                    qualifiedByName = "toUrl"),
//            @Mapping(target = "publicId", source = "publicId"),
    })
    @BeanMapping(ignoreByDefault = true)
    @Named("toResourceResponse")
    public abstract ResourceResponse toResourceResponse(Resource resource);


    @Named("toListResponse")
    @IterableMapping(qualifiedByName = "toResourceResponse")
    public abstract List<ResourceResponse> toResourceResponseList(List<Resource> resources);

    @Mappings({
            @Mapping(target = "name",
                    source = "request.name"),
            @Mapping(target = "extension", source = "extension"),
            @Mapping(target = "contentType", source = "contentType"),
            @Mapping(target = "placeContent", expression = "java(com.kltn.server.model.type.resource.PlaceContent.ISSUE)"),
            @Mapping(target = "size", source = "size"),
            @Mapping(target = "publicId", source = "publicId"),
    })
    @BeanMapping(ignoreByDefault = true)
    public abstract Resource toResource(ResourceTaskStoringRequest request);

}
