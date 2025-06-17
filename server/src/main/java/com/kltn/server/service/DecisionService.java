package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class DecisionService {

  private final ProjectService projectService;
  private final SprintService sprintService;
  private final IssueService issueService;

  public DecisionService(ProjectService projectService, SprintService sprintService, IssueService issueService) {
    this.projectService = projectService;
    this.sprintService = sprintService;
    this.issueService = issueService;
  }

  @Transactional
  public ResponseEntity<ApiResponse<Void>> makePredict(String projectId, String sprintId) {
    Project project = projectService.getProjectById(projectId);
    Sprint sprint = sprintService.getSprintById(sprintId);
    Instant start = sprint.getDtStart();
    Instant now = Instant.now();
    if (start.isAfter(now)) {
      throw AppException.builder()
                        .error(Error.SPRINT_CONFLICT_TIME)
                        .message("Sprint has not started yet")
                        .build();
    }
    IterationModel.IterationModelBuilder iterationModelBuilder = IterationModel.builder();
    iterationModelBuilder.sprintDuration(calculateSprintDuration(sprint));
    iterationModelBuilder.numOfIssueAtStart(issueService.getNumberOfIssuesAtStart(project, sprint));
    iterationModelBuilder.numOfIssueAdded(issueService.getNumberOfIssuesAdded(project, sprint));
    iterationModelBuilder.numOfIssueRemoved(issueService.getNumberOfIssuesRemoved(project, sprint));
    iterationModelBuilder.numOfIssueTodo(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.TODO));
    iterationModelBuilder.numOfIssueInProgress(
      issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.INPROCESS));
    iterationModelBuilder.numOfIssueDone(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.DONE));
    iterationModelBuilder.teamSize(issueService.getNumberOfMembersInSprint(project, sprint));
    iterationModelBuilder.issueModelList(getIssuesInSprint(project, sprint));
    return null;
  }

  private List<IssueModel> getIssuesInSprint(Project project, Sprint sprint) {
    List<Issue> issues = issueService.getIssuesBySprintId(project.getId(), sprint.getId());
    if (issues == null || issues.isEmpty()) {
      throw AppException.builder()
                        .error(Error.NOT_FOUND)
                        .message("No issues found in the sprint")
                        .build();
    }
    List<IssueModel> issueModels = new ArrayList<>();
    for (Issue issue : issues) {
      IssueModel issueModel = IssueModel.builder()
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

  private int calculateSprintDuration(Sprint sprint) {
    if (sprint.getDtStart() == null || sprint.getDtEnd() == null) {
      return 0;
    }
    return (int) (sprint.getDtEnd()
                        .toEpochMilli() - sprint.getDtStart()
                                                .toEpochMilli()) / (1000 * 60 * 60 * 24);
  }

}
