package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.aggregate.IssueModel;
import com.kltn.server.model.aggregate.IterationModel;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.service.entity.IssueService;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.entity.SprintService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DecisionService {
  @Value("${python.server}")
  private String pythonServer;
  private final ProjectService projectService;
  private final SprintService sprintService;
  private final IssueService issueService;

  public DecisionService(ProjectService projectService, SprintService sprintService, IssueService issueService) {
    this.projectService = projectService;
    this.sprintService = sprintService;
    this.issueService = issueService;
  }

  @Transactional
  public boolean makePredict(String projectId, String sprintId) {
    Project project = projectService.getProjectById(projectId);
    Sprint sprint = sprintService.getSprintById(sprintId);
    Instant start = sprint.getDtStart();
    Instant now = ClockSimulator.now();
    if (start.isAfter(now)) {
      throw AppException.builder().error(Error.SPRINT_CONFLICT_TIME).message("Sprint has not started yet").build();
    }
    IterationModel.IterationModelBuilder iterationModelBuilder = IterationModel.builder();
    iterationModelBuilder.sprint_id(sprintId);
    iterationModelBuilder.sprintDuration(calculateSprintDuration(sprint));
    iterationModelBuilder.numOfIssueAtStart(issueService.getNumberOfIssuesAtStart(project, sprint));
    iterationModelBuilder.numOfIssueAdded(issueService.getNumberOfIssuesAdded(project, sprint));
    iterationModelBuilder.numOfIssueRemoved(issueService.getNumberOfIssuesRemoved(project, sprint));
    iterationModelBuilder.numOfIssueTodo(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.TODO));
    iterationModelBuilder.numOfIssueInProgress(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.INPROCESS));
    iterationModelBuilder.numOfIssueDone(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.DONE));
    iterationModelBuilder.teamSize(issueService.getNumberOfMembersInSprint(project, sprint));
    iterationModelBuilder.issueModelList(getIssuesInSprint(project, sprint));
    IterationModel iterationModel = iterationModelBuilder.build();
    return sendToPython(iterationModel);
  }

  private List<IssueModel> getIssuesInSprint(Project project, Sprint sprint) {
    List<Issue> issues = issueService.getIssuesBySprintId(project.getId(), sprint.getId());
    if (issues == null || issues.isEmpty()) {
      throw AppException.builder().error(Error.NOT_FOUND).message("No issues found in the sprint").build();
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


  private boolean sendToPython(IterationModel data) {
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<IterationModel> request = new HttpEntity<>(data, headers);

    ResponseEntity<Integer[]> response = restTemplate.postForEntity(pythonServer, request, Integer[].class);
    System.out.println("Python Response: ");
    assert response.getBody() != null;
    int result = response.getBody()[0];
    return result == 0;
  }
}
