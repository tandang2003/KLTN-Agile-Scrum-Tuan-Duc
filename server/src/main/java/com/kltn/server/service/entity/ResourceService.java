package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.resource.DailyResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceTaskStoringRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.ResourcePathResponse;
import com.kltn.server.DTO.response.resource.ResourceSignatureResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.ResourceRepository;
import com.kltn.server.service.file.FileService;
import com.kltn.server.service.file.FileSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResourceService {
  private final SprintService sprintService;
  private final ProjectSprintService projectSprintService;
  private ResourceRepository repository;
  private ResourceMapper resourceMapper;
  private UserService userService;
  private ProjectRepository projectRepository;
  @Lazy
  @Autowired
  private IssueService issueService;
  private FileService fileService;

  @Autowired
  public ResourceService(ResourceRepository repository, ResourceMapper resourceMapper, UserService userService,
                         ProjectRepository projectService,

                         FileService fileService, SprintService sprintService,
                         ProjectSprintService projectSprintService) {
    this.repository = repository;
    this.resourceMapper = resourceMapper;
    this.userService = userService;
    this.projectRepository = projectService;
    this.issueService = issueService;
    this.fileService = fileService;
    this.sprintService = sprintService;
    this.projectSprintService = projectSprintService;
  }

  public Resource getById(String id) {
    return repository.findById(id)
                     .orElseThrow(() -> AppException.builder()
                                                    .error(Error.NOT_FOUND)
                                                    .build());
  }

  public ApiResponse<ResourcePathResponse> getResourceById(String id) {
    Resource resource = getById(id);
    String url = fileService.getUrl(resource.getPublicId());
    String resourceUrl = url.toString();

    return ApiResponse.<ResourcePathResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Get resource successfully")
                      .data(ResourcePathResponse.builder()
                                                .path(resourceUrl)
                                                .size(resource.getSize())
                                                .build())
                      .build();
  }

  public ApiResponse<ResourceSignatureResponse> getSignature(ResourceSignatureRequest request) {
    Map<String, Object> paramsToSign = new HashMap<>();

    String uniIdUser = SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getPrincipal()
                                            .toString();

    String folder = Paths.get(request.getProjectId(), request.getIssueId(), uniIdUser)
                         .toString();
    paramsToSign.put("folder", folder);

    String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
    paramsToSign.put("timestamp", timestamp);

    FileSignature fileSignature = fileService.getSignature(paramsToSign);

    var data = new ResourceSignatureResponse(fileSignature.getFolder(), fileSignature.getSignature(), timestamp,
                                             fileSignature.getApiKey(), fileSignature.getCloudName(),
                                             fileSignature.getUrlUpload());
    return ApiResponse.<ResourceSignatureResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Get Signature")
                      .data(data)
                      .build();

  }

  public ApiResponse<Void> uploadFileToTask(ResourceTaskStoringRequest request) {
    Resource resource = resourceMapper.toResource(request);
    resource.setUser(userService.getCurrentUser());
    Issue issue = issueService.getEntityById(request.getIssueId());
//    Issue issue = issueService.findById(request.getIssueId())
//                              .orElseThrow(() -> AppException.builder()
//                                                             .error(Error.NOT_FOUND)
//                                                             .message(
//                                                               "Issue not found with id: " + request.getIssueId())
//                                                             .build());
    List<Resource> resources = new ArrayList<>();
    if (issue.getResources() != null) {
      resources = issue.getResources();
    }
    resources.add(resource);
    issue.setResources(resources);
    issueService.saveEntity(issue);
    repository.save(resource);
    return ApiResponse.<Void>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Upload file successfully")
                      .build();

  }

  public ApiResponse<Void> uploadFileToDailySprint(DailyResourceSignatureRequest request) {
    Resource resource = resourceMapper.toResource(request);
    resource.setUser(userService.getCurrentUser());
    repository.save(resource);
//    Sprint sprint = sprintService.getSprintById(request.getSprintId());
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
                                                                                           .sprintId(
                                                                                             request.getSprintId())
                                                                                           .projectId(
                                                                                             request.getProjectId())
                                                                                           .build());
    List<Resource> dailyFiles = projectSprint.getDailyFiles();
    if (projectSprint.getDailyFiles() == null) {
      dailyFiles = new ArrayList<>();
    }
    dailyFiles.add(resource);
    projectSprint.setDailyFiles(dailyFiles);
    projectSprintService.save(projectSprint);
    return ApiResponse.<Void>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Upload file successfully")
                      .build();

  }
}
