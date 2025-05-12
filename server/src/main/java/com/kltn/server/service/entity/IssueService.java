package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.issue.IssueCreateRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.issue.IssueResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.mapper.document.ChangeLogMapper;
import com.kltn.server.mapper.entity.IssueMapper;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.service.mongo.IssueMongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class IssueService {
    private IssueMapper taskMapper;
    private ProjectSprintService projectSprintService;
    private IssueRepository taskRepository;
    private UserService userService;
    private IssueMongoService issueMongoService;
    private ChangeLogMapper changeLogMapper;

    @Autowired
    public IssueService(ChangeLogMapper changeLogMapper, IssueMongoService issueMongoService, UserService userService, ProjectSprintService projectSprintService, IssueMapper taskMapper, IssueRepository taskRepository) {
        this.taskMapper = taskMapper;
        this.taskRepository = taskRepository;
        this.projectSprintService = projectSprintService;
        this.userService = userService;
        this.issueMongoService = issueMongoService;
        this.changeLogMapper = changeLogMapper;
    }

    @SendKafkaEvent(topic = "task-create")
    public ApiResponse<IssueResponse> createTask(IssueCreateRequest issueCreateRequest) {
        ProjectSprintId projectSprintId = ProjectSprintId.builder()
                .projectId(issueCreateRequest.getProjectId())
                .sprintId(issueCreateRequest.getSprintId())
                .build();
        ProjectSprint projectSprint = projectSprintService.getProjectSprintById(projectSprintId);
        User assigner = userService.getUserByUniId(issueCreateRequest.getAssigneeId());
        User reviewer = userService.getUserByUniId(issueCreateRequest.getReviewerId());
        var task = taskMapper.toEntity(issueCreateRequest);
        task.setAssigner(assigner);
        task.setReviewer(reviewer);
        task.setProjectSprint(projectSprint);
        task = taskRepository.save(task);
        if (task == null || task.getId() == null) {
            throw AppException.builder().error(Error.SERVER_ERROR).build();
        }
        var taskMongo = taskMapper.toCollection(task, issueCreateRequest);
        taskMongo = issueMongoService.save(taskMongo);
        var changeLog = changeLogMapper.taskToCreateLogRequest(task, taskMongo);

        return ApiResponse.<IssueResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create task successfully")
                .data(taskMapper.toIssueResponse(task, taskMongo))
                .logData(changeLog).build();
    }
}
