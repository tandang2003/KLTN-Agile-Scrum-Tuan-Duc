package com.kltn.server.service.mongo;

import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.notification.NotificationResponse;
import com.kltn.server.mapper.document.NotificationMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.repository.document.ChangeLogRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.service.entity.ResourceService;
import com.kltn.server.service.entity.UserService;
import com.kltn.server.service.entity.iml.IssueService;
import org.bson.Document;

import com.fasterxml.jackson.databind.JsonNode;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Project;
import com.kltn.server.repository.document.ProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectMongoService {
  private final NotificationMapper notificationMapper;
  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final UserService userService;
  private final ResourceMapper resourceMapper;
  private final ResourceService resourceService;
  private final IssueService issueService;
  private final IssueMapper issueMapper;
  private final IssueMongoService issueMongoService;
  private ProjectMongoRepository projectMongoRepository;
  private MongoTemplate mongoTemplate;
  private ChangeLogRepository changeLogRepository;


  @Autowired
  public ProjectMongoService(ChangeLogRepository changeLogRepository, ProjectMongoRepository projectMongoRepository, MongoTemplate mongoTemplate, NotificationMapper notificationMapper, UserMapper userMapper, UserRepository userRepository, UserService userService, ResourceMapper resourceMapper, ResourceService resourceService, IssueService issueService, IssueMapper issueMapper, IssueMongoService issueMongoService) {
    this.projectMongoRepository = projectMongoRepository;
    this.mongoTemplate = mongoTemplate;
    this.notificationMapper = notificationMapper;
    this.changeLogRepository = changeLogRepository;
    this.userMapper = userMapper;
    this.userRepository = userRepository;
    this.userService = userService;
    this.resourceMapper = resourceMapper;
    this.resourceService = resourceService;
    this.issueService = issueService;
    this.issueMapper = issueMapper;
    this.issueMongoService = issueMongoService;
  }

  public Project save(Project project) {
    try {
      return projectMongoRepository.save(project);
    } catch (Exception e) {
      throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
    }
  }

  public Project getByNkProjectId(String id) {
    return projectMongoRepository.findByNkProjectId(id)
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND_PROJECT).build());
  }

  public Object getPosition(String id) {
    Query query = new Query(Criteria.where("nk_project_id").is(id));
    // only include the 'position' field in the result
    query.fields().include("position").exclude("_id");

    Document doc = mongoTemplate.findOne(query, Document.class, "project");
    if (doc != null && doc.containsKey("position")) {
      return Optional.of(doc.get("position"));
    }
    return Optional.empty();
  }

  public void savePosition(String id, JsonNode payload) {
    Document positionDoc = Document.parse(payload.toString());

    Query query = new Query(Criteria.where("nk_project_id").is(id));
    Update update = new Update().set("position", positionDoc);
    mongoTemplate.updateFirst(query, update, "project");

  }

  public ApiResponse<ApiPaging<NotificationResponse>> getNotification(String projectId, int page, int size) {
    Page<ChangeLog> changelog = changeLogRepository.findAllByProjectId(projectId, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dtCreated")));
    List<NotificationResponse> response = notificationMapper.toListNotifyResponse(changelog.getContent());
    for (NotificationResponse r : response) {
      if (r.propertiesTargets() != null) {
        switch (r.propertiesTargets()[0]) {
          case "assignee":
            r.change()
              .setAssignee(userMapper.toUserDetailDTO(userService.getUserByUniId(r.change().getAssignee().getId())));
            break;
          case "reviewer":
            r.change()
              .setReviewer(userMapper.toUserDetailDTO(userService.getUserByUniId(r.change().getAssignee().getId())));
            break;
          case "attachments":
            r.change().setAttachment(
              r.change()
                .getAttachment()
                .stream()
                .map(resource -> resourceMapper.toResourceResponse(resourceService.getById(resource.id())))
                .toList()
            );
            break;
          case "relations":
            r.change().getRelations()
              .forEach(relation ->
                relation.setIssueRelated(
                  issueMapper.toIssueResponse(
                    issueService.getEntityById(relation.getIssueRelated().id()),
                    issueMongoService.getById(relation.getIssueRelated().id()))))
            ;
            break;
        }
      }
    }
    return ApiResponse.<ApiPaging<NotificationResponse>>builder()
      .message("get notification success")
      .code(200)
      .data(ApiPaging.<NotificationResponse>builder()
        .items(response)
        .currentPage(changelog.getNumber())
        .totalPages(changelog.getTotalPages())
        .totalItems(changelog.getTotalElements())
        .build())
      .build();
  }
}
