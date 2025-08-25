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
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
  public ApiResponse<Boolean> makePredict(String projectId, String sprintId, boolean isPredict, boolean checkPrePredict) {
    Project project = projectService.getProjectById(projectId);
    Sprint sprint = sprintService.getSprintById(sprintId);

    int duration = Math.toIntExact(ChronoUnit.DAYS.between(sprint.getDtStart(), sprint.getDtEnd()));
    int durationSpend = Math.toIntExact(ChronoUnit.DAYS.between(sprint.getDtStart(), ClockSimulator.now()));
    boolean timeMade = duration * 0.3 < durationSpend;
    // Kiểm tra các issue có thỏa mãn để đưa vào mô hình
    if (checkPrePredict) {
      var responsePrePredictChecking = checkPrePredict(project, sprint);
      if (responsePrePredictChecking != null) {
        ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
          .sprintId(sprint.getId())
          .projectId(project.getId())
          .build());
        // Lưu kết quả đa dự đoán vào database
        if (!isPredict) {
          projectSprint.setPredictedResult(-1);
          // Lưu thời gian dự đoán
          projectSprint.setDtLastPredicted(ClockSimulator.now());
        } else {
          projectSprint.setPredictedResultSecond(-1);
          // Lưu thời gian dự đoán
          projectSprint.setDtLastPredictedSecond(ClockSimulator.now());
        }
        projectSprintService.save(projectSprint);
        return responsePrePredictChecking;
      }
    }
    // Xử lý trường hợp project thuộc môn học chưa có mô hình
    if (!project.getWorkspace().getCourse().isHaveModel()) {
      double committedPhase = Math.round(durationSpend / duration * 10) / 10;
      List<Issue> issues = issueService.getIssuesBySprintId(projectId, sprintId);
      int total = issues.size();
      int done = Math.toIntExact(issues.stream().filter(s -> s.getStatus().equals(IssueStatus.DONE)).count());

      ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
        .sprintId(sprint.getId())
        .projectId(project.getId())
        .build());
      int result = done >= Math.round(total * committedPhase) ? 0 : -1;
      // Lưu kết quả đa dự đoán vào database
      if (!isPredict) {
        projectSprint.setPredictedResult(-1);
        // Lưu thời gian dự đoán
        projectSprint.setDtLastPredicted(ClockSimulator.now());
      } else {
        projectSprint.setPredictedResultSecond(-1);
        // Lưu thời gian dự đoán
        projectSprint.setDtLastPredictedSecond(ClockSimulator.now());
      }
      projectSprintService.save(projectSprint);
      return ApiResponse.<Boolean>builder()
        .code(200)
        .message("Decision retrieved successfully")
        .data(done >= Math.round(total * committedPhase))
        .build();
    }
    // Kiếm tra sprint thực hiện dự đoán hiện tại đang hoạt động
    Instant start = sprint.getDtStart();
    Instant now = ClockSimulator.now();
    if (start.isAfter(now)) {
      throw AppException.builder().error(Error.SPRINT_CONFLICT_TIME).message("Sprint has not started yet").build();
    }

    // Thực hiện lấy dữ liệu sprint để đưa vào mô hình
    IterationModel.IterationModelBuilder iterationModelBuilder = IterationModel.builder();
    iterationModelBuilder.sprint_id(sprintId);
    iterationModelBuilder.course_name(project.getWorkspace().getCourse().getName());
    iterationModelBuilder.timeMade(timeMade);
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

    // Thực hiện lấy dữ liệu issue của sprint để đưa vào mô hình dự đoán
    List<IssueModel> issueModels = getIssuesInSprint(project, sprint);
    iterationModelBuilder.issueModelList(issueModels);
    IterationModel iterationModel = iterationModelBuilder.build();

    // Gọi api qua python server để yêu cầu chạy mô hình
    int r = sendToPython(iterationModel);
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
      .sprintId(sprint.getId())
      .projectId(project.getId())
      .build());

    if (!isPredict) {
      projectSprint.setPredictedResult(r);
      // Lưu thời gian dự đoán
      projectSprint.setDtLastPredicted(ClockSimulator.now());
    } else {
      projectSprint.setPredictedResultSecond(r);
      // Lưu thời gian dự đoán
      projectSprint.setDtLastPredictedSecond(ClockSimulator.now());
    }
    projectSprintService.save(projectSprint);
    return ApiResponse.<Boolean>builder().code(200).message("Decision retrieved successfully").data(r == 0).build();
  }

  private ApiResponse<Boolean> checkPrePredict(Project project, Sprint sprint) {
    List<Issue> issues = issueService.getIssuesBySprintId(project.getId(), sprint.getId());

    // Kiểm tra issue rỗng trong sprint
    if (issues == null || issues.isEmpty()) {
      return ApiResponse.<Boolean>builder()
        .code(400)
        .message("Không thể tiến hành dự đoán vì không có issue nào trong sprint")
        .data(false)
        .build();
    }

    // Kiểm tra sprint chưa thiết lập thời gian
    if (sprint.getDtStart() == null || sprint.getDtEnd() == null) {
      return ApiResponse.<Boolean>builder()
        .code(400)
        .message("Không thể tiến hành dự đoán vì sprint chưa được thiết lập thời gian bắt đầu và kết thúc")
        .data(false)
        .build();
    }

    // Kiểm tra sprint đã bắt đầu chưa?
    if (sprint.getDtStart().isAfter(ClockSimulator.now())) {
      return ApiResponse.<Boolean>builder()
        .code(400)
        .message("Không thể tiến hành dự đoán vì sprint chưa bắt đầu")
        .data(false)
        .build();
    }

    // Kiểm tra sprint đã kết thúc chưa?
    if (sprint.getDtEnd().isBefore(ClockSimulator.now())) {
      return ApiResponse.<Boolean>builder()
        .code(400)
        .message("Không thể tiến hành dự đoán vì sprint đã kết thúc")
        .data(false)
        .build();
    }

    // Kiểm tra số lượng các issue được cập nhập không thỏa điều kiện
    int issueInaccept = 0;
    String[] propertiesTargets = new String[]{
      "status"};
    for (Issue issue : issues) {

      // Lấy ra danh sách các thay đổi trạng thái của issue
      List<ChangeLog> issueLog = changeLogRepository.findByIdRefAndTypeAndPropertiesTargetsContains(issue.getId(),
        LogType.UPDATE, propertiesTargets);

      issueLog = issueLog.stream().filter(i -> i.getChange().getSprintId().equals(sprint.getId())).toList();
      // Kiểm tra số lượng thay đổi trạng thái thỏa mãn
      if (issueLog.isEmpty() || (issueLog.size() < 3 && issueLog.stream()
        .anyMatch(changeLog -> Objects.equals(changeLog.getChange()
          .getStatus(), IssueStatus.DONE.name())))) {
        issueInaccept++;
        continue;
      }
    }

    // Số lượng issue thỏa mãn phải lớn hơn 50% tổng số issue được tạo trong sprint
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
        .build()
        ;
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

  public ApiResponse<Boolean> makePredict(String projectId) {
    List<IterationModel> iterations = new ArrayList<>();
    Instant now = ClockSimulator.now();
    List<ProjectSprint> projectSprints = projectSprintService.getProjectSprintByProjectId(projectId);
    for (ProjectSprint projectSprint : projectSprints) {
      Sprint sprint = projectSprint.getSprint();
      if (!now.isAfter(sprint.getDtEnd())) continue;
      Project project = projectSprint.getProject();

      String sprintId = sprint.getId();
      IterationModel.IterationModelBuilder iterationModelBuilder = IterationModel.builder();
      iterationModelBuilder.sprint_id(sprintId);
      iterationModelBuilder.course_name(project.getWorkspace().getCourse().getName());
      iterationModelBuilder.timeMade(true);
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
      // Thực hiện lấy dữ liệu issue của sprint để đưa vào mô hình dự đoán
      List<IssueModel> issueModels = getIssuesInSprint(project, sprint);
      iterationModelBuilder.issueModelList(issueModels);
      IterationModel iterationModel = iterationModelBuilder.build();
      iterations.add(iterationModel);
    }

    if (iterations.size() < projectSprints.size() * 0.3) {
//      return ApiResponse.<Boolean>builder().data().build();
      return ApiResponse.<Boolean>builder()
        .code(400)
        .message("Chưa đủ thông tin để thực hiện dự đoán ")
        .data(false)
        .build();
    }
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<List<IterationModel>> request = new HttpEntity<>(iterations, headers);

    ResponseEntity<Integer[]> response = restTemplate.postForEntity(pythonServer+"/project", request, Integer[].class);
    System.out.println("Python Response: ");
    assert response.getBody() != null;
//    return response.getBody()[0];
    return ApiResponse.<Boolean>builder().data(response.getBody()[0] == 1).build();


  }
}
