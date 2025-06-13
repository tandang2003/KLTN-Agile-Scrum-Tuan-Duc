package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.request.entity.issue.*;
import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueRelationResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.AppMethodArgumentNotValidException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.entity.*;
import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.entity.relationship.IssueRelation;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.relation.IssueRelationRepository;
import com.kltn.server.service.mongo.IssueMongoService;
import com.kltn.server.service.mongo.snapshot.SnapshotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
public class IssueService {
  private final SprintService sprintService;
  private final UserMapper userMapper;
  private IssueMapper taskMapper;
  private ProjectSprintService projectSprintService;
  private IssueRepository taskRepository;
  private UserService userService;
  private ResourceService resourceService;
  private IssueMongoService issueMongoService;
  private ChangeLogMapper changeLogMapper;
  private ProjectService projectService;
  private TopicMapper topicMapper;
  private SubTaskMapper subTaskMapper;
  private SnapshotService snapshotService;
  private IssueRelationRepository issueRelationRepository;

  @Autowired
  public IssueService(IssueRelationRepository issueRelationRepository, SnapshotService snapshotService,
                      TopicMapper topicMapper, SubTaskMapper subTaskMapper, ProjectService projectService,
                      ResourceService resourceService, ChangeLogMapper changeLogMapper,
                      IssueMongoService issueMongoService, UserService userService,
                      ProjectSprintService projectSprintService, IssueMapper taskMapper, IssueRepository taskRepository,
                      SprintService sprintService, UserMapper userMapper) {
    this.issueRelationRepository = issueRelationRepository;
    this.snapshotService = snapshotService;
    this.taskMapper = taskMapper;
    this.taskRepository = taskRepository;
    this.projectSprintService = projectSprintService;
    this.userService = userService;
    this.issueMongoService = issueMongoService;
    this.changeLogMapper = changeLogMapper;
    this.resourceService = resourceService;
    this.projectService = projectService;
    this.sprintService = sprintService;
    this.topicMapper = topicMapper;
    this.subTaskMapper = subTaskMapper;
    this.userMapper = userMapper;
  }

  @SendKafkaEvent(topic = "task-log")
  @Transactional
  public ApiResponse<IssueResponse> createTask(IssueCreateRequest issueCreateRequest) {

    Project project = projectService.getProjectById(issueCreateRequest.getProjectId());
    var task = taskMapper.toEntity(issueCreateRequest);
    task.setProject(project);
    if (issueCreateRequest.getAssigneeId() != null && !issueCreateRequest.getAssigneeId()
                                                                         .isEmpty()) {
      User assignee = userService.getUserByUniId(issueCreateRequest.getAssigneeId());
      task.setAssignee(assignee);
    }
    if (issueCreateRequest.getReviewerId() != null && !issueCreateRequest.getReviewerId()
                                                                         .isEmpty()) {
      User reviewer = userService.getUserByUniId(issueCreateRequest.getReviewerId());
      task.setReviewer(reviewer);
    }
    if (issueCreateRequest.getSprintId() != null && !issueCreateRequest.getSprintId()
                                                                       .isEmpty()) {
      Sprint sprint = sprintService.getSprintById(issueCreateRequest.getSprintId());
      if (task.getDtStart() == null) {
        task.setDtStart(sprint.getDtStart());
      }
      else if (task.getDtStart() != null && task.getDtStart()
                                                .isBefore(sprint.getDtStart())) {
        Map<String, String> error = new HashMap<>();
        error.put("start", "Start date cannot be before sprint start date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder()
                                                .error(errors)
                                                .build();
      }
      if (task.getDtEnd() == null) {
        task.setDtEnd(sprint.getDtEnd());
      }
      else if (task.getDtEnd() != null && task.getDtEnd()
                                              .isAfter(sprint.getDtEnd())) {
        Map<String, String> error = new HashMap<>();
        error.put("end", "End date cannot be after sprint end date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder()
                                                .error(errors)
                                                .build();
      }
      task.setSprint(sprint);
    }
    if (issueCreateRequest.getAttachments() != null && !issueCreateRequest.getAttachments()
                                                                          .isEmpty()) {
      List<Resource> resources = issueCreateRequest.getAttachments()
                                                   .stream()
                                                   .map(id -> resourceService.getById(id.getResourceId()))
                                                   .toList();
      task.setResources(resources);
    }
    task = taskRepository.save(task);
    if (task == null || task.getId() == null) {
      throw AppException.builder()
                        .error(Error.DB_SERVER_ERROR)
                        .build();
    }
    var taskMongo = taskMapper.toCollection(task, issueCreateRequest);
    taskMongo = issueMongoService.save(taskMongo);
    var changeLog = changeLogMapper.taskToCreateLogRequest(task, taskMongo);

    return ApiResponse.<IssueResponse>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Create task successfully")
                      .data(taskMapper.toIssueResponse(task, taskMongo))
                      .logData(changeLog)
                      .build();
  }

  @SendKafkaEvent(topic = "task-log")
  @Transactional
  public ApiResponse<IssueResponse> createTaskBacklog(IssueCreateRequest issueCreateRequest) {

    Project project = projectService.getProjectById(issueCreateRequest.getProjectId());
    var task = taskMapper.toEntity(issueCreateRequest);
    task.setProject(project);
    if (issueCreateRequest.getAssigneeId() != null && !issueCreateRequest.getAssigneeId()
                                                                         .isEmpty()) {
      User assignee = userService.getUserByUniId(issueCreateRequest.getAssigneeId());
      task.setAssignee(assignee);
    }
    if (issueCreateRequest.getReviewerId() != null && !issueCreateRequest.getReviewerId()
                                                                         .isEmpty()) {
      User reviewer = userService.getUserByUniId(issueCreateRequest.getReviewerId());
      task.setReviewer(reviewer);
    }
    if (issueCreateRequest.getSprintId() != null && !issueCreateRequest.getSprintId()
                                                                       .isEmpty()) {
      Sprint sprint = sprintService.getSprintById(issueCreateRequest.getSprintId());
      Instant now = Instant.now();
      if (now.isAfter(sprint.getDtStart())) {
        throw AppException.builder()
                          .error(Error.SPRINT_ALREADY_START)
                          .build();
      }
      if (now.isAfter(sprint.getDtEnd())) {
        throw AppException.builder()
                          .error(Error.SPRINT_ALREADY_END)
                          .build();
      }
      if (task.getDtStart() == null) {
        task.setDtStart(sprint.getDtStart());
      }
      else if (task.getDtStart() != null && task.getDtStart()
                                                .isBefore(sprint.getDtStart())) {
        Map<String, String> error = new HashMap<>();
        error.put("start", "Start date cannot be before sprint start date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder()
                                                .error(errors)
                                                .build();
      }
      if (task.getDtEnd() == null) {
        task.setDtEnd(sprint.getDtEnd());
      }
      else if (task.getDtEnd() != null && task.getDtEnd()
                                              .isAfter(sprint.getDtEnd())) {
        Map<String, String> error = new HashMap<>();
        error.put("end", "End date cannot be after sprint end date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder()
                                                .error(errors)
                                                .build();
      }
      task.setSprint(sprint);
    }
    if (issueCreateRequest.getAttachments() != null && !issueCreateRequest.getAttachments()
                                                                          .isEmpty()) {
      List<Resource> resources = issueCreateRequest.getAttachments()
                                                   .stream()
                                                   .map(id -> resourceService.getById(id.getResourceId()))
                                                   .toList();
      task.setResources(resources);
    }
    task = taskRepository.save(task);
    if (task == null || task.getId() == null) {
      throw AppException.builder()
                        .error(Error.DB_SERVER_ERROR)
                        .build();
    }
    var taskMongo = taskMapper.toCollection(task, issueCreateRequest);
    taskMongo = issueMongoService.save(taskMongo);
    var changeLog = changeLogMapper.taskToCreateLogRequest(task, taskMongo);

    return ApiResponse.<IssueResponse>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Create task successfully")
                      .data(taskMapper.toIssueResponse(task, taskMongo))
                      .logData(changeLog)
                      .build();
  }

  public Issue getEntityById(String id) {

    return taskRepository.findById(id)
                         .orElseThrow(() -> AppException.builder()
                                                        .error(Error.NOT_FOUND)
                                                        .message("Issue not found with id: " + id)
                                                        .build());
  }

  public Issue saveEntity(Issue issue) {

    try {
      issue = taskRepository.save(issue);
    } catch (RuntimeException e) {
      throw AppException.builder()
                        .error(Error.DB_SERVER_MISSING_DATA)
                        .build();
    }
    return issue;

  }

  public ApiResponse<IssueDetailResponse> getIssueDetailById(IssueDetailRequest request) {

    String id = request.getIssueId();
    var entity = getEntityById(id);
    if (request.getSprintId() != null && !request.getSprintId()
                                                 .isEmpty()) {
      Sprint sprint = sprintService.getSprintById(id);
      if (sprint.getDtEnd()
                .isBefore(Instant.now())) {
        List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(entity.getProject()
                                                                                        .getId(), sprint.getId());
        if (snapshots.isEmpty()) {
          throw AppException.builder()
                            .error(Error.NOT_FOUND)
                            .message("No task found in this sprint")
                            .build();
        }
        IssueSnapshot snapshot = snapshots.stream()
                                          .filter(s -> s.getNkTaskId()
                                                        .equals(id))
                                          .findFirst()
                                          .orElseThrow(() -> AppException.builder()
                                                                         .error(Error.NOT_FOUND)
                                                                         .message("Task not found in this sprint")
                                                                         .build());
        IssueDetailResponse response = taskMapper.toIssueDetailResponseFromSnapshot(snapshot);

        response.setAssignee(userMapper.toUserDetailDTO(userService.getUserByUniId(snapshot.getAssignee())));
        response.setReviewer(userMapper.toUserDetailDTO(userService.getUserByUniId(snapshot.getReviewer())));
        return ApiResponse.<IssueDetailResponse>builder()
                          .code(HttpStatus.OK.value())
                          .message("Get task detail successfully")
                          .data(response)
                          .build();
      }
    }
    var taskMongo = issueMongoService.getById(id);
    var taskResponse = taskMapper.toIssueDetailResponse(entity, taskMongo);
    return ApiResponse.<IssueDetailResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Get task detail successfully")
                      .data(taskResponse)
                      .build();

  }

  @SendKafkaEvent(topic = "task-log")
  @Transactional
  public ApiResponse<IssueResponse> updateTask(IssueUpdateRequest updateRequest) {
    String id = updateRequest.getId();
    String fliedChanged = updateRequest.getFieldChanging();
    var task = getEntityById(id);
    var taskMongo = issueMongoService.getById(id);
    ChangeLogRequest changeLog;
    switch (fliedChanged) {
      case "name":
        task.setName(updateRequest.getName());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"name"}, task, taskMongo);
        break;
      case "description":
        task.setDescription(updateRequest.getDescription());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"description"}, task, taskMongo);
        break;
      case "sprint":
        Sprint targetSprint = sprintService.getSprintById(updateRequest.getSprintId());
        Sprint currentSprint = task.getSprint();
        Instant now = Instant.now();

        if (currentSprint == null || currentSprint.getDtEnd()
                                                  .isBefore(now)) {
          if (targetSprint.getDtEnd()
                          .isBefore(now)) {
            throw AppException.builder()
                              .error(Error.SPRINT_ALREADY_END)
                              .message("Cannot assign issue to sprint that has already ended")
                              .build();
          }

          if (targetSprint.getDtStart()
                          .isBefore(now)) {
            throw AppException.builder()
                              .error(Error.SPRINT_ALREADY_START)
                              .message("Cannot assign issue to sprint that has already started")
                              .build();
          }

          task.setSprint(targetSprint);
          task = saveEntity(task);
          changeLog = changeLogMapper.taskToUpdate(new String[]{"sprint"}, task, taskMongo);
          break;
        }

        if (currentSprint.getDtStart()
                         .isAfter(now)) {
          task.setSprint(targetSprint);
          task = saveEntity(task);
          changeLog = changeLogMapper.taskToUpdate(new String[]{"sprint"}, task, taskMongo);
          break;
        }

        // Current sprint is already started, cannot reassign
        throw AppException.builder()
                          .error(Error.SPRINT_ALREADY_START)
                          .message("Cannot assign issue to sprint that has already started")
                          .build();
      case "priority":
        task.setPriority(updateRequest.getPriority());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"priority"}, task, taskMongo);
        break;
      case "status":
        task.setPriority(updateRequest.getPriority());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"status"}, task, taskMongo);
        break;
      case "topics":
        taskMongo.setTopics(topicMapper.toTopicList(updateRequest.getTopics()));
        taskMongo = issueMongoService.saveDocument(taskMongo);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"topics"}, task, taskMongo);
        break;
      case "subtasks":
        taskMongo.setSubtasks(subTaskMapper.toSubTaskList(updateRequest.getSubtasks()));
        taskMongo = issueMongoService.saveDocument(taskMongo);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"subtasks"}, task, taskMongo);
        break;
      case "attachments":
        List<Resource> resources = task.getResources();
        List<String> newResource = new ArrayList<>(updateRequest.getAttachments()
                                                                .stream()
                                                                .map(AttachmentRequest::getResourceId)
                                                                .toList());
        resources = resources.stream()
                             .filter(r -> !newResource.contains(r.getId()))
                             .toList();
        newResource.removeAll(resources.stream()
                                       .map(BaseEntity::getId)
                                       .toList());
        for (String resourceId : newResource) {
          Resource resource = resourceService.getById(resourceId);
          resources.add(resource);
        }
        task.setResources(resources);
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"attachments"}, task, taskMongo);
        break;
      case "assignee":
        if (updateRequest.getAssignee() == null || updateRequest.getAssignee()
                                                                .isEmpty()) {
          task.setAssignee(null);
        }
        else {
          User assignee = userService.getUserByUniId(updateRequest.getAssignee());
          task.setAssignee(assignee);
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"assignee"}, task, taskMongo);
        break;
      case "reviewer":
        if (updateRequest.getReviewer() == null || updateRequest.getReviewer()
                                                                .isEmpty()) {
          task.setReviewer(null);
        }
        else {
          User reviewer = userService.getUserByUniId(updateRequest.getReviewer());
          task.setReviewer(reviewer);
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"reviewer"}, task, taskMongo);
        break;
      case "start":
        task.setDtStart(updateRequest.getStart());
        if (task.getSprint() != null && task.getDtStart()
                                            .isBefore(task.getSprint()
                                                          .getDtStart())) {
          Map<String, String> error = new HashMap<>();
          error.put("start", "Start date cannot be before sprint start date");
          List<Map<String, String>> errors = new ArrayList<>();
          errors.add(error);
          throw AppMethodArgumentNotValidException.builder()
                                                  .error(errors)
                                                  .build();
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"start"}, task, taskMongo);
        break;
      case "end":
        task.setDtEnd(updateRequest.getEnd());
        if (task.getSprint() != null && task.getDtEnd()
                                            .isAfter(task.getSprint()
                                                         .getDtEnd())) {
          Map<String, String> error = new HashMap<>();
          error.put("end", "End date cannot be after sprint end date");
          List<Map<String, String>> errors = new ArrayList<>();
          errors.add(error);
          throw AppMethodArgumentNotValidException.builder()
                                                  .error(errors)
                                                  .build();
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[]{"end"}, task, taskMongo);
        break;
      default:
        throw AppException.builder()
                          .error(Error.INVALID_PARAMETER_REQUEST)
                          .build();
    }
    return ApiResponse.<IssueResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Update task successfully")
                      .data(taskMapper.toIssueResponse(task, taskMongo))
                      .logData(changeLog)
                      .build();
  }

  @Transactional
  public ApiResponse<List<IssueResponse>> getIssuesBySprintId(IssueOfSprintRequest request) {

    String sprintId = request.getSprintId();
    String projectId = request.getProjectId();
    if (sprintId == null || sprintId.isEmpty()) {
      // check relationship
      List<Issue> issues = projectService.getProjectById(projectId)
                                         .getIssues();
      issues = issues.stream()
                     .filter(issue -> issue.getSprint() == null)
                     .toList();

      return buildResponseFromIssues(issues);
    }

    Sprint sprint = sprintService.getSprintById(sprintId);
    if (Instant.now()
               .isAfter(sprint.getDtEnd())) {
      List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(projectId, sprintId);
      List<IssueResponse> responses = snapshots.stream()
                                               .map(this::buildResponseFromSnapshot)
                                               .toList();
      return ApiResponse.<List<IssueResponse>>builder()
                        .code(HttpStatus.OK.value())
                        .message("Get issues successfully")
                        .data(responses)
                        .build();
    }

    List<Issue> issues = taskRepository.findAllByProjectIdAndSprintId(projectId, sprintId)
                                       .orElseThrow(() -> AppException.builder()
                                                                      .error(Error.NOT_FOUND)
                                                                      .build());

    return buildResponseFromIssues(issues);
  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<IssueResponse> updateTask(IssueUpdateStatusRequest request) {
    String id = request.getId();
    var task = getEntityById(id);
    var taskMongo = issueMongoService.getById(id);
    ChangeLogRequest changeLog;
    task.setStatus(request.getStatus());

    if (task.getStatus()
            .equals(IssueStatus.DONE)) {


    }

    task.setPosition(request.getPosition());
    task = saveEntity(task);
    changeLog = changeLogMapper.taskToUpdate(new String[]{"status",
                                                          "position"}, task, taskMongo);
    return ApiResponse.<IssueResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Update task successfully")
                      .data(taskMapper.toIssueResponse(task, taskMongo))
                      .logData(changeLog)
                      .build();
  }

  private IssueResponse buildResponseFromSnapshot(IssueSnapshot snapshot) {

    User assignee = Optional.ofNullable(snapshot.getAssignee())
                            .map(userService::getUserById)
                            .orElse(null);
    User reviewer = Optional.ofNullable(snapshot.getReviewer())
                            .map(userService::getUserById)
                            .orElse(null);

    return IssueResponse.builder()
                        .id(snapshot.getNkTaskId())
                        .name(snapshot.getName())
                        .description(snapshot.getDescription())
                        .status(IssueStatus.fromString(snapshot.getStatus()))
                        .priority(IssuePriority.fromString(snapshot.getPriority()))
                        .tag(IssueTag.fromString(snapshot.getTag()))
                        .position(snapshot.getPosition())
                        .start(snapshot.getDtStart())
                        .end(snapshot.getDtEnd())
                        .assignee(userMapper.toUserDetailDTO(assignee))
                        .reviewer(userMapper.toUserDetailDTO(reviewer))
                        .build();
  }

  private ApiResponse<List<IssueResponse>> buildResponseFromIssues(List<Issue> issues) {

    if (issues.isEmpty()) {
      return ApiResponse.<List<IssueResponse>>builder()
                        .code(HttpStatus.OK.value())
                        .message("No task found")
                        .data(null)
                        .build();
    }

    List<IssueResponse> responses = issues.stream()
                                          .map(issue -> {
                                            var issueMongo = issueMongoService.getById(issue.getId());
                                            return taskMapper.toIssueResponse(issue, issueMongo);
                                          })
                                          .toList();

    return ApiResponse.<List<IssueResponse>>builder()
                      .code(HttpStatus.OK.value())
                      .message("Get issues successfully")
                      .data(responses)
                      .build();
  }

  public ApiResponse<IssueDetailResponse> getCurrentIssueDetailById(String id) {

    var entity = getEntityById(id);
    var taskMongo = issueMongoService.getById(id);
    var taskResponse = taskMapper.toIssueDetailResponse(entity, taskMongo);
    return ApiResponse.<IssueDetailResponse>builder()
                      .code(HttpStatus.OK.value())
                      .message("Get task detail successfully")
                      .data(taskResponse)
                      .build();

  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<IssueRelationResponse> createRelation(IssueAssignSprintRequest request) {
    Issue issue = getEntityById(request.getIssueId());
    Issue relatedIssue = getEntityById(request.getIssueRelatedId());
    IssueRelation relation = IssueRelation.builder()
                                          .id(IssueRelationId.builder()
                                                             .issueId(issue.getId())
                                                             .issueRelatedId(relatedIssue.getId())
                                                             .build())
                                          .issue(issue)
                                          .issueRelated(relatedIssue)
                                          .typeRelation(request.getTypeRelation())
                                          .build();
    ChangeLogRequest changeLog = changeLogMapper.taskToCreateRelation(issue, issueMongoService.getById(issue.getId()));
    relation = issueRelationRepository.save(relation);
    return ApiResponse.<IssueRelationResponse>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Create relation successfully")
                      .data(taskMapper.toIssueRelationResponse(relation))
                      .logData(changeLog)
                      .build();
  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<IssueRelationResponse> deleteRelation(IssueAssignSprintRequest request) {
    Issue issue = getEntityById(request.getIssueId());
    Issue relatedIssue = getEntityById(request.getIssueRelatedId());
    IssueRelation relation = IssueRelation.builder()
                                          .issue(issue)
                                          .issueRelated(relatedIssue)
                                          .typeRelation(request.getTypeRelation())
                                          .build();
    ChangeLogRequest changeLog = changeLogMapper.taskToCreateRelation(issue, issueMongoService.getById(issue.getId()));
    relation = issueRelationRepository.save(relation);
    return ApiResponse.<IssueRelationResponse>builder()
                      .code(HttpStatus.CREATED.value())
                      .message("Create relation successfully")
                      .data(taskMapper.toIssueRelationResponse(relation))
                      .logData(changeLog)
                      .build();
  }
}
