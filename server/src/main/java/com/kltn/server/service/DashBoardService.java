package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiPaging;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.dashboard.*;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.snapshot.SnapshotMapper;
import com.kltn.server.model.collection.snapshot.IssueSnapshot;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
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
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.service.entity.IssueService;
import com.kltn.server.service.entity.WorkspaceService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
  private final WorkspaceService workspaceService;
  private final WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;

  public DashBoardService(IssueService issueService, IssueRepository issueRepository,
                          ProjectRepository projectRepository, ProjectSprintRepository projectSprintRepository,
                          SprintRepository sprintRepository, SnapshotRepository snapshotRepository, RestClient.Builder builder,
                          WorkspaceService workspaceService, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository) {
    this.issueRepository = issueRepository;
    this.projectRepository = projectRepository;
    this.projectSprintRepository = projectSprintRepository;
    this.sprintRepository = sprintRepository;
    this.snapshotRepository = snapshotRepository;
    this.builder = builder;
    this.workspaceService = workspaceService;
    this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
  }

  @Transactional
  public ApiResponse<DashboardProjectResponse> getForStudent(String projectId, String sprintId) {
    DashboardProjectResponse.DashboardResponseBuilder builder = DashboardProjectResponse.builder();

    int issueCreated = 0;
    int issueDone = 0;
    int issueFailed = 0;
    Map<String, Integer> statusMap = new LinkedHashMap<>();
    Map<String, Integer> priorityMap = new LinkedHashMap<>();
    List<Workload> totalWorkloads = new ArrayList<>();

    if (sprintId != null) {
      // same as before (just call one sprint logic)
      return getForSingleSprint(projectId, sprintId);
    }

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
        issueFailed += issueRepository.countByProjectIdAndSprintIdAndStatusNot(projectId, sprint.getId(),
          IssueStatus.DONE);

        mergeStatusMap(statusMap, buildStatusMapFromMySQL(projectId, sprint.getId()));
        mergePriorityMap(priorityMap, buildPriorityMapFromMySQL(projectId, sprint.getId()));
        mergeWorkloads(totalWorkloads, buildWorkloadsFromMySQL(projectId, sprint.getId()));
      } else {
        // from snapshot
        Optional<ProjectSnapshot> snapshotOpt = snapshotRepository.findByProjectIdAndSprintId(projectId,
          sprint.getId());
        if (snapshotOpt.isEmpty())
          continue;

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

    return ApiResponse.<DashboardProjectResponse>builder()
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

  private void mergeWorkloads(List<Workload> target, List<Workload> source) {
    Map<String, Workload> map = target.stream()
      .collect(Collectors.toMap(w -> w.getAssignee().getUniId(), w -> w, (w1, w2) -> w1));

    for (Workload w : source) {
      String uniId = w.getAssignee().getUniId();
      Workload existing = map.get(uniId);
      if (existing != null) {
        existing.setTotal(existing.getTotal() + w.getTotal());
        existing.setDone(existing.getDone() + w.getDone());
        existing.setNotComplete(existing.getNotComplete() + w.getNotComplete());
      } else {
        map.put(uniId, Workload.builder()
          .assignee(w.getAssignee())
          .total(w.getTotal())
          .done(w.getDone())
          .notComplete(w.getNotComplete())
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
      int count = sprintId != null ? issueRepository.countByProjectIdAndSprintIdAndPriority(projectId, sprintId, p)
        : issueRepository.countByProjectIdAndPriority(projectId, p);
      priority.put(p.name(), count);
    }
    return priority;
  }

  private List<Workload> buildWorkloadsFromMySQL(String projectId, String sprintId) {
    List<Workload> workloads = new ArrayList<>();
    List<WorkspacesUsersProjects> userProjects = projectSprintRepository.findFirstByProjectId(projectId)
      .getProject()
      .getWorkspacesUserProjects()
      ;

    for (WorkspacesUsersProjects userProject : userProjects) {
      String userId = userProject.getUser().getId();
      workloads.add(Workload.builder()
        .assignee(Assignee.builder()
          .name(userProject.getUser().getName())
          .uniId(userProject.getUser().getUniId())
          .build())
        .total(
          sprintId != null ? issueRepository.countByProjectIdAndSprintIdAndAssigneeId(projectId, sprintId, userId)
            : issueRepository.countByProjectIdAndAssigneeId(projectId, userId))
        .done(sprintId != null
          ? issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatus(projectId, sprintId, userId,
          IssueStatus.DONE)
          : issueRepository.countByProjectIdAndAssigneeIdAndStatus(projectId, userId, IssueStatus.DONE))
        .notComplete(sprintId != null
          ? issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatusNot(projectId, sprintId, userId,
          IssueStatus.DONE)
          : issueRepository.countByProjectIdAndAssigneeIdAndStatusNot(projectId, userId, IssueStatus.DONE))
        .build());
    }
    return workloads;
  }

  private Map<String, Integer> buildStatusMapFromSnapshot(List<IssueSnapshot> issues) {
    Map<String, Integer> status = new LinkedHashMap<>();
    for (IssueStatus issueStatus : IssueStatus.values()) {
      status.put(issueStatus.name(), (int) issues.stream()
        .filter(s -> s.getStatus().equalsIgnoreCase(issueStatus.name()))
        .count());
    }
    return status;
  }

  private Map<String, Integer> buildPriorityMapFromSnapshot(List<IssueSnapshot> issues) {
    Map<String, Integer> priority = new LinkedHashMap<>();
    for (IssuePriority p : IssuePriority.values()) {
      priority.put(p.name(), (int) issues.stream().filter(s -> s.getPriority().equalsIgnoreCase(p.name())).count());
    }
    return priority;
  }

  private List<Workload> buildWorkloadsFromSnapshot(String projectId, String sprintId, List<IssueSnapshot> issues) {
    List<Workload> workloads = new ArrayList<>();
    var userProjects = projectSprintRepository.findById(ProjectSprintId.builder()
        .projectId(projectId)
        .sprintId(sprintId)
        .build())
      .orElseThrow(() -> AppException.builder().error(Error.NOT_FOUND).build())
      .getProject()
      .getWorkspacesUserProjects()
      ;

    for (WorkspacesUsersProjects userProject : userProjects) {
      String assigneeId = String.valueOf(userProject.getUser().getId());
      workloads.add(Workload.builder()
        .assignee(Assignee.builder()
          .name(userProject.getUser().getName())
          .uniId(userProject.getUser().getUniId())
          .build())
        .total((int) issues.stream().filter(s -> s.getAssignee().equals(assigneeId)).count())
        .done((int) issues.stream()
          .filter(
            s -> s.getAssignee().equals(assigneeId) && s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name()))
          .count())
        .notComplete((int) issues.stream()
          .filter(
            s -> s.getAssignee().equals(assigneeId) && !s.getStatus().equalsIgnoreCase(IssueStatus.DONE.name()))
          .count())
        .build());
    }
    return workloads;
  }

  private ApiResponse<DashboardProjectResponse> getForSingleSprint(String projectId, String sprintId) {
    DashboardProjectResponse.DashboardResponseBuilder builder = DashboardProjectResponse.builder();

    Optional<Sprint> sprintOpt = sprintRepository.findById(sprintId);
    if (sprintOpt.isEmpty()) {
      return ApiResponse.<DashboardProjectResponse>builder()
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
    List<Workload> workloads;

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
        return ApiResponse.<DashboardProjectResponse>builder()
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

    return ApiResponse.<DashboardProjectResponse>builder()
      .code(200)
      .data(builder.build())
      .message("Đã truy xuất thành công số liệu thống kê bảng điều khiển.")
      .build();
  }

  public ApiResponse<DashboardWorkspaceResponse> getForTeacher(String workspaceId, String sprintId) {
    var builder = DashboardWorkspaceResponse.builder();
    List<Project> projects;
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);
    Sprint processingSprint;
    if (sprintId == null) {
      projects = workspace.getProjects().stream().toList();
      processingSprint = getCurrentSprint(workspace);
    } else {
      processingSprint = sprintRepository.findById(sprintId)
        .orElseThrow(() -> AppException.builder()
          .error(Error.DB_SERVER_MISSING_DATA)
          .message("Không tìm thấy sprint với ID: " + sprintId)
          .build());
      projects = processingSprint.getProjects();
    }

    builder.numOfProject(projects.size());
    final int[] maxNumOfMember = {0};
    final int[] minNumOfMember = {100};
    projects.forEach(project ->
      {
      int numOfMember = project.getMembers().size();
      if (numOfMember < minNumOfMember[0]) {
        minNumOfMember[0] = numOfMember;
      }
      if (numOfMember > maxNumOfMember[0]) {
        maxNumOfMember[0] = numOfMember;
      }
      });
    builder.maxNumMember(maxNumOfMember[0]);
    builder.minNumMember(minNumOfMember[0]);
    builder.assigneeRate(calculateAssigneeRate(workspace, processingSprint));
    builder.taskFinishRate(calculateTaskFinishRate(workspace, processingSprint));
    return ApiResponse.<DashboardWorkspaceResponse>builder()
      .code(200)
      .data(builder.build())
      .message("Đã truy xuất thành công số liệu thống kê bảng điều khiển.")
      .build();
  }

  private double calculateTaskFinishRate(Workspace workspace, Sprint processingSprint) {
    if (workspace.getWorkspacesUserProjects() == null || workspace.getWorkspacesUserProjects().isEmpty()) {
      return 0.0;
    }
    long totalMembers = workspace.getWorkspacesUserProjects().size();
    long finishedMembers = 0;
    boolean flag = processingSprint.getDtEnd().isBefore(ClockSimulator.now());

    for (WorkspacesUsersProjects wup : workspace.getWorkspacesUserProjects()) {
      if (wup.getProject() != null) {
        User u = wup.getUser();
        boolean issue;
        if (flag) {
          ProjectSnapshot snapshot = snapshotRepository.findByProjectIdAndSprintId(wup.getProject()
            .getId(), processingSprint.getId()).orElse(null);
          if (snapshot == null) {
            continue;
          }
          issue = snapshot.getIssues()
            .stream()
            .filter(s -> s != null && s.getAssignee() != null)
            .anyMatch(issueSnapshot -> issueSnapshot.getAssignee().equals(u.getId()) && !issueSnapshot.getStatus()
              .equalsIgnoreCase(IssueStatus.DONE.name()));
        } else {
          issue = issueRepository.existsIssueByAssignee_IdAndSprint_IdAndStatusNot(u.getId(), processingSprint.getId(),
            IssueStatus.DONE);
        }
        if (issue) {
          finishedMembers++;
        }
      }
    }
    return 100 - (double) finishedMembers / totalMembers * 100;
  }

  private double calculateAssigneeRate(Workspace workspace, Sprint processingSprint) {
    if (workspace.getWorkspacesUserProjects() == null || workspace.getWorkspacesUserProjects().isEmpty()) {
      return 0.0;
    }
    long totalMembers = workspace.getWorkspacesUserProjects().size();
    long assignedMembers = 0;
    boolean flag = processingSprint.getDtEnd().isBefore(ClockSimulator.now());
    for (WorkspacesUsersProjects wup : workspace.getWorkspacesUserProjects()) {
      if (wup.getProject() != null) {
        boolean issue = flag ? snapshotRepository.existsByProjectIdAndSprintIdAndIssues_Id(wup.getProject()
            .getId(), processingSprint.getId(),
          wup.getUser()
            .getId())
          : issueRepository.existsIssueByAssignee_IdAndSprint_Id(wup.getUser()
          .getId(), processingSprint.getId());
        if (issue) {
          assignedMembers++;
        }
      }
    }
    return (double) assignedMembers / totalMembers * 100;
  }

  private Sprint getCurrentSprint(Workspace workspace) {
    List<Sprint> sprints = workspace.getSprints();
    Instant now = ClockSimulator.now().truncatedTo(ChronoUnit.DAYS);
    if (sprints != null && !sprints.isEmpty()) {
      for (Sprint sprint : sprints) {
        Instant start = sprint.getDtStart().truncatedTo(ChronoUnit.DAYS);
        Instant end = sprint.getDtEnd().truncatedTo(ChronoUnit.DAYS);
        // current sprint section
        if ((start.isBefore(now) || start.equals(now)) && (end.isAfter(now) || end.equals(now))) {
          return sprint;
        }
      }
    }
    return null;
  }

  public ApiResponse<ApiPaging<Workload>> getWorkloadForTeacher(String workspaceId, String sprintId, int page,
                                                                int size) {
    Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "user.name"));
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);
    Sprint processingSprint = sprintId != null ? sprintRepository.findById(sprintId).orElse(null) : null;
    Page<WorkspacesUsersProjects> wups = workspacesUsersProjectsRepository.findByWorkspace(workspace, pageRequest);
    List<Workload> workloads = new ArrayList<>();
    for (WorkspacesUsersProjects wup : wups.getContent()) {
      User user = wup.getUser();
      int total = 0, done = 0;
      if (wup.getProject() != null) {
        if (processingSprint == null) {
          Sprint currentSprint = getCurrentSprint(workspace);
          if (currentSprint != null) {
            total = issueRepository.countByProjectIdAndAssigneeIdAndSprintId(wup.getProject().getId(), user.getId(),
              currentSprint.getId());
            done = issueRepository.countByProjectIdAndAssigneeIdAndStatusAndSprintId(wup.getProject()
                .getId(), user.getId(),
              IssueStatus.DONE, currentSprint.getId());
          }
          List<ProjectSnapshot> snapshot = snapshotRepository.findByProjectId(wup.getProject().getId());
          List<IssueSnapshot> issues = snapshot.stream()
            .filter(p -> p.getIssues() != null && !p.getIssues().isEmpty())
            .flatMap(s -> s.getIssues().stream())
            .filter(i -> i.getAssignee() != null && i.getAssignee().equals(user.getId()))
            .toList()
            ;
          total += issues.size();
          done += (int) issues.stream().filter(i -> i.getStatus().equals(IssueStatus.DONE.name())).count();
        } else {
          boolean flag = processingSprint.getDtEnd().isBefore(ClockSimulator.now());
          if (flag) {
            ProjectSnapshot snapshot = snapshotRepository.findByProjectIdAndSprintId(wup.getProject()
              .getId(), processingSprint.getId()).orElse(null);
            if (snapshot == null) {
              total = 0;
              done = 0;
            } else {
              total = snapshot.getIssues().size();
              done = Math.toIntExact(snapshot.getIssues()
                .stream()
                .filter(i -> i != null && i.getAssignee() != null && i.getAssignee().equals(user.getId())
                  && i.getStatus()
                  .equals(IssueStatus.DONE.name()))
                .count());
              // snapshotRepository.countByProjectIdAndSPrintIdAndIssues_AssigneeIdAndStatus(wup.getProject()
              // .getId(), processingSprint.getId(), user.getId(), IssueStatus.DONE.name());
            }
          } else {
            total = issueRepository.countByProjectIdAndSprintIdAndAssigneeId(workspace.getId(), processingSprint.getId(),
              user.getId());
            done = issueRepository.countByProjectIdAndSprintIdAndAssigneeIdAndStatus(workspace.getId(),
              processingSprint.getId(), user.getId(), IssueStatus.DONE);
          }
        }
      }

      int notComplete = total - done;

      workloads.add(Workload.builder()
        .assignee(Assignee.builder().name(user.getName()).uniId(user.getId()).build())
        .total(total)
        .done(done)
        .notComplete(notComplete)
        .build());
    }
    ApiPaging<Workload> paging = ApiPaging.<Workload>builder()
      .currentPage(page)
      .items(workloads)
      .totalItems(wups.getTotalElements())
      .totalPages(wups.getTotalPages())
      .build()
      ;

    return ApiResponse.<ApiPaging<Workload>>builder()
      .code(200)
      .data(paging)
      .message("Đã truy xuất thành công số liệu thống kê khối lượng công việc.")
      .build();
  }

  public ApiResponse<ApiPaging<ProjectLoad>> getProjectLoadForTeacher(String workspaceId, String sprintId, int page,
                                                                      int size) {
    Pageable pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "project.name"));
    // Workspace workspace = workspaceService.getWorkspaceById(workspaceId);
    Sprint processingSprint = sprintId != null ? sprintRepository.findById(sprintId).orElse(null) : null;
    Page<Project> projects = workspacesUsersProjectsRepository.getProjecByWorkspaceId(workspaceId, pageRequest);
    List<ProjectLoad> projectLoads = new ArrayList<>();
    for (Project project : projects.getContent()) {
      int total = 0, done = 0;
      Map<String, Integer> status = new LinkedHashMap<>();
      if (processingSprint == null) {
        Sprint currentSprint = getCurrentSprint(project.getWorkspace());
        if (currentSprint != null) {
          total = issueRepository.countByProjectIdAndSprintId(project.getId(), currentSprint.getId());
          done = issueRepository.countByProjectIdAndStatusAndSprintId(project.getId(), IssueStatus.DONE,
            currentSprint.getId());
          status.merge(IssueStatus.TODO.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            currentSprint.getId(), IssueStatus.TODO), Integer::sum);
          status.merge(IssueStatus.INPROCESS.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            currentSprint.getId(), IssueStatus.INPROCESS), Integer::sum);
          status.merge(IssueStatus.REVIEW.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            currentSprint.getId(), IssueStatus.REVIEW), Integer::sum);
          status.merge(IssueStatus.DONE.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            currentSprint.getId(), IssueStatus.DONE), Integer::sum);
        }
        List<ProjectSnapshot> snapshot = snapshotRepository.findByProjectId(project.getId());
        List<IssueSnapshot> issues = snapshot.stream()
          .filter(p -> p.getIssues() != null && !p.getIssues().isEmpty())
          .flatMap(s -> s.getIssues().stream())
          .toList()
          ;
        total += issues.size();
        done += (int) issues.stream().filter(i -> i.getStatus().equals(IssueStatus.DONE.name())).count();
        status.merge(IssueStatus.TODO.name(), (int) issues.stream()
          .filter(i -> i.getStatus().equals(IssueStatus.TODO.name()))
          .count(), Integer::sum);
        status.merge(IssueStatus.INPROCESS.name(), (int) issues.stream()
          .filter(i -> i.getStatus().equals(IssueStatus.INPROCESS.name()))
          .count(), Integer::sum);
        status.merge(IssueStatus.REVIEW.name(), (int) issues.stream()
          .filter(i -> i.getStatus().equals(IssueStatus.REVIEW.name()))
          .count(), Integer::sum);
        status.merge(IssueStatus.DONE.name(), (int) issues.stream()
          .filter(i -> i.getStatus().equals(IssueStatus.DONE.name()))
          .count(), Integer::sum);
      } else {
        boolean flag = processingSprint.getDtEnd().isBefore(ClockSimulator.now());
        if (flag) {
          ProjectSnapshot snapshot = snapshotRepository
            .findByProjectIdAndSprintId(project.getId(), processingSprint.getId())
            .orElse(null);
          if (snapshot == null) {
            total = 0;
            done = 0;
            status.merge(IssueStatus.TODO.name(), 0, Integer::sum);
            status.merge(IssueStatus.INPROCESS.name(), 0, Integer::sum);
            status.merge(IssueStatus.REVIEW.name(), 0, Integer::sum);
            status.merge(IssueStatus.DONE.name(), 0, Integer::sum);
          } else {
            List<IssueSnapshot> issues = snapshot.getIssues();
            total = issues.size();
            done = (int) issues.stream()
              .filter(i -> i != null && i.getStatus() != null && i.getStatus().equals(IssueStatus.DONE.name()))
              .count();
            status.merge(IssueStatus.TODO.name(), (int) issues.stream()
              .filter(i -> i.getStatus().equals(IssueStatus.TODO.name()))
              .count(), Integer::sum);
            status.merge(IssueStatus.INPROCESS.name(), (int) issues.stream()
              .filter(i -> i.getStatus().equals(IssueStatus.INPROCESS.name()))
              .count(), Integer::sum);
            status.merge(IssueStatus.REVIEW.name(), (int) issues.stream()
              .filter(i -> i.getStatus().equals(IssueStatus.REVIEW.name()))
              .count(), Integer::sum);
            status.merge(IssueStatus.DONE.name(), (int) issues.stream()
              .filter(i -> i.getStatus().equals(IssueStatus.DONE.name()))
              .count(), Integer::sum);
          }
        } else {
          total = issueRepository.countByProjectIdAndSprintId(project.getId(), processingSprint.getId());
          done = issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(), processingSprint.getId(),
            IssueStatus.DONE);
          status.merge(IssueStatus.TODO.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            processingSprint.getId(), IssueStatus.TODO), Integer::sum);
          status.merge(IssueStatus.INPROCESS.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            processingSprint.getId(), IssueStatus.INPROCESS), Integer::sum);
          status.merge(IssueStatus.REVIEW.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            processingSprint.getId(), IssueStatus.REVIEW), Integer::sum);
          status.merge(IssueStatus.DONE.name(), issueRepository.countByProjectIdAndSprintIdAndStatus(project.getId(),
            processingSprint.getId(), IssueStatus.DONE), Integer::sum);
        }
      }
      int notComplete = total - done;

      projectLoads.add(ProjectLoad.builder()
        .id(project.getId())
        .name(project.getName())
        .total(total)
        .done(done)
        .notComplete(notComplete)
        .status(status)
        .build());
    }
    ApiPaging<ProjectLoad> paging = ApiPaging.<ProjectLoad>builder()
      .currentPage(page)
      .items(projectLoads)
      .totalItems(projects.getTotalElements())
      .totalPages(projects.getTotalPages())
      .build()
      ;

    return ApiResponse.<ApiPaging<ProjectLoad>>builder()
      .code(200)
      .data(paging)
      .message("Đã truy xuất thành công số liệu thống kê khối lượng công việc của dự án.")
      .build();
  }
//  private void addToMap(Map<String, Integer> map, String key, int value) {
//    map.merge(key, value, Integer::sum);
//  }
}
