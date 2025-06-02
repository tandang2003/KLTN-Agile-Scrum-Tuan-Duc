package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.resource.ResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceTaskStoringRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.ResourcePathResponse;
import com.kltn.server.DTO.response.resource.ResourceSignatureResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.ResourceRepository;
import com.kltn.server.service.file.FileService;
import com.kltn.server.service.file.FileSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResourceService {
    private ResourceRepository repository;
    private ResourceMapper resourceMapper;
    private UserService userService;
    private ProjectRepository projectRepository;
    private IssueRepository issueRepository;
    private FileService fileService;

    @Autowired
    public ResourceService(ResourceRepository repository, ResourceMapper resourceMapper, UserService userService, ProjectRepository projectService, IssueRepository issueService,

                           FileService fileService) {
        this.repository = repository;
        this.resourceMapper = resourceMapper;
        this.userService = userService;
        this.projectRepository = projectService;
        this.issueRepository = issueService;
        this.fileService = fileService;
    }

    public Resource getById(String id) {
        return repository.findById(id).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public ApiResponse<ResourcePathResponse> getResourceById(String id) {
        Resource resource = getById(id);
        String url = fileService.getUrl(resource.getPublicId());
//        url.append(resource.getUser().getUniId());
//        url.append("/");
//        url.append(resource.getPlaceContent());
//        url.append("/");
//        url.append(resource.getContentType());
//        url.append("/");
//        url.append(resource.getName());
//        url.append(".");
//        url.append(resource.getExtension());

//        String resourceUrl = url.toString();


        return ApiResponse.<ResourcePathResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get resource successfully")
                .data(ResourcePathResponse.builder()
                        .path(url)
                        .size(resource.getSize())
                        .build()).build();
    }

    public ApiResponse<Void> uploadFile(ResourceTaskStoringRequest request) {
        Resource resource = resourceMapper.toResource(request);
        resource.setUser(userService.getCurrentUser());
        resource.setIssue(issueRepository.findById(request.getIssueId()).orElseThrow(() ->
                AppException.builder().error(Error.NOT_FOUND).build()));
        repository.save(resource);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.CREATED.value())
                .message("Upload file successfully")
                .build();

    }

    public ApiResponse<ResourceSignatureResponse> getSignature(ResourceSignatureRequest request) {
        Map<String, Object> paramsToSign = new HashMap<>();
        String name = request.getNameFile();
        paramsToSign.put("public_id", name);
        String uniIdUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        String folder = Paths.get(request.getProjectId(), request.getIssueId(), uniIdUser).toString();
        paramsToSign.put("folder", folder);
        String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
        paramsToSign.put("timestamp", timestamp);
        FileSignature fileSignature = fileService.getSignature(paramsToSign);
        var data = new ResourceSignatureResponse(
                fileSignature.getFolder(),
                fileSignature.getSignature(),
                name,
                timestamp,
                fileSignature.getApiKey(),
                fileSignature.getCloudName(),
                fileSignature.getUrlUpload()
        );
        return ApiResponse.<ResourceSignatureResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get Signature")
                .data(data)
                .build();

    }
}
