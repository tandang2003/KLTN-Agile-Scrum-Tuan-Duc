package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.request.entity.issue.*;
import com.kltn.server.DTO.request.log.ChangeLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueRelationResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.DTO.response.skill.UserSuitableResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.AppMethodArgumentNotValidException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.mapper.entity.SkillMapper;
import com.kltn.server.mapper.entity.UserMapper;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.entity.*;
import com.kltn.server.model.entity.embeddedKey.IssueRelationId;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.IssueRelation;
import com.kltn.server.model.entity.relationship.PersonalSkill;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueRelationType;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.IssueTag;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.relation.IssueRelationRepository;
import com.kltn.server.repository.entity.relation.PersonalSkillRepository;
import com.kltn.server.service.mongo.IssueMongoService;
import com.kltn.server.service.mongo.snapshot.SnapshotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
public class IssueService {
  private final SprintService sprintService;
  private final UserMapper userMapper;
  private final PersonalSkillRepository personalSkillRepository;
  private final SkillMapper skillMapper;
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
      ResourceService resourceService, ChangeLogMapper changeLogMapper, IssueMongoService issueMongoService,
      UserService userService, ProjectSprintService projectSprintService, IssueMapper taskMapper,
      IssueRepository taskRepository, SprintService sprintService, UserMapper userMapper,
      PersonalSkillRepository personalSkillRepository, SkillMapper skillMapper) {
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
    this.personalSkillRepository = personalSkillRepository;
    this.skillMapper = skillMapper;
  }

  @SendKafkaEvent(topic = "task-log")
  @Transactional
  public ApiResponse<IssueResponse> createTask(IssueCreateRequest issueCreateRequest) {

    Project project = projectService.getProjectById(issueCreateRequest.getProjectId());
    var task = taskMapper.toEntity(issueCreateRequest);
    task.setProject(project);
    if (issueCreateRequest.getAssigneeId() != null && !issueCreateRequest.getAssigneeId().isEmpty()) {
      User assignee = userService.getUserByUniId(issueCreateRequest.getAssigneeId());
      task.setAssignee(assignee);
    }
    if (issueCreateRequest.getReviewerId() != null && !issueCreateRequest.getReviewerId().isEmpty()) {
      User reviewer = userService.getUserByUniId(issueCreateRequest.getReviewerId());
      task.setReviewer(reviewer);
    }
    if (issueCreateRequest.getSprintId() != null && !issueCreateRequest.getSprintId().isEmpty()) {
      Sprint sprint = sprintService.getSprintById(issueCreateRequest.getSprintId());
      if (task.getDtStart() == null) {
        task.setDtStart(sprint.getDtStart());
      } else if (task.getDtStart() != null && task.getDtStart().isBefore(sprint.getDtStart())) {
        Map<String, String> error = new HashMap<>();
        error.put("start", "Start date cannot be before sprint start date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder().error(errors).build();
      }
      if (task.getDtEnd() == null) {
        task.setDtEnd(sprint.getDtEnd());
      } else if (task.getDtEnd() != null && task.getDtEnd().isAfter(sprint.getDtEnd())) {
        Map<String, String> error = new HashMap<>();
        error.put("end", "End date cannot be after sprint end date");
        List<Map<String, String>> errors = new ArrayList<>();
        errors.add(error);
        throw AppMethodArgumentNotValidException.builder().error(errors).build();
      }
      task.setSprint(sprint);
      task.setDtAppend(ClockSimulator.now());

    }
    if (issueCreateRequest.getAttachments() != null && !issueCreateRequest.getAttachments().isEmpty()) {
      List<Resource> resources = issueCreateRequest.getAttachments()
          .stream()
          .map(id -> resourceService.getById(id.getResourceId()))
          .toList();
      task.setResources(resources);
    }
    task = taskRepository.save(task);
    if (task == null || task.getId() == null) {
      throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
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
    if (issueCreateRequest.getAssigneeId() != null && !issueCreateRequest.getAssigneeId().isEmpty()) {
      User assignee = userService.getUserByUniId(issueCreateRequest.getAssigneeId());
      task.setAssignee(assignee);
    }
    if (issueCreateRequest.getReviewerId() != null && !issueCreateRequest.getReviewerId().isEmpty()) {
      User reviewer = userService.getUserByUniId(issueCreateRequest.getReviewerId());
      task.setReviewer(reviewer);
    }
//    if (issueCreateRequest.getSprintId() != null && !issueCreateRequest.getSprintId().isEmpty()) {
//      Sprint sprint = sprintService.getSprintById(issueCreateRequest.getSprintId());
//      Instant now = ClockSimulator.now();
//      if (now.isAfter(sprint.getDtStart())) {
//        throw AppException.builder().error(Error.SPRINT_ALREADY_START).build();
//      }
//      if (now.isAfter(sprint.getDtEnd())) {
//        throw AppException.builder().error(Error.SPRINT_ALREADY_END).build();
//      }
//      if (task.getDtStart() == null) {
//        task.setDtStart(sprint.getDtStart());
//      } else if (task.getDtStart() != null && task.getDtStart().isBefore(sprint.getDtStart())) {
//        Map<String, String> error = new HashMap<>();
//        error.put("start", "Start date cannot be before sprint start date");
//        List<Map<String, String>> errors = new ArrayList<>();
//        errors.add(error);
//        throw AppMethodArgumentNotValidException.builder().error(errors).build();
//      }
//      if (task.getDtEnd() == null) {
//        task.setDtEnd(sprint.getDtEnd());
//      } else if (task.getDtEnd() != null && task.getDtEnd().isAfter(sprint.getDtEnd())) {
//        Map<String, String> error = new HashMap<>();
//        error.put("end", "End date cannot be after sprint end date");
//        List<Map<String, String>> errors = new ArrayList<>();
//        errors.add(error);
//        throw AppMethodArgumentNotValidException.builder().error(errors).build();
//      }
//      task.setSprint(sprint);
//      task.setDtAppend(ClockSimulator.now());
//    }
    if (issueCreateRequest.getAttachments() != null && !issueCreateRequest.getAttachments().isEmpty()) {
      List<Resource> resources = issueCreateRequest.getAttachments()
          .stream()
          .map(id -> resourceService.getById(id.getResourceId()))
          .toList();
      task.setResources(resources);
    }
    task = taskRepository.save(task);
    if (task == null || task.getId() == null) {
      throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
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
      throw AppException.builder().error(Error.DB_SERVER_MISSING_DATA).build();
    }
    return issue;

  }

  public ApiResponse<IssueDetailResponse> getIssueDetailById(IssueDetailRequest request) {

    String id = request.getIssueId();
    var entity = getEntityById(id);
    if (request.getSprintId() != null && !request.getSprintId().isEmpty()) {
      Sprint sprint = sprintService.getSprintById(id);
      if (sprint.getDtEnd().isBefore(ClockSimulator.now())) {
        List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(entity.getProject()
            .getId(), sprint.getId());
        if (snapshots.isEmpty()) {
          throw AppException.builder().error(Error.NOT_FOUND).message("No task found in this sprint").build();
        }
        IssueSnapshot snapshot = snapshots.stream()
            .filter(s -> s.getNkTaskId().equals(id))
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
        changeLog = changeLogMapper.taskToUpdate(new String[] { "name" }, task, taskMongo);
        break;
      case "description":
        task.setDescription(updateRequest.getDescription());
        task.setNumChangeOfDescription(task.getNumChangeOfDescription() + 1);
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "description" }, task, taskMongo);
        break;
      case "sprint":
        Sprint targetSprint = updateRequest.getSprintId() == null || updateRequest.getSprintId()
            .isEmpty() ? null : sprintService.getSprintById(updateRequest.getSprintId());
        if (targetSprint == null) {
          // remove sprint
          task.setSprint(null);
          task.setDtAppend(null);
          task.setStatus(IssueStatus.BACKLOG);
          task = saveEntity(task);
          changeLog = changeLogMapper.taskToUpdate(new String[] { "sprint" }, task, taskMongo);
          break;
        }
        Sprint currentSprint = task.getSprint();
        Instant now = ClockSimulator.now();

        if (currentSprint == null || currentSprint.getDtEnd().isBefore(now)) {
          // sprint moi da ket thuc, khong the gan lai
          if (targetSprint.getDtEnd().isBefore(now)) {
            throw AppException.builder()
                .error(Error.SPRINT_ALREADY_END)
                .message("Cannot assign issue to sprint that has already ended")
                .build();
          }
          // sprint moi dat bat dau truoc thoi diem hien tai
          if (targetSprint.getDtStart().isBefore(now)) {
            throw AppException.builder()
                .error(Error.SPRINT_ALREADY_START)
                .message("Cannot assign issue to sprint that has already started")
                .build();
          }
          task.setStatus(IssueStatus.TODO);
          task.setSprint(targetSprint);
          task.setDtAppend(ClockSimulator.now());
          if (task.getDtStart() == null || task.getDtStart().isBefore(targetSprint.getDtStart())) {
            task.setDtStart(targetSprint.getDtStart());
          }
          if (task.getDtEnd() == null || task.getDtEnd().isAfter(targetSprint.getDtEnd())) {
            task.setDtEnd(targetSprint.getDtEnd());
          }
          task = saveEntity(task);
          changeLog = changeLogMapper.taskToUpdate(new String[] { "sprint" }, task, taskMongo);
          break;
        }

        if (currentSprint.getDtStart().isAfter(now)) {
          task.setSprint(targetSprint);
          task.setDtAppend(ClockSimulator.now());

          task = saveEntity(task);
          changeLog = changeLogMapper.taskToUpdate(new String[] { "sprint" }, task, taskMongo);
          break;
        }

        // Current sprint is already started, cannot reassign
        throw AppException.builder()
            .error(Error.SPRINT_ALREADY_START)
            .message("Cannot assign issue to sprint that has already started")
            .build();
      case "complexOfDescription":
        task.setComplexOfDescription(updateRequest.getComplexOfDescription());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "complexOfDescription" }, task, taskMongo);
        break;
      case "priority":

        task.setPriority(updateRequest.getPriority());
        task.setNumChangeOfPriority(task.getNumChangeOfPriority() + 1);

        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "priority" }, task, taskMongo);
        break;
      case "status":
        task.setPriority(updateRequest.getPriority());
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "status" }, task, taskMongo);
        break;
      case "topics":
        taskMongo.setTopics(topicMapper.toTopicList(updateRequest.getTopics()));
        taskMongo = issueMongoService.saveDocument(taskMongo);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "topics" }, task, taskMongo);
        break;
      case "subtasks":
        taskMongo.setSubtasks(subTaskMapper.toSubTaskList(updateRequest.getSubtasks()));
        taskMongo = issueMongoService.saveDocument(taskMongo);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "subtasks" }, task, taskMongo);
        break;
      case "attachments":
        List<Resource> resources = task.getResources();
        List<String> newResource = new ArrayList<>(updateRequest.getAttachments()
            .stream()
            .map(AttachmentRequest::getResourceId)
            .toList());
        resources = resources.stream().filter(r -> !newResource.contains(r.getId())).toList();
        newResource.removeAll(resources.stream().map(BaseEntity::getId).toList());
        for (String resourceId : newResource) {
          Resource resource = resourceService.getById(resourceId);
          resources.add(resource);
        }
        task.setResources(resources);
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "attachments" }, task, taskMongo);
        break;
      case "assignee":
        if (updateRequest.getAssignee() == null || updateRequest.getAssignee().isEmpty()) {
          task.setAssignee(null);
        } else {
          User assignee = userService.getUserByUniId(updateRequest.getAssignee());
          task.setAssignee(assignee);
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "assignee" }, task, taskMongo);
        break;
      case "reviewer":
        if (updateRequest.getReviewer() == null || updateRequest.getReviewer().isEmpty()) {
          task.setReviewer(null);
        } else {
          User reviewer = userService.getUserByUniId(updateRequest.getReviewer());
          task.setReviewer(reviewer);
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "reviewer" }, task, taskMongo);
        break;
      case "start":
        task.setDtStart(updateRequest.getStart());
        if (task.getSprint() != null && task.getDtStart().isBefore(task.getSprint().getDtStart())) {
          Map<String, String> error = new HashMap<>();
          error.put("start", "Start date cannot be before sprint start date");
          List<Map<String, String>> errors = new ArrayList<>();
          errors.add(error);
          throw AppMethodArgumentNotValidException.builder().error(errors).build();
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "start" }, task, taskMongo);
        break;
      case "end":
        task.setDtEnd(updateRequest.getEnd());
        if (task.getSprint() != null && task.getDtEnd().isAfter(task.getSprint().getDtEnd())) {
          Map<String, String> error = new HashMap<>();
          error.put("end", "End date cannot be after sprint end date");
          List<Map<String, String>> errors = new ArrayList<>();
          errors.add(error);
          throw AppMethodArgumentNotValidException.builder().error(errors).build();
        }
        task = saveEntity(task);
        changeLog = changeLogMapper.taskToUpdate(new String[] { "end" }, task, taskMongo);
        break;
      default:
        throw AppException.builder().error(Error.INVALID_PARAMETER_REQUEST).build();
    }
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      System.out.println(authentication.getPrincipal().toString());
    }

    return ApiResponse.<IssueResponse>builder()
        .code(HttpStatus.OK.value())
        .message("Update task successfully")
        .data(taskMapper.toIssueResponse(task, taskMongo))

        .logData(changeLog)
        .build();
  }

  public ApiResponse<List<IssueResponse>> getIssuesBySprintId(IssueOfSprintRequest request) {

    String sprintId = request.getSprintId();
    String projectId = request.getProjectId();
    if (sprintId == null || sprintId.isEmpty()) {
      // check relationship
      List<Issue> issues = projectService.getProjectById(projectId).getIssues();
      issues = issues.stream()
          .filter(issue -> issue.getSprint() == null || (issue.getSprint() != null && issue.getSprint()
              .getDtEnd()
              .isBefore(ClockSimulator.now()) && issue.isOpen() && !issue.getStatus().equals(IssueStatus.DONE)))
          .toList();
      issues.forEach(issue -> {
        if (!issue.getStatus().equals(IssueStatus.BACKLOG)) {
          issue.setOpen(true);
          issue.setStatus(IssueStatus.BACKLOG);
          issue.setSprint(null);
          issue.setDtAppend(null);
          taskRepository.save(issue);
        }
      });
      return buildResponseFromIssues(issues);
    }

    Sprint sprint = sprintService.getSprintById(sprintId);
    if (ClockSimulator.now().isAfter(sprint.getDtEnd())) {
      List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(projectId, sprintId);
      List<IssueResponse> responses = snapshots.stream().map(this::buildResponseFromSnapshot).toList();
      return ApiResponse.<List<IssueResponse>>builder()
          .code(HttpStatus.OK.value())
          .message("Get issues successfully")
          .data(responses)
          .build();
    }

    List<Issue> issues = taskRepository.findAllByProjectIdAndSprintId(projectId, sprintId)
        .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());

    return buildResponseFromIssues(issues);
  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<IssueResponse> updateTask(IssueUpdateStatusRequest request) {
    String id = request.getId();
    var task = getEntityById(id);
    var taskMongo = issueMongoService.getById(id);
    ChangeLogRequest changeLog;
    if (request.getStatus().equals(IssueStatus.DONE)) {
      task.setOpen(false);
      task.setDtEnd(ClockSimulator.now());
    } else if (task.getStatus().equals(IssueStatus.DONE) && !request.getStatus().equals(IssueStatus.DONE)) {
      task.setOpen(true);
      task.setDtEnd(null);
    }
    task.setStatus(request.getStatus());

    task.setPosition(request.getPosition());
    task = saveEntity(task);
    changeLog = changeLogMapper.taskToUpdate(new String[] {
        "status",
        "position" }, task, taskMongo);
    return ApiResponse.<IssueResponse>builder()
        .code(HttpStatus.OK.value())
        .message("Update task successfully")
        .data(taskMapper.toIssueResponse(task, taskMongo))
        .logData(changeLog)
        .build();
  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<Boolean> reopen(String id) {
    Issue issue = getEntityById(id);
    if (issue.getStatus() != IssueStatus.DONE) {
      throw AppException.builder().error(Error.INVALID_PARAMETER_REQUEST).message("Issue is not done").build();
    }
    // changed
    issue.setStatus(IssueStatus.BACKLOG);
    issue.setOpen(true);
    issue.setSprint(null);
    issue.setDtAppend(null);
    issue = saveEntity(issue);
    var taskMongo = issueMongoService.getById(issue.getId());
    ChangeLogRequest changeLog = changeLogMapper.taskToUpdate(new String[] { "open" }, issue, taskMongo);
    return ApiResponse.<Boolean>builder()
        .code(HttpStatus.OK.value())
        .message("Reopen issue successfully")
        .data(issue.isOpen())
        .logData(changeLog)
        .build();

  }

  private IssueResponse buildResponseFromSnapshot(IssueSnapshot snapshot) {

    User assignee = Optional.ofNullable(snapshot.getAssignee()).map(userService::getUserById).orElse(null);
    User reviewer = Optional.ofNullable(snapshot.getReviewer()).map(userService::getUserById).orElse(null);

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

    List<IssueResponse> responses = issues.stream().map(issue -> {
      var issueMongo = issueMongoService.getById(issue.getId());
      return taskMapper.toIssueResponse(issue, issueMongo);
    }).toList();

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
  public ApiResponse<IssueRelationResponse> createRelation(IssueAssignRelationRequest request) {
    Issue issue = getEntityById(request.getIssueId());
    Issue relatedIssue = getEntityById(request.getIssueRelatedId());
    IssueRelation relation = IssueRelation.builder()
        .id(IssueRelationId.builder().issueId(issue.getId()).issueRelatedId(relatedIssue.getId()).build())
        .issue(issue)
        .issueRelated(relatedIssue)
        .typeRelation(request.getTypeRelation())
        .build();
    relation = issueRelationRepository.save(relation);
    issue.getAffectTo().add(relation);
    ChangeLogRequest changeLog = changeLogMapper.taskToCreateRelation(issue, issueMongoService.getById(issue.getId()));
    return ApiResponse.<IssueRelationResponse>builder()
        .code(HttpStatus.CREATED.value())
        .message("Create relation successfully")
        .data(taskMapper.toIssueRelationResponse(relation))
        .logData(changeLog)
        .build();
  }

  @SendKafkaEvent(topic = "task-log")
  public ApiResponse<Void> deleteRelation(IssueRemoveRelationRequest request) {
    IssueRelationId relationId = IssueRelationId.builder()
        .issueId(request.getIssueId())
        .issueRelatedId(request.getIssueRelatedId())
        .build();

    IssueRelation relation = issueRelationRepository.findById(relationId)
        .orElseThrow(
            () -> AppException.builder().error(Error.NOT_FOUND).message("Issue relation doesn't found").build());
    Issue issue = getEntityById(request.getIssueId());
    boolean removed = issue.getAffectTo().remove(relation);

    issueRelationRepository.delete(relation); // still call delete directly
    // issueRelationRepository.flush(); // force DB sync for debug

    ChangeLogRequest changeLog = changeLogMapper.taskToRemoveRelation(issue, issueMongoService.getById(issue.getId()));
    return ApiResponse.<Void>builder()
        .code(HttpStatus.OK.value())
        .message("Remove relation successfully")
        .logData(changeLog)
        .build();

  }

  private IssueRelation reverse(IssueRelation relation) {
    IssueRelation.IssueRelationBuilder builder = switch (relation.getTypeRelation()) {
      case BLOCKS -> IssueRelation.builder().typeRelation(IssueRelationType.IS_BLOCKED_BY);
      case IssueRelationType.IS_BLOCKED_BY -> IssueRelation.builder().typeRelation(IssueRelationType.BLOCKS);
      case RELATES_TO -> IssueRelation.builder().typeRelation(IssueRelationType.IS_RELATED_TO);
      case IS_RELATED_TO -> IssueRelation.builder().typeRelation(IssueRelationType.RELATES_TO);
      case DEPENDS_ON -> IssueRelation.builder().typeRelation(IssueRelationType.IS_DEPENDED_ON_BY);
      case IS_DEPENDED_ON_BY -> IssueRelation.builder().typeRelation(IssueRelationType.DEPENDS_ON);
      case SUPERSEDES -> IssueRelation.builder().typeRelation(IssueRelationType.IS_SUPERSEDED_BY);
      case IS_SUPERSEDED_BY -> IssueRelation.builder().typeRelation(IssueRelationType.SUPERSEDES);
      case DUPLICATES -> IssueRelation.builder().typeRelation(IssueRelationType.IS_DUPLICATED_BY);
      case IS_DUPLICATED_BY -> IssueRelation.builder().typeRelation(IssueRelationType.DUPLICATES);
    };
    return builder.issue(relation.getIssueRelated()).issueRelated(relation.getIssue()).build();
  }

  public ApiResponse<List<IssueRelationResponse>> getRelations(String id) {
    Issue issue = getEntityById(id);
    List<IssueRelation> relations = issue.getAffectTo();
    relations.addAll(issue.getAffectBy().stream().map(this::reverse).toList());
    if (relations.isEmpty()) {
      return ApiResponse.<List<IssueRelationResponse>>builder()
          .code(HttpStatus.OK.value())
          .message("No relation found")
          .data(Collections.emptyList())
          .build();
    }
    List<IssueRelationResponse> responses = taskMapper.toListIssueRelationResponse(relations);
    return ApiResponse.<List<IssueRelationResponse>>builder()
        .code(HttpStatus.OK.value())
        .message("Get relations successfully")
        .data(responses)
        .build();
  }

  public ApiResponse<List<IssueResponse>> getIssueWithTypeRelation(String id, String type) {
    Issue issue = getEntityById(id);
    return switch (IssueRelationType.fromValue(type)) {
      case IssueRelationType.IS_BLOCKED_BY, IssueRelationType.IS_RELATED_TO, IssueRelationType.IS_DEPENDED_ON_BY,
          IssueRelationType.IS_SUPERSEDED_BY, IssueRelationType.IS_DUPLICATED_BY -> {
        List<Issue> issues = taskRepository.findByProjectIdAndIdNot(issue.getProject().getId(), issue.getId())
            .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        yield buildResponseFromIssues(issues);

      }
      default -> getIssuesBySprintId(new IssueOfSprintRequest(issue.getSprint() != null ? issue.getSprint()
          .getId() : null, issue.getProject().getId()));
    };
  }

  public int getNumberOfIssuesAtStart(Project project, Sprint sprint) {
    return taskRepository.countByProjectIdAndSprintIdAndDtAppendLessThanEqual(project.getId(), sprint.getId(),
        sprint.getDtStart());
  }

  public int getNumberOfIssuesAdded(Project project, Sprint sprint) {
    return taskRepository.countByProjectIdAndSprintIdAndDtAppendGreaterThan(project.getId(), sprint.getId(),
        sprint.getDtStart());
  }

  public int getNumberOfIssuesRemoved(Project project, Sprint sprint) {
    return taskRepository.countByProjectIdAndSprintIdAndDtEndBeforeAndStatus(project.getId(), sprint.getId(),
        ClockSimulator.now(), IssueStatus.DONE);
  }

  public int getNumberOfIssuesByStatus(Project project, Sprint sprint, IssueStatus status) {
    return taskRepository.countByProjectIdAndSprintIdAndStatus(project.getId(), sprint.getId(), status);
  }

  public int getNumberOfIssuesByStatuses(Project project, Sprint sprint, List<IssueStatus> statuses) {
    return taskRepository.countByProjectIdAndSprintIdAndStatusIn(project.getId(), sprint.getId(), statuses);
  }

  public int getNumberOfMembersInSprint(Project project, Sprint sprint) {
    return taskRepository.countByProjectIdAndSprintIdAndAssigneeNotNull(project.getId(), sprint.getId());
  }

  public List<Issue> getIssuesBySprintId(String projectId, String sprintId) {
    return taskRepository.findAllByProjectIdAndSprintId(projectId, sprintId)
        .orElseThrow(() -> AppException.builder()
            .error(Error.NOT_FOUND)
            .message("No issues found for project and sprint")
            .build());
  }

  public int getNumberOfAffectVersions(String id) {
    return taskRepository.getNumberOfAffectVersions(id);
  }

  public int getNumberOfFixVersions(String id) {
    int result = 1;
    Issue issue = getEntityById(id);
    var project = issue.getProject();
    Instant now = ClockSimulator.now();

    List<Sprint> finishedSprints = project.getSprints()
        .stream()
        .filter(sprint -> sprint.getDtEnd().isBefore(now))
        .toList();

    if (finishedSprints.isEmpty()) {
      return result;
    }

    for (Sprint sprint : finishedSprints) {
      List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(project.getId(), sprint.getId());
      if (snapshots.stream().anyMatch(s -> s.getNkTaskId().equals(id))) {
        result++;
      }
    }

    return result;
  }

  public int getNumberOfLink(String id) {
    Issue issue = getEntityById(id);
    int result = 0;
    if (issue.getAffectTo() != null && !issue.getAffectTo().isEmpty()) {
      result += issue.getAffectTo().size();
    }
    if (issue.getAffectBy() != null && !issue.getAffectBy().isEmpty()) {
      result += issue.getAffectBy().size();
    }
    return result;
  }

  // số lượng issue block issue này lại
  public int getNumberOfBlocked(String id) {
    return issueRelationRepository.countIssueRelationByTypeRelationAndIssueId(IssueRelationType.IS_BLOCKED_BY, id);
  }

  // số lượng issue mà issue này block lại
  public int getNumberOfBlock(String id) {
    return issueRelationRepository.countIssueRelationByTypeRelationAndIssueRelatedId(IssueRelationType.IS_BLOCKED_BY,
        id);
  }

  public int getNumberOfComments(String id) {
    var issueMongo = issueMongoService.getById(id);
    if (issueMongo == null || issueMongo.getComments() == null) {
      return 0;
    }
    return issueMongo.getComments().size();
  }

  public int getNumChangeFixVersion(String id) {
    int result = 0;
    Issue issue = getEntityById(id);
    var project = issue.getProject();
    Instant now = ClockSimulator.now();

    List<Sprint> finishedSprints = project.getSprints()
        .stream()
        .filter(sprint -> sprint.getDtEnd().isBefore(now))
        .toList();
    for (Sprint sprint : finishedSprints) {
      List<IssueSnapshot> snapshots = snapshotService.getByProjectIdAndSprintId(project.getId(), sprint.getId());
      if (snapshots.stream()
          .anyMatch(
              s -> s.getNkTaskId().equals(id) && IssueStatus.fromString(s.getStatus()).equals(IssueStatus.DONE))) {
        result++;
      }
    }
    return result;
  }

  public double calculateCompatibleOfAssignee(Issue issue) {
    User assignee = issue.getAssignee();
    if (assignee == null) {
      return 0;
    }
    var issueMongo = issueMongoService.getById(issue.getId());

    int point = 0;
    List<Topic> topics = issueMongo.getTopics();
    List<PersonalSkill> skills = personalSkillRepository.findByUser(assignee).orElse(new ArrayList<>());
    for (PersonalSkill skill : skills) {
      if (topics.stream()
          .anyMatch(topic -> topic.getName().trim().equalsIgnoreCase(skill.getSkill().getName().trim()))) {
        point += skill.getProficiency();
      }
    }
    return point / (double) skills.size();
  }

  @SendKafkaEvent(topic = "task-log")
  @Transactional
  public ApiResponse<Void> delete(String id) {
    Issue issue = getEntityById(id);
    User curUser = userService.getCurrentUser();

    if (issue.getProject().getMembers().stream().anyMatch(member -> member.getId().equals(curUser.getId()))) {
      ChangeLogRequest changeLog = changeLogMapper.taskToDeleteLogRequest(issue, issueMongoService.getById(id));
      issueMongoService.delete(issue.getId());
      issueRelationRepository.deleteAll(issue.getAffectTo());
      issueRelationRepository.deleteAll(issue.getAffectBy());
      Sprint sprint = issue.getSprint();
      if (sprint != null) {
        Instant now = ClockSimulator.now();
        if (sprint.getDtEnd().isBefore(now)) {
          throw AppException.builder()
              .error(Error.INVALID_PARAMETER_REQUEST)
              .message("Sprint đã kết thúc bạn không thể thay đổi thông tin trong Sprint")
              .build();
        } else if (sprint.getDtStart().isBefore(now)) {
          ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
              .sprintId(sprint.getId())
              .projectId(issue.getProject().getId())
              .build());
          projectSprint.setRemovedIssue(projectSprint.getRemovedIssue() + 1);
          projectSprintService.save(projectSprint);
        }
        taskRepository.delete(issue);
      }
      return ApiResponse.<Void>builder()
          .code(HttpStatus.OK.value())
          .message("Xóa Issue thành công")
          .data(null)
          .logData(changeLog)
          .build();
    }
    throw AppException.builder()
        .error(Error.FORBIDDEN)
        .message("Chỉ có thành viên nhóm mới được xóa nhiệm vụ của nhóm")
        .build();
  }

  public ApiResponse<List<UserSuitableResponse>> getUserSuitable(String id) {
    Issue issue = getEntityById(id);
    var issueMongo = issueMongoService.getById(id);
    List<User> members = issue.getProject().getMembers();
    List<UserSuitableResponse> suitableResponses = new ArrayList<>();
    List<String> topics = issueMongo.getTopics().stream().map(Topic::getName).map(String::toLowerCase).toList();

    if (topics.isEmpty()) {
      return ApiResponse.<List<UserSuitableResponse>>builder()
          .code(HttpStatus.OK.value())
          .message("Nhiệm vụ hiện tại vẫn chưa có yêu cầu")
          .data(members.stream()
              .map(u -> UserSuitableResponse.builder().id(u.getUniId()).name(u.getName()).build())
              .toList())
          .build();
    }
    for (User member : members) {
      UserSuitableResponse.Builder builder = UserSuitableResponse.builder();
      builder.id(member.getUniId());
      builder.name(member.getName());
      List<PersonalSkill> skills = member.getSkills();
      skills = skills.stream().filter(p -> topics.contains(p.getSkill().getName().toLowerCase())).toList();
      builder.skills(skillMapper.toListPersonalSkillResponse(skills));
      suitableResponses.add(builder.build());
    }
    return ApiResponse.<List<UserSuitableResponse>>builder()
        .code(HttpStatus.OK.value())
        .message("Successfully retrieved")
        .data(suitableResponses)
        .build();
  }
}
