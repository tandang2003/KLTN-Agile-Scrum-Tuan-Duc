package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.base.AttachmentRequest;
import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.request.entity.issue.IssueOfSprintRequest;
import com.kltn.server.DTO.request.entity.issue.IssueUpdateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueDetailResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.base.AttachmentMapper;
import com.kltn.server.mapper.base.SubTaskMapper;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.collection.model.Attachment;
import com.kltn.server.model.entity.*;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.service.mongo.IssueMongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class IssueService {
    private final SprintService sprintService;
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

    @Autowired
    public IssueService(TopicMapper topicMapper, SubTaskMapper subTaskMapper, ProjectService projectService, ResourceService resourceService, ChangeLogMapper changeLogMapper, IssueMongoService issueMongoService, UserService userService, ProjectSprintService projectSprintService, IssueMapper taskMapper, IssueRepository taskRepository, SprintService sprintService) {
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
            task.setSprint(sprint);
        }
        if (issueCreateRequest.getAttachments() != null && !issueCreateRequest.getAttachments().isEmpty()) {
            List<Resource> resources = issueCreateRequest.getAttachments().stream().map(id -> resourceService.getById(id.getResourceId())).toList();
            task.setResources(resources);
        }
        task = taskRepository.save(task);
        if (task == null || task.getId() == null) {
            throw AppException.builder().error(Error.SERVER_ERROR).build();
        }
        var taskMongo = taskMapper.toCollection(task, issueCreateRequest);
        taskMongo = issueMongoService.save(taskMongo);
        var changeLog = changeLogMapper.taskToCreateLogRequest(task, taskMongo);

        return ApiResponse.<IssueResponse>builder().code(HttpStatus.CREATED.value()).message("Create task successfully").data(taskMapper.toIssueResponse(task, taskMongo)).logData(changeLog).build();
    }

    public Issue getEntityById(String id) {
        return taskRepository.findById(id).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
    }

    public Issue saveEntity(Issue issue) {
        try {
            issue = taskRepository.save(issue);
        } catch (RuntimeException e) {
            throw AppException.builder().error(Error.SERVER_ERROR).build();
        }
        return issue;

    }

    public ApiResponse<IssueDetailResponse> getIssueDetailById(String id) {
        var entity = getEntityById(id);
        var taskMongo = issueMongoService.getById(id);
        var taskResponse = taskMapper.toIssueDetailResponse(entity, taskMongo);
        return ApiResponse.<IssueDetailResponse>builder().code(HttpStatus.OK.value()).message("Get task detail successfully").data(taskResponse).build();

    }

    @SendKafkaEvent(topic = "task-log")
    @Transactional
    public ApiResponse<IssueResponse> updateTask(IssueUpdateRequest updateRequest) {
        String id = updateRequest.getId();
        String fliedChanged = updateRequest.getFieldChanging();
        var task = getEntityById(id);
        var taskMongo = issueMongoService.getById(id);
        ChangeLog changeLog;
        switch (fliedChanged) {
            case "name":
                task.setName(updateRequest.getName());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"name"}, task, taskMongo);
                break;
            case "description":
                task.setDescription(updateRequest.getDescription());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"description"}, task, taskMongo);
                break;
            case "priority":
                task.setPriority(updateRequest.getPriority());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"priority"}, task, taskMongo);
                break;
            case "status":
                task.setPriority(updateRequest.getPriority());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"status"}, task, taskMongo);
                break;
            case "tag":
                task.setTag(updateRequest.getTag());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"tag"}, task, taskMongo);
                break;
            case "position":
                task.setPosition(updateRequest.getPosition());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"position"}, task, taskMongo);
                break;
            case "topics":
                taskMongo.setTopics(topicMapper.toTopicList(updateRequest.getTopics()));
                taskMongo = issueMongoService.saveDocument(taskMongo);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"topics"}, task, taskMongo);
                break;
            case "subTasks":
                taskMongo.setSubTasks(subTaskMapper.toSubTaskList(updateRequest.getSubTasks()));
                taskMongo = issueMongoService.saveDocument(taskMongo);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"priority"}, task, taskMongo);
                break;
            case "attachments":
                List<Resource> resources = task.getResources();
                List<String> newResource = new ArrayList<>(updateRequest.getAttachments().stream().map(AttachmentRequest::getResourceId).toList());
                resources = resources.stream().filter(r -> !newResource.contains(r.getId())).toList();
                newResource.removeAll(resources.stream().map(BaseEntity::getId).toList());
                for (String resourceId : newResource) {
                    Resource resource = resourceService.getById(resourceId);
                    resources.add(resource);
                }
                task.setResources(resources);
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"attachments"}, task, taskMongo);
                break;
            case "assignee":
                User assignee = userService.getUserByUniId(updateRequest.getAssignee());
                task.setAssignee(assignee);
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"assignee"}, task, taskMongo);
                break;
            case "reviewer":
                User reviewer = userService.getUserByUniId(updateRequest.getReviewer());
                task.setReviewer(reviewer);
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"reviewer"}, task, taskMongo);
                break;
            case "start":
                task.setDtStart(updateRequest.getStart());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"start"}, task, taskMongo);
                break;
            case "end":
                task.setDtEnd(updateRequest.getEnd());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"end"}, task, taskMongo);
                break;
            case "planning":
                task.setDtPlanning(updateRequest.getPlanning());
                task = saveEntity(task);
                changeLog = changeLogMapper.TaskToUpdate(new String[]{"planning"}, task, taskMongo);
                break;
            default:
                throw AppException.builder().error(Error.INVALID_PARAMETER_REQUEST).build();
        }
        return ApiResponse.<IssueResponse>builder().code(HttpStatus.OK.value()).message("Update task successfully").data(taskMapper.toIssueResponse(task, taskMongo)).logData(changeLog).build();
    }

    @Transactional
    public ApiResponse<List<IssueResponse>> getIssuesBySprintId(IssueOfSprintRequest request) {
        List<Issue> issues;
        if (request.getSprintId() == null || request.getSprintId().isEmpty())
            issues = projectService.getProjectById(request.getProjectId()).getIssues();
        else
            issues = taskRepository.findAllByProjectIdAndSprintId(request.getProjectId(), request.getSprintId()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
        if (issues.isEmpty())
            return ApiResponse.<List<IssueResponse>>builder().code(HttpStatus.OK.value()).message("No task found").data(null).build();


        List<IssueResponse> issueResponses = new ArrayList<>();
        for (Issue issue : issues) {
            var issueMongo = issueMongoService.getById(issue.getId());
            var response = taskMapper.toIssueResponse(issue, issueMongo);
            issueResponses.add(response);
        }
        return ApiResponse.<List<IssueResponse>>builder().message("Get issues successfully").data(issueResponses).build();
//        return null;
    }


}
