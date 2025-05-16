package com.kltn.server.mapper.entity;

import com.kltn.server.DTO.response.resource.ResourceResponse;
import com.kltn.server.model.entity.Resource;
import org.mapstruct.*;

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

}
