package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.resource.DailyResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceSignatureRequest;
import com.kltn.server.DTO.request.entity.resource.ResourceTaskStoringRequest;
import com.kltn.server.DTO.request.entity.resource.StoringAvatarSignatureRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.resource.*;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.ResourceRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.file.FileService;
import com.kltn.server.service.file.FileSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  private UserService userService;
  private ProjectRepository projectRepository;
  private ResourceMapper resourceMapper;
  @Lazy
  @Autowired
  private IssueService issueService;
  private FileService fileService;
  private IssueRepository issueRepository;
  @Autowired
  private ProjectSprintRepository projectSprintRepository;

  @Autowired
  public ResourceService(ResourceRepository repository, ResourceMapper resourceMapper, UserService userService,
                         ProjectRepository projectService, IssueRepository issueRepository, FileService fileService,
                         SprintService sprintService, ProjectSprintService projectSprintService) {
    this.issueRepository = issueRepository;
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
      .toString()
      ;

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

  public ApiResponse<ResourceResponse> uploadFileToTask(ResourceTaskStoringRequest request) {
    Resource resource = resourceMapper.toResource(request);
    resource.setUser(userService.getCurrentUser());
    resource = repository.save(resource);
    Issue issue = issueService.getEntityById(request.getIssueId());
    List<Resource> resources = new ArrayList<>();
    if (issue.getResources() != null) {
      resources = issue.getResources();
    }
    resources.add(resource);
    issue.setResources(resources);
    issueService.saveEntity(issue);
    repository.save(resource);
    return ApiResponse.<ResourceResponse>builder()
      .code(HttpStatus.CREATED.value())
      .message("Upload file successfully")
      .data(resourceMapper.toResourceResponse(resource))
      .build();

  }

  public ApiResponse<ResourceResponse> uploadFileToDailySprint(DailyResourceSignatureRequest request) {
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
      .sprintId(
        request.getSprintId())
      .projectId(
        request.getProjectId())
      .build());
    List<Resource> dailyFiles = projectSprint.getDailyFiles();
    if (dailyFiles != null && dailyFiles.size() >= 2) {
      throw AppException.builder()
        .error(Error.DAILY_FILE_ALREADY_UPLOAD)
        .build();
    }
    Resource resource = resourceMapper.toResource(request);
    resource.setUser(userService.getCurrentUser());
    repository.save(resource);
//    Sprint sprint = sprintService.getSprintById(request.getSprintId());

    if (projectSprint.getDailyFiles() == null) {
      dailyFiles = new ArrayList<>();
    }
    dailyFiles.add(resource);
    projectSprint.setDailyFiles(dailyFiles);
    projectSprintService.save(projectSprint);
    return ApiResponse.<ResourceResponse>builder()
      .code(HttpStatus.CREATED.value())
      .message("Upload file successfully")
      .data(resourceMapper.toResourceResponse(resource))
      .build();

  }

  public ApiResponse<ResourceResponse> uploadFileToBacklogSprint(DailyResourceSignatureRequest request) {
    Resource resource = resourceMapper.toResource(request);
    resource.setUser(userService.getCurrentUser());
    repository.save(resource);
    // Sprint sprint = sprintService.getSprintById(request.getSprintId());
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
      .sprintId(
        request.getSprintId())
      .projectId(
        request.getProjectId())
      .build());
    if (projectSprint.getFileBackLog() != null) {
      throw AppException.builder()
        .error(Error.BACKLOG_FILE_ALREADY_UPLOAD)
        .build();
    }
    projectSprint.setFileBackLog(resource);
    projectSprintService.save(projectSprint);
    return ApiResponse.<ResourceResponse>builder()
      .code(HttpStatus.CREATED.value())
      .message("Upload file successfully")
      .data(resourceMapper.toResourceResponse(resource))
      .build();

  }


  public ApiResponse<ResourceResponse> uploadAvatar(StoringAvatarSignatureRequest request) {
    Resource resource = resourceMapper.toResource(request);
    User user = userService.getCurrentUser();
    resource.setUser(user);
    resource = repository.save(resource);
    user.setAvatar(resource);
    userService.save(user);
    return ApiResponse.<ResourceResponse>builder()
      .code(HttpStatus.CREATED.value())
      .message("Upload avatar successfully")
      .data(resourceMapper.toResourceResponse(resource))
      .build();

  }

  @Transactional
  public ApiResponse<Void> deleteFileToDailySprint(String id) {
    Resource resource = getById(id);
    for (Issue issue : resource.getIssues()) {
      issue.getResources()
        .remove(resource);
    }
    issueRepository.saveAll(resource.getIssues());
    if (resource.getProjectSprint() != null) {
      ProjectSprint projectSprint = resource.getProjectSprint();
      projectSprint.setFileBackLog(null);
      projectSprintService.save(projectSprint);
    }
    for (ProjectSprint projectSprint : resource.getIssueDailyFiles()) {
      projectSprint.getDailyFiles()
        .remove(resource);
    }
    projectSprintRepository.saveAll(resource.getIssueDailyFiles());
    repository.delete(resource);
    return ApiResponse.<Void>builder()
      .code(HttpStatus.OK.value())
      .message("Delete file successfully")
      .build();
  }

  public ApiResponse<List<ResourceSprintAcrossProjectResponse>> getResourceAcrossSprint(String id) {
    List<ProjectSprint> projectsSprints = projectSprintService.getProjectSprintBySprintId(id);
    projectsSprints.sort((p1, p2) -> p2.getSprint().getDtStart().isAfter(p1.getSprint().getDtStart()) ? -1 : 1);
    List<ResourceSprintAcrossProjectResponse> dataResult = new ArrayList<>();
    for (ProjectSprint projectSprint : projectsSprints) {
      var builder = ResourceSprintAcrossProjectResponse.builder()
        .id(projectSprint.getSprint().getId())
        .title(projectSprint.getSprint().getTitle())
        .daily(resourceMapper.toResourceResponseList(projectSprint.getDailyFiles()))
        .backlog(resourceMapper.toResourceResponse(projectSprint.getFileBackLog())).build()
        ;
      dataResult.add(builder);
    }
    return ApiResponse.<List<ResourceSprintAcrossProjectResponse>>builder()
      .code(200)
      .message("Danh sách các báo cáo của project")
      .data(dataResult)
      .build();
  }

  public ApiResponse<List<ResourceProjectAcrossSprintResponse>> getResourceAcrossProject(String id) {
    List<ProjectSprint> projectsSprints = projectSprintService.getProjectSprintByProjectId(id);
    projectsSprints.sort((p1, p2) -> p2.getProject().getName().compareTo(p1.getProject().getName()));
    List<ResourceProjectAcrossSprintResponse> dataResult = new ArrayList<>();
    for (ProjectSprint projectSprint : projectsSprints) {
      var builder = ResourceProjectAcrossSprintResponse.builder()
        .id(projectSprint.getProject().getId())
        .name(projectSprint.getProject().getName())
        .daily(resourceMapper.toResourceResponseList(projectSprint.getDailyFiles()))
        .backlog(resourceMapper.toResourceResponse(projectSprint.getFileBackLog())).build()
        ;
      dataResult.add(builder);
    }
    return ApiResponse.<List<ResourceProjectAcrossSprintResponse>>builder()
      .code(200)
      .message("Danh sách các báo cáo của project")
      .data(dataResult)
      .build();
  }
}
