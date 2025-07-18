package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.dashboard.DashboardResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.model.type.task.IssuePriority;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.repository.document.snapshot.SnapshotRepository;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.entity.IssueService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashBoardService {

  private final IssueRepository issueRepository;
  private final ProjectRepository projectRepository;
  private final ProjectSprintRepository projectSprintRepository;
  private final SprintRepository sprintRepository;
  private final SnapshotRepository snapshotRepository;
  private final RestClient.Builder builder;

  public DashBoardService(IssueService issueService, IssueRepository issueRepository, ProjectRepository projectRepository, ProjectSprintRepository projectSprintRepository, SprintRepository sprintRepository, SnapshotRepository snapshotRepository, RestClient.Builder builder) {
    this.issueRepository = issueRepository;
    this.projectRepository = projectRepository;
    this.projectSprintRepository = projectSprintRepository;
    this.sprintRepository = sprintRepository;
    this.snapshotRepository = snapshotRepository;
    this.builder = builder;
  }

  //  @Transactional
//  public ApiResponse<DashboardResponse> getForStudent(String projectId, String sprintId) {
//    DashboardResponse.DashboardResponseBuilder builder = DashboardResponse.builder();
//    if (sprintId != null) {
//      if (sprintRepository.existsByIdAndDtEndAfter(sprintId, ClockSimulator.now())) {
//        builder.issueCreated(issueRepository.countByProjectIdAndSprintId(projectId, sprintId));
//        builder.issueDone(issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.DONE));
//        builder.issueFailed(issueRepository.countByProjectIdAndSprintIdAndStatusNot(projectId, sprintId, IssueStatus.DONE));
//        Map<String, Integer> status = new LinkedHashMap<>();
//        status.put(IssueStatus.BACKLOG.toString(), issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.BACKLOG));
//        status.put(IssueStatus.TODO.toString(), issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.TODO));
//        status.put(IssueStatus.INPROCESS.toString(), issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.INPROCESS));
//        status.put(IssueStatus.REVIEW.toString(), issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.REVIEW));
//        status.put(IssueStatus.DONE.toString(), issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.DONE));
//        builder.status(status);
//        List<DashboardResponse.Workload> workloads = new ArrayList<>();
//        ProjectSprint projectSprint = projectSprintRepository.findById(ProjectSprintId.builder()
//          .projectId(projectId)
//          .sprintId(sprintId)
//          .build()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
//        var workspacesUsersProjects = projectSprint.getProject().getWorkspacesUserProjects();
//        for (WorkspacesUsersProjects workspacesUsersProject : workspacesUsersProjects) {
//          DashboardResponse.Workload.WorkloadBuilder workloadBuilder = DashboardResponse.Workload.builder();
//          var assigneeBuilder = DashboardResponse.Assignee.builder();
//          assigneeBuilder.name(workspacesUsersProject.getUser().getName());
//          assigneeBuilder.uniId(workspacesUsersProject.getUser().getUniId());
//          workloadBuilder.assignee(assigneeBuilder.build());
//          workloadBuilder.total(issueRepository.countByProjectIdAndSprintIdAndAssigneeId(projectId,
//            sprintId,
//            workspacesUsersProject.getUser()
//              .getId()));
//          workloadBuilder.done(issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatus(projectId,
//            sprintId,
//            workspacesUsersProject.getUser()
//              .getId(), IssueStatus.DONE));
//          workloadBuilder.failed(issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatusNot(projectId,
//            sprintId,
//            workspacesUsersProject.getUser()
//              .getId(), IssueStatus.DONE));
//
//          workloads.add(workloadBuilder.build());
//        }
//        builder.workload(workloads);
//        Map<String, Integer> priority = new LinkedHashMap<>();
//        priority.put(IssuePriority.CRITICAL.name(), issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, IssuePriority.CRITICAL));
//        priority.put(IssuePriority.MAJOR.name(), issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, IssuePriority.MAJOR));
//        priority.put(IssuePriority.MINOR.name(), issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, IssuePriority.MINOR));
//        priority.put(IssuePriority.TRIVIAL.name(), issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, IssuePriority.TRIVIAL));
//        priority.put(IssuePriority.BLOCKED.name(), issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, IssuePriority.BLOCKED));
//        builder.priority(priority);
//      } else {
//        ProjectSnapshot projectSnapshot = snapshotRepository.findByProjectIdAndSprintId(projectId, sprintId)
//          .orElseThrow(() -> AppException.builder().error(Error.DB_SERVER_MISSING_DATA).build());
//        List<IssueSnapshot> snapshots = projectSnapshot.getIssues();
//        builder.issueCreated(snapshots.size());
//        builder.issueDone((int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count());
//        builder.issueFailed((int) snapshots.stream().filter(s-> !s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count());
//        List<DashboardResponse.Workload> workloads = new ArrayList<>();
//        ProjectSprint projectSprint = projectSprintRepository.findById(ProjectSprintId.builder()
//          .projectId(projectId)
//          .sprintId(sprintId)
//          .build()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build());
//        var workspacesUsersProjects = projectSprint.getProject().getWorkspacesUserProjects();
//        for (WorkspacesUsersProjects workspacesUsersProject : workspacesUsersProjects) {
//          DashboardResponse.Workload.WorkloadBuilder workloadBuilder = DashboardResponse.Workload.builder();
//          var assigneeBuilder = DashboardResponse.Assignee.builder();
//          assigneeBuilder.name(workspacesUsersProject.getUser().getName());
//          assigneeBuilder.uniId(workspacesUsersProject.getUser().getUniId());
//          workloadBuilder.assignee(assigneeBuilder.build());
//          workloadBuilder.done((int) snapshots.stream().filter(s->s.getAssignee().equals(workspacesUsersProject.getUser().getId())&&s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count());
//          workloadBuilder.failed((int) snapshots.stream().filter(s->s.getAssignee().equals(workspacesUsersProject.getUser().getId())&&!s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count());
//          workloadBuilder.failed((int) snapshots.stream().filter(s->s.getAssignee().equals(workspacesUsersProject.getUser().getId())).count());
//          workloads.add(workloadBuilder.build());
//          builder.workload(workloads);
//        }
//        Map<String, Integer> status = new LinkedHashMap<>();
//        status.put(IssueStatus.BACKLOG.toString(), (int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.BACKLOG.name())).count());
//        status.put(IssueStatus.TODO.toString(), (int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.TODO.name())).count());
//        status.put(IssueStatus.INPROCESS.toString(),(int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.INPROCESS.name())).count());
//        status.put(IssueStatus.REVIEW.toString(), (int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.REVIEW.name())).count());
//        status.put(IssueStatus.DONE.toString(), (int) snapshots.stream().filter(s-> s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count());
//        builder.status(status);
//        Map<String, Integer> priority = new LinkedHashMap<>();
//        priority.put(IssuePriority.CRITICAL.name(),(int) snapshots.stream().filter(s-> s.getPriority().equalsIgnoreCase(IssuePriority.CRITICAL.name())).count());
//        priority.put(IssuePriority.MAJOR.name(), (int) snapshots.stream().filter(s-> s.getPriority().equalsIgnoreCase(IssuePriority.MAJOR.name())).count());
//        priority.put(IssuePriority.MINOR.name(), (int) snapshots.stream().filter(s-> s.getPriority().equalsIgnoreCase(IssuePriority.MINOR.name())).count());
//        priority.put(IssuePriority.TRIVIAL.name(), (int) snapshots.stream().filter(s-> s.getPriority().equalsIgnoreCase(IssuePriority.TRIVIAL.name())).count());
//        priority.put(IssuePriority.BLOCKED.name(), (int) snapshots.stream().filter(s-> s.getPriority().equalsIgnoreCase(IssuePriority.BLOCKED.name())).count());
//        builder.priority(priority);
//      }
//    }else{
//
//
//    }
//
//
//    return ApiResponse.<DashboardResponse>builder()
//      .code(200)
//      .data(builder.build())
//      .message("Đã truy xuất thành công số liệu thống kê bảng điều khiển.")
//      .build();
//  }
  @Transactional
  public ApiResponse<DashboardResponse> getForStudent(String projectId, String sprintId) {
    DashboardResponse.DashboardResponseBuilder builder = DashboardResponse.builder();

    int issueCreated = 0;
    int issueDone = 0;
    int issueFailed = 0;
    Map<String, Integer> statusMap = new LinkedHashMap<>();
    Map<String, Integer> priorityMap = new LinkedHashMap<>();
    List<DashboardResponse.Workload> totalWorkloads = new ArrayList<>();

    if (sprintId != null) {
      // same as before (just call one sprint logic)
      return getForSingleSprint(projectId, sprintId);
    }

    // ✅ No sprint specified: check all sprints
    List<Sprint> sprints = projectSprintRepository.findByProjectId(projectId)
      .stream()
      .map(ProjectSprint::getSprint)
      .toList()
      ;
    for (Sprint sprint : sprints) {
      boolean isActive = sprint.getDtEnd().isAfter(ClockSimulator.now());

      if (isActive) {
        // from MySQL
        issueCreated += issueRepository.countByProjectIdAndSprintId(projectId, sprint.getId());
        issueDone += issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprint.getId(), IssueStatus.DONE);
        issueFailed += issueRepository.countByProjectIdAndSprintIdAndStatusNot(projectId, sprint.getId(), IssueStatus.DONE);

        mergeStatusMap(statusMap, buildStatusMapFromMySQL(projectId, sprint.getId()));
        mergePriorityMap(priorityMap, buildPriorityMapFromMySQL(projectId, sprint.getId()));
        mergeWorkloads(totalWorkloads, buildWorkloadsFromMySQL(projectId, sprint.getId()));
      } else {
        // from snapshot
        Optional<ProjectSnapshot> snapshotOpt = snapshotRepository.findByProjectIdAndSprintId(projectId, sprint.getId());
        if (snapshotOpt.isEmpty()) continue;

        List<IssueSnapshot> issues = snapshotOpt.get().getIssues();

        issueCreated += issues.size();
        issueDone += issues.stream().filter(s -> s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count();
        issueFailed += issues.stream().filter(s -> !s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count();

        mergeStatusMap(statusMap, buildStatusMapFromSnapshot(issues));
        mergePriorityMap(priorityMap, buildPriorityMapFromSnapshot(issues));
        mergeWorkloads(totalWorkloads, buildWorkloadsFromSnapshot(projectId, sprint.getId(), issues));
      }
    }

    builder.issueCreated(issueCreated);
    builder.issueDone(issueDone);
    builder.issueFailed(issueFailed);
    builder.status(statusMap);
    builder.priority(priorityMap);
    builder.workload(totalWorkloads);

    return ApiResponse.<DashboardResponse>builder()
      .code(200)
      .data(builder.build())
      .message("Đã truy xuất thành công số liệu thống kê bảng điều khiển.")
      .build();
  }

  private void mergeStatusMap(Map<String, Integer> target, Map<String, Integer> source) {
    source.forEach((k, v) -> target.merge(k, v, Integer::sum));
  }

  private void mergePriorityMap(Map<String, Integer> target, Map<String, Integer> source) {
    source.forEach((k, v) -> target.merge(k, v, Integer::sum));
  }

  private void mergeWorkloads(List<DashboardResponse.Workload> target, List<DashboardResponse.Workload> source) {
    Map<String, DashboardResponse.Workload> map = target.stream()
      .collect(Collectors.toMap(
        w -> w.getAssignee().getUniId(),
        w -> w,
        (w1, w2) -> w1
      ));

    for (DashboardResponse.Workload w : source) {
      String uniId = w.getAssignee().getUniId();
      DashboardResponse.Workload existing = map.get(uniId);
      if (existing != null) {
        existing.setTotal(existing.getTotal() + w.getTotal());
        existing.setDone(existing.getDone() + w.getDone());
        existing.setFailed(existing.getFailed() + w.getFailed());
      } else {
        map.put(uniId, DashboardResponse.Workload.builder()
          .assignee(w.getAssignee())
          .total(w.getTotal())
          .done(w.getDone())
          .failed(w.getFailed())
          .build());
      }
    }

    target.clear();
    target.addAll(map.values());
  }

  private Map<String, Integer> buildStatusMapFromMySQL(String projectId, String sprintId) {
    Map<String, Integer> status = new LinkedHashMap<>();
    for (IssueStatus issueStatus : IssueStatus.values()) {
      int count = sprintId != null
        ? issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, issueStatus)
        : issueRepository.countByProjectIdAndStatus(projectId, issueStatus);
      status.put(issueStatus.name(), count);
    }
    return status;
  }

  private Map<String, Integer> buildPriorityMapFromMySQL(String projectId, String sprintId) {
    Map<String, Integer> priority = new LinkedHashMap<>();
    for (IssuePriority p : IssuePriority.values()) {
      int count = sprintId != null
        ? issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, p)
        : issueRepository.countByProjectIdAndPriority(projectId, p);
      priority.put(p.name(), count);
    }
    return priority;
  }

  private List<DashboardResponse.Workload> buildWorkloadsFromMySQL(String projectId, String sprintId) {
    List<DashboardResponse.Workload> workloads = new ArrayList<>();
    List<WorkspacesUsersProjects> userProjects = projectSprintRepository
      .findFirstByProjectId(projectId)
      .getProject().getWorkspacesUserProjects()
      ;

    for (WorkspacesUsersProjects userProject : userProjects) {
      String userId = userProject.getUser().getId();
      workloads.add(DashboardResponse.Workload.builder()
        .assignee(DashboardResponse.Assignee.builder()
          .name(userProject.getUser().getName())
          .uniId(userProject.getUser().getUniId())
          .build())
        .total(sprintId != null
          ? issueRepository.countByProjectIdAndSprintIdAndAssigneeId(projectId, sprintId, userId)
          : issueRepository.countByProjectIdAndAssigneeId(projectId, userId))
        .done(sprintId != null
          ? issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatus(projectId, sprintId, userId, IssueStatus.DONE)
          : issueRepository.countByProjectIdAndAssigneeIdAndStatus(projectId, userId, IssueStatus.DONE))
        .failed(sprintId != null
          ? issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatusNot(projectId, sprintId, userId, IssueStatus.DONE)
          : issueRepository.countByProjectIdAndAssigneeIdAndStatusNot(projectId, userId, IssueStatus.DONE))
        .build());
    }
    return workloads;
  }

  private Map<String, Integer> buildStatusMapFromSnapshot(List<IssueSnapshot> issues) {
    Map<String, Integer> status = new LinkedHashMap<>();
    for (IssueStatus issueStatus : IssueStatus.values()) {
      status.put(issueStatus.name(),
        (int) issues.stream().filter(s -> s.getStatus().equalsIgnoreCase(issueStatus.name())).count());
    }
    return status;
  }

  private Map<String, Integer> buildPriorityMapFromSnapshot(List<IssueSnapshot> issues) {
    Map<String, Integer> priority = new LinkedHashMap<>();
    for (IssuePriority p : IssuePriority.values()) {
      priority.put(p.name(),
        (int) issues.stream().filter(s -> s.getPriority().equalsIgnoreCase(p.name())).count());
    }
    return priority;
  }

  private List<DashboardResponse.Workload> buildWorkloadsFromSnapshot(String projectId, String sprintId, List<IssueSnapshot> issues) {
    List<DashboardResponse.Workload> workloads = new ArrayList<>();
    var userProjects = projectSprintRepository.findById(ProjectSprintId.builder()
        .projectId(projectId)
        .sprintId(sprintId)
        .build()).orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build())
      .getProject().getWorkspacesUserProjects()
      ;

    for (WorkspacesUsersProjects userProject : userProjects) {
      String assigneeId = String.valueOf(userProject.getUser().getId());
      workloads.add(DashboardResponse.Workload.builder()
        .assignee(DashboardResponse.Assignee.builder()
          .name(userProject.getUser().getName())
          .uniId(userProject.getUser().getUniId())
          .build())
        .total((int) issues.stream().filter(s -> s.getAssignee().equals(assigneeId)).count())
        .done((int) issues.stream()
          .filter(s -> s.getAssignee().equals(assigneeId) && s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name()))
          .count())
        .failed((int) issues.stream()
          .filter(s -> s.getAssignee().equals(assigneeId) && !s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name()))
          .count())
        .build());
    }
    return workloads;
  }

  private ApiResponse<DashboardResponse> getForSingleSprint(String projectId, String sprintId) {
    DashboardResponse.DashboardResponseBuilder builder = DashboardResponse.builder();

    Optional<Sprint> sprintOpt = sprintRepository.findById(sprintId);
    if (sprintOpt.isEmpty()) {
      return ApiResponse.<DashboardResponse>builder()
        .error(Error.DB_SERVER_MISSING_DATA)
        .message("Không tìm thấy sprint")
        .build();
    }

    Sprint sprint = sprintOpt.get();
    boolean isActive = sprint.getDtEnd().isAfter(ClockSimulator.now());

    int issueCreated;
    int issueDone;
    int issueFailed;
    Map<String, Integer> statusMap;
    Map<String, Integer> priorityMap;
    List<DashboardResponse.Workload> workloads;

    if (isActive) {
      // 🔵 From MySQL
      issueCreated = issueRepository.countByProjectIdAndSprintId(projectId, sprintId);
      issueDone = issueRepository.countByProjectIdAndSprintIdAndStatus(projectId, sprintId, IssueStatus.DONE);
      issueFailed = issueRepository.countByProjectIdAndSprintIdAndStatusNot(projectId, sprintId, IssueStatus.DONE);

      statusMap = buildStatusMapFromMySQL(projectId, sprintId);
      priorityMap = buildPriorityMapFromMySQL(projectId, sprintId);
      workloads = buildWorkloadsFromMySQL(projectId, sprintId);
    } else {
      // 🟠 From MongoDB snapshot
      Optional<ProjectSnapshot> snapshotOpt = snapshotRepository.findByProjectIdAndSprintId(projectId, sprintId);
      if (snapshotOpt.isEmpty()) {
        return ApiResponse.<DashboardResponse>builder()
          .error(Error.DB_SERVER_MISSING_DATA)
          .message("Không tìm thấy snapshot")
          .build();
      }

      List<IssueSnapshot> issues = snapshotOpt.get().getIssues();

      issueCreated = issues.size();
      issueDone = (int) issues.stream().filter(s -> s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count();
      issueFailed = (int) issues.stream().filter(s -> !s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name())).count();

      statusMap = buildStatusMapFromSnapshot(issues);
      priorityMap = buildPriorityMapFromSnapshot(issues);
      workloads = buildWorkloadsFromSnapshot(projectId, sprintId, issues);
    }

    builder.issueCreated(issueCreated);
    builder.issueDone(issueDone);
    builder.issueFailed(issueFailed);
    builder.status(statusMap);
    builder.priority(priorityMap);
    builder.workload(workloads);

    return ApiResponse.<DashboardResponse>builder()
      .code(200)
      .data(builder.build())
      .message("Đã truy xuất thành công số liệu thống kê bảng điều khiển.")
      .build();
  }

}
