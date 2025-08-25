package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.entity.sprint.SprintCreationRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintStudentUpdateTimeRequest;
import com.kltn.server.DTO.request.entity.sprint.SprintTeacherUpdateTimeRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.sprint.SprintResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.SprintMapper;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.document.ChangeLogRepository;
import com.kltn.server.repository.document.snapshot.SnapshotRepository;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.schedular.PredictScheduler;
import com.kltn.server.schedular.PredictSecondScheduler;
import com.kltn.server.schedular.SprintScheduler;
import com.kltn.server.service.mongo.SprintBoardMongoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;

@Service
public class SprintService {
  private final PredictScheduler predictScheduler1;
  private final SnapshotRepository snapshotRepository;
  private SprintMapper sprintMapper;
  private SprintRepository sprintRepository;
  @Lazy
  @Autowired
  private WorkspaceService workspaceService;
  private ProjectSprintService projectSprintService;
  private SprintScheduler sprintScheduler;
  private SprintBoardMongoService sprintBoardMongoService;

  @Autowired
  public SprintService(SprintScheduler sprintScheduler,
                       ProjectSprintService projectSprintService, SprintMapper sprintMapper,
                       SprintRepository sprintRepository,@Lazy PredictScheduler predictScheduler1,
                       SprintBoardMongoService sprintBoardMongoService, SnapshotRepository snapshotRepository) {
    this.sprintMapper = sprintMapper;
    this.sprintRepository = sprintRepository;
    this.projectSprintService = projectSprintService;

    this.sprintScheduler = sprintScheduler;
    this.predictScheduler1 = predictScheduler1;
    this.sprintBoardMongoService = sprintBoardMongoService;
    this.snapshotRepository = snapshotRepository;
  }

  @Transactional
  public ApiResponse<SprintResponse> createSprint(SprintCreationRequest sprintCreationRequest) {
    var sprint = sprintMapper.toSprint(sprintCreationRequest);
    var workspace = workspaceService.getWorkspaceById(sprintCreationRequest.workspaceId());
    // sprint.setProject(project);
    sprint.setWorkspace(workspace);
    if (isConflictTime(sprint, workspace.getSprints())) {
      throw AppException.builder()
        .error(Error.SPRINT_CONFLICT_TIME)
        .build();
    }
    sprint = sprintRepository.save(sprint);
    Set<Project> projects = workspace.getProjects();
    if (projects != null && !projects.isEmpty()) {
      // FIX: POSITION
      sprintBoardMongoService.addPositionToSprint(sprint.getId(), projects.stream()
        .map(Project::getId)
        .toArray(String[]::new));

      projectSprintService.save(projects.stream()
        .map(Project::getId)
        .toList(), sprint.getId());
    }
    if (sprint.getDtEnd() != null) {
      sprintScheduler.scheduleSprintEnd(sprint.getId(), LocalDateTime.ofInstant(sprint.getDtEnd(),
        ZoneId.of("Asia/Ho_Chi_Minh")));
    }

    return ApiResponse.<SprintResponse>builder()
      .code(HttpStatus.CREATED.value())
      .data(sprintMapper.toSprintCreateResponse(sprint))
      .message("Create sprint successfully")
      .build();

  }

  //TODO: FIX
  public ApiResponse<SprintResponse> studentUpdateSprint(
    SprintStudentUpdateTimeRequest sprintStudentUpdateTimeRequest) {
    ProjectSprint projectSprint = projectSprintService.getProjectSprintById(ProjectSprintId.builder()
      .projectId(
        sprintStudentUpdateTimeRequest.projectId())
      .sprintId(
        sprintStudentUpdateTimeRequest.sprintId())
      .build());
//        projectSprint.setDtPlanning(sprintStudentUpdateTimeRequest.dtPlanning());
//        projectSprint.setDtPreview(sprintStudentUpdateTimeRequest.dtPreview());

    projectSprint = projectSprintService.save(projectSprint);
    SprintResponse sprintResponse = sprintMapper.toSprintStudentUpdateResponse(projectSprint);
    return ApiResponse.<SprintResponse>builder()
      .data(sprintResponse)
      .message("Update sprint successfully")
      .build();
  }

  public ApiResponse<SprintResponse> teacherUpdateSprint(SprintTeacherUpdateTimeRequest updateRequest) {
    Sprint sprint = getSprintById(updateRequest.id());
    Instant now = ClockSimulator.now()
      .truncatedTo(ChronoUnit.MINUTES);
    Instant start = sprint.getDtStart()
      .truncatedTo(ChronoUnit.MINUTES);
    Instant end = sprint.getDtEnd()
      .truncatedTo(ChronoUnit.MINUTES);

    boolean isOngoing = (now.equals(start) || now.equals(end) || (now.isAfter(start) && now.isBefore(end)));
// TODO: remmember uncomment
//        if (isOngoing)
//            throw AppException.builder()
//                              .error(Error.SPRINT_ALREADY_START)
//                              .build();
//
//        if (end.isBefore(now))
//            throw AppException.builder()
//                              .error(Error.SPRINT_ALREADY_END)
//                              .build();
    if (!sprint.getDtPredict()
      .truncatedTo(ChronoUnit.DAYS)
      .equals(updateRequest.predict().truncatedTo(ChronoUnit.DAYS))) {
      predictScheduler1.scheduleSprint(sprint.getId(),updateRequest.predict());
    }
    if (!sprint.getDtPredictSecond()
      .truncatedTo(ChronoUnit.DAYS)
      .equals(updateRequest.predictSecond().truncatedTo(ChronoUnit.DAYS))) {
      predictScheduler1.scheduleSprint(sprint.getId(), updateRequest.predictSecond());

//      predictSecondScheduler.scheduleSprint(sprint.getId(), LocalDateTime.ofInstant(updateRequest.predictSecond(), ZoneId.of("Asia/Ho_Chi_Minh")));
    }
    sprint = sprintMapper.updateTeacherSprint(sprint, updateRequest);
    List<Sprint> sprintList = sprintRepository.findAllByWorkspaceId(sprint.getWorkspace()
      .getId());
    if (isConflictTime(sprint, sprintList)) {
      throw AppException.builder()
        .error(Error.SPRINT_CONFLICT_TIME)
        .build();
    }
    sprintRepository.save(sprint);
    if (sprint.getDtEnd() != null) {
      sprintScheduler.scheduleSprintEnd(sprint.getId(), LocalDateTime.ofInstant(sprint.getDtEnd(),
        ZoneId.of("Asia/Ho_Chi_Minh")));
    }

    SprintResponse sprintResponse = sprintMapper.toSprintCreateResponse(sprint);

    return ApiResponse.<SprintResponse>builder()
      .data(sprintResponse)
      .message("Update sprint successfully")
      .build();
  }

  public Sprint getSprintById(String sprintId) {
    return sprintRepository.findById(sprintId)
      .orElseThrow(() -> AppException.builder()
        .error(Error.NOT_FOUND)
        .build());
  }

  public ApiResponse<List<SprintResponse>> getListSprintByWorkspaceId(String workspaceId) {
    List<Sprint> list = sprintRepository.findAllByWorkspaceId(workspaceId);
    if (list.isEmpty())
      return ApiResponse.<List<SprintResponse>>builder()
        .data(null)
        .build();
    List<SprintResponse> transferList = list.stream()
      .map(sprintMapper::toSprintCreateResponse)
      .toList()
      ;
    return ApiResponse.<List<SprintResponse>>builder()
      .code(HttpStatus.OK.value())
      .data(transferList)
      .build();
  }

  public Sprint saveSprint(Sprint sprint) {
    try {
      return sprintRepository.saveAndFlush(sprint);
    } catch (Exception e) {
      throw AppException.builder()
        .error(Error.DB_SERVER_ERROR)
        .build();
    }
  }

  @Transactional
  public ApiResponse<Void> deleteSprint(String id) {
    Sprint sprint = sprintRepository.findById(id)
      .orElseThrow(() -> AppException.builder()
        .error(Error.NOT_FOUND)
        .build());
    Instant now = ClockSimulator.now()
      .truncatedTo(ChronoUnit.MINUTES);
    Instant start = sprint.getDtStart()
      .truncatedTo(ChronoUnit.MINUTES);
    Instant end = sprint.getDtEnd()
      .truncatedTo(ChronoUnit.MINUTES);
    if (now.isAfter(start) && now.isBefore(end))
      throw AppException.builder()
        .error(Error.SPRINT_ALREADY_START)
        .build();
    if (end.isBefore(now))
      throw AppException.builder()
        .error(Error.SPRINT_ALREADY_END)
        .build();
    List<ProjectSprint> projectSprints = sprint.getProjectSprints();
    if (projectSprints != null && !projectSprints.isEmpty()) {
      for (ProjectSprint projectSprint : projectSprints) {
        projectSprintService.delete(projectSprint.getId());
      }
    }

    sprintRepository.delete(sprint);
    return ApiResponse.<Void>builder()
      .code(HttpStatus.OK.value())
      .message("Delete sprint successfully")
      .build();
  }

  private boolean isConflictTime(Sprint sprint, List<Sprint> sprintList) {
    Instant start = sprint.getDtStart()
      .truncatedTo(ChronoUnit.MINUTES);
    Instant end = sprint.getDtEnd()
      .truncatedTo(ChronoUnit.MINUTES);
    for (Sprint s : sprintList) {
      if (s.getId()
        .equals(sprint.getId()))
        continue;
      Instant sStart = s.getDtStart()
        .truncatedTo(ChronoUnit.MINUTES);
      Instant sEnd = s.getDtEnd()
        .truncatedTo(ChronoUnit.MINUTES);
      if ((start.isAfter(sStart) && start.isBefore(sEnd)) || (end.isAfter(sStart) && end.isBefore(
        sEnd)) || (start.equals(sStart) || end.equals(sEnd))) {
        return true;
      }
    }
    return false;
  }

  public boolean completedSprint(Project project, Sprint sprint) {
    ProjectSnapshot projectSnapshot = snapshotRepository.findByProjectIdAndSprintId(project.getId(), sprint.getId())
      .orElse(null);
    if (projectSnapshot == null) return false;
    int totalIssues = projectSnapshot.getIssues().size();
    int completedIssues = (int) projectSnapshot.getIssues().stream()
      .filter(issue -> issue.getStatus()
        .equals("DONE"))
      .count();
    // Làm tròn xuống 80% của tổng số issue
    int requiredCompleted = (int) Math.floor(totalIssues * 0.8);
    return completedIssues >= requiredCompleted;
  }
}
