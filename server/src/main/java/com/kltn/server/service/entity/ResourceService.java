package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.resource.ResourceTaskUploadRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.ResourcePathResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {
    private ResourceRepository repository;
    private ResourceMapper resourceMapper;
    private UserService userService;
    private ProjectRepository projectRepository;
    private IssueRepository issueRepository;

    @Autowired
    public ResourceService(ResourceRepository repository, ResourceMapper resourceMapper, UserService userService, ProjectRepository projectService, IssueRepository issueService) {
        this.repository = repository;
        this.resourceMapper = resourceMapper;
        this.userService = userService;
        this.projectRepository = projectService;
        this.issueRepository = issueService;
    }

    public Resource getById(String id) {
        return repository.findById(id).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public ApiResponse<ResourcePathResponse> getResourceById(String id) {
        Resource resource = getById(id);
        StringBuilder url = new StringBuilder();
        url.append(resource.getUser().getUniId());
        url.append("/");
        url.append(resource.getPlaceContent());
        url.append("/");
        url.append(resource.getContentType());
        url.append("/");
        url.append(resource.getName());
        url.append(".");
        url.append(resource.getExtension());

        String resourceUrl = url.toString();


        return ApiResponse.<ResourcePathResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get resource successfully")
                .data(ResourcePathResponse.builder()
                        .path(resourceUrl)
                        .size(resource.getSize())
                        .build()).build();
    }

    public ApiResponse<Void> uploadFile(ResourceTaskUploadRequest request) {
        Resource resource = resourceMapper.toResource(request);
        resource.setUser(userService.getCurrentUser());
        resource.setIssue(issueRepository.findById(request.getIssueId()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build())) ;
        repository.save(resource);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Upload file successfully")
                .build();

    }
}
