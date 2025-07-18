package com.kltn.server.service.mongo;

import com.fasterxml.jackson.databind.JsonNode;
import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.notification.NotificationResponse;
import com.kltn.server.DTO.response.user.UserResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.document.NotificationMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.mapper.entity.ResourceMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.Project;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.document.ChangeLogRepository;
import com.kltn.server.repository.document.ProjectMongoRepository;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.service.entity.ResourceService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectMongoService {
  private final NotificationMapper notificationMapper;
  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final ResourceMapper resourceMapper;
  private final ResourceService resourceService;
  private final IssueMapper issueMapper;
  private final IssueMongoService issueMongoService;
  private final IssueRepository issueRepository;
  private ProjectMongoRepository projectMongoRepository;
  private MongoTemplate mongoTemplate;
  private ChangeLogRepository changeLogRepository;


  @Autowired
  public ProjectMongoService(ChangeLogRepository changeLogRepository, ProjectMongoRepository projectMongoRepository, MongoTemplate mongoTemplate, NotificationMapper notificationMapper, UserMapper userMapper, UserRepository userRepository, ResourceMapper resourceMapper, ResourceService resourceService, IssueMapper issueMapper, IssueMongoService issueMongoService, IssueRepository issueRepository) {
    this.projectMongoRepository = projectMongoRepository;
    this.mongoTemplate = mongoTemplate;
    this.notificationMapper = notificationMapper;
    this.changeLogRepository = changeLogRepository;
    this.userMapper = userMapper;
    this.userRepository = userRepository;
    this.resourceMapper = resourceMapper;
    this.resourceService = resourceService;
    this.issueMapper = issueMapper;
    this.issueMongoService = issueMongoService;
    this.issueRepository = issueRepository;
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
            User assignee = userRepository.findByUniId(r.change().getAssignee().id()).orElse(null);
            UserResponse assigneeResponse;
            if (assignee != null) assigneeResponse = userMapper.toUserResponse(assignee);
            else assigneeResponse = null;
            r.change().setAssignee(assigneeResponse);
            break;
          case "reviewer":
            User reviewer = userRepository.findByUniId(r.change().getReviewer().id()).orElse(null);
            UserResponse reviewerResponse;
            if (reviewer != null) reviewerResponse = userMapper.toUserResponse(reviewer);
            else reviewerResponse = null;
            r.change().setReviewer(reviewerResponse);
            break;
          case "attachments":
            r.change()
              .setAttachment(r.change()
                .getAttachment()
                .stream()
                .map(resource -> resourceMapper.toResourceResponse(resourceService.getById(resource.id())))
                .toList());
            break;
          case "relations":
            r.change().getRelations().forEach(relation ->
              {
              Issue issue = issueRepository.findById(relation.getIssueRelated().id()).orElse(null);
              var issueMongo = issueMongoService.getById(relation.getIssueRelated().id());
              relation.setIssueRelated(issueMapper.toIssueResponse(issue,
                issueMongo));
              })
            ;

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
