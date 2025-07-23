package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.aggregate.IssueModel;
import com.kltn.server.model.aggregate.IterationModel;
import com.kltn.server.model.collection.ChangeLog;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.model.type.task.LogType;
import com.kltn.server.repository.document.ChangeLogRepository;
import com.kltn.server.service.entity.IssueService;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.entity.ProjectSprintService;
import com.kltn.server.service.entity.SprintService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.*;

@Service
public class DecisionService {
  private final ProjectSprintService projectSprintService;
  private final ChangeLogRepository changeLogRepository;
  @Value("${python.server}")
  private String pythonServer;
  private final ProjectService projectService;
  private final SprintService sprintService;
  private final IssueService issueService;

  public DecisionService(ProjectService projectService, SprintService sprintService, IssueService issueService,
      ProjectSprintService projectSprintService, ChangeLogRepository changeLogRepository) {
    this.projectService = projectService;
    this.sprintService = sprintService;
    this.issueService = issueService;
    this.projectSprintService = projectSprintService;
    this.changeLogRepository = changeLogRepository;
  }

  @Transactional
  public ApiResponse<Boolean> makePredict(String projectId, String sprintId) {
    Project project = projectService.getProjectById(projectId);
    Sprint sprint = sprintService.getSprintById(sprintId);
    var responsePrePredictChecking = checkPrePredict(project, sprint);
    if (responsePrePredictChecking != null)
      return responsePrePredictChecking;
    Instant start = sprint.getDtStart();
    Instant now = ClockSimulator.now();
    if (start.isAfter(now)) {
      throw AppException.builder().error(Error.SPRINT_CONFLICT_TIME).message("Sprint has not started yet").build();
    }
    IterationModel.IterationModelBuilder iterationModelBuilder = IterationModel.builder();
    iterationModelBuilder.sprint_id(sprintId);
    iterationModelBuilder.storyPoint(sprint.getStoryPoint());
    iterationModelBuilder.sprintDuration(calculateSprintDuration(sprint));
    iterationModelBuilder.numOfIssueAtStart(issueService.getNumberOfIssuesAtStart(project, sprint));
    iterationModelBuilder.numOfIssueAdded(issueService.getNumberOfIssuesAdded(project, sprint));
    iterationModelBuilder.numOfIssueRemoved(issueService.getNumberOfIssuesRemoved(project, sprint));
    iterationModelBuilder.numOfIssueTodo(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.TODO));
    iterationModelBuilder.numOfIssueInProgress(
        issueService.getNumberOfIssuesByStatuses(project, sprint, List.of(IssueStatus.INPROCESS, IssueStatus.REVIEW)));
    iterationModelBuilder.numOfIssueDone(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.DONE));
    iterationModelBuilder.teamSize(issueService.getNumberOfMembersInSprint(project, sprint));
    iterationModelBuilder.issueModelList(getIssuesInSprint(project, sprint));
    IterationModel iterationModel = iterationModelBuilder.build();
    int r = sendToPython(iterationModel);
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
        .sprintId(sprint.getId())
        .projectId(project.getId())
        .build());
    projectSprint.setPredictedResult(r);
    projectSprint.setDtLastPredicted(ClockSimulator.now());
    projectSprintService.save(projectSprint);
    return ApiResponse.<Boolean>builder().code(200).message("Decision retrieved successfully").data(r == 0).build();
  }

  private ApiResponse<Boolean> checkPrePredict(Project project, Sprint sprint) {
    List<Issue> issues = issueService.getIssuesBySprintId(project.getId(), sprint.getId());
    if (issues == null || issues.isEmpty()) {
      return ApiResponse.<Boolean>builder()
          .code(400)
          .message("Không thể tiến hành dự đoán vì không có vấn đề nào trong sprint")
          .data(false)
          .build();
    }
    if (sprint.getDtStart() == null || sprint.getDtEnd() == null) {
      return ApiResponse.<Boolean>builder()
          .code(400)
          .message("Không thể tiến hành dự đoán vì sprint chưa được thiết lập thời gian bắt đầu và kết thúc")
          .data(false)
          .build();
    }
    if (sprint.getDtStart().isAfter(ClockSimulator.now())) {
      return ApiResponse.<Boolean>builder()
          .code(400)
          .message("Không thể tiến hành dự đoán vì sprint chưa bắt đầu")
          .data(false)
          .build();
    }
    if (sprint.getDtEnd().isBefore(ClockSimulator.now())) {
      return ApiResponse.<Boolean>builder()
          .code(400)
          .message("Không thể tiến hành dự đoán vì sprint đã kết thúc")
          .data(false)
          .build();
    }
    int issueInaccept = 0;
    String[] propertiesTargets = new String[] {
        "status" };
    for (Issue issue : issues) {
      List<ChangeLog> issueLog = changeLogRepository.findByIdRefAndTypeAndPropertiesTargetsContains(issue.getId(),
          LogType.UPDATE, propertiesTargets);
      if (issueLog.isEmpty() || (issueLog.size() < 2 && issueLog.stream()
          .anyMatch(changeLog -> Objects.equals(changeLog.getChange()
              .getStatus(), IssueStatus.DONE.name())))) {
        issueInaccept++;
        continue;
      }
      // issueLog.sort(Comparator.comparing(ChangeLog::getCreatedBy));
    }
    if (issueInaccept > issues.size() / 2) {
      return ApiResponse.<Boolean>builder()
          .code(400)
          .message("Không thể tiến hành dự đoán vì có " + issueInaccept + " vấn đề không hợp lệ trong sprint")
          .data(false)
          .build();
    }
    return null;
  }

  private List<IssueModel> getIssuesInSprint(Project project, Sprint sprint) {
    List<Issue> issues = issueService.getIssuesBySprintId(project.getId(), sprint.getId());
    if (issues == null || issues.isEmpty()) {
      return new ArrayList<>();
      // throw AppException.builder().error(Error.NOT_FOUND).message("No issues found
      // in the sprint").build();
    }
    List<IssueModel> issueModels = new ArrayList<>();
    for (Issue issue : issues) {
      IssueModel issueModel = IssueModel.builder()
          .sprint_id(sprint.getId())
          .type(issue.getTag())
          .priority(issue.getPriority())
          .numOfAffectVersions(issueService.getNumberOfAffectVersions(issue.getId()))
          .numOfFixVersions(issueService.getNumberOfFixVersions(issue.getId()))
          .numOfLink(issueService.getNumberOfLink(issue.getId()))
          .numOfBlocked(issueService.getNumberOfBlocked(issue.getId()))
          .numOfBlock(issueService.getNumberOfBlock(issue.getId()))
          .numOfComment(issueService.getNumberOfComments(issue.getId()))
          .numOfChangeFixVersion(issueService.getNumChangeFixVersion(issue.getId()))
          .numOfChangeOfPriority(issue.getNumChangeOfPriority())
          .numOfChangeOfDescription(issue.getNumChangeOfDescription())
          .complexityOfDescription(issue.getComplexOfDescription())
          .complatibleOfAssignee(issueService.calculateCompatibleOfAssignee(issue))
          .build();
      issueModels.add(issueModel);
    }
    return issueModels;
  }

  public int calculateSprintDuration(Sprint sprint) {
    if (sprint.getDtStart() == null || sprint.getDtEnd() == null) {
      return 0;
    }
    return (int) (sprint.getDtEnd().toEpochMilli() - sprint.getDtStart().toEpochMilli()) / (1000 * 60 * 60 * 24);
  }

  private int sendToPython(IterationModel data) {
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<IterationModel> request = new HttpEntity<>(data, headers);

    ResponseEntity<Integer[]> response = restTemplate.postForEntity(pythonServer, request, Integer[].class);
    System.out.println("Python Response: ");
    assert response.getBody() != null;
    return response.getBody()[0];
  }
}
