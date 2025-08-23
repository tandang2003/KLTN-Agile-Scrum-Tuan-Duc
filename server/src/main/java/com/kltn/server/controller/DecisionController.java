package com.kltn.server.controller;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.config.init.ClockSimulator;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.type.task.IssueStatus;
import com.kltn.server.repository.entity.SprintRepository;
import com.kltn.server.service.DecisionService;
import com.kltn.server.service.entity.IssueService;
import com.kltn.server.service.entity.ProjectService;
import com.kltn.server.service.entity.SprintService;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.kltn.server.service.entity.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;

@RestController
@RequestMapping("decision")
public class DecisionController {
  @Value("${google.sheet.sprint.spreadsheetId}")
  private String sprintSpreadsheetId;

  @Value("${google.sheet.issue.spreadsheetId}")
  private String issueSpreadsheetId;
  @Value("${google.sheet.sprint.sheet}")
  private String sprintSpreadsheetName;

  @Value("${google.sheet.issue.sheet}")
  private String issueSpreadsheetName;
  private final DecisionService decisionService;
  private final WorkspaceService workspaceService;
  private final ProjectService projectService;
  private final SprintService sprintService;
  private final SprintRepository sprintRepository;
  private final IssueService issueService;
  String[] velDiffSprintRow = new String[] {
      "project_id",
      "sprint_id",
      "story_point",
      "no_issue_starttime",
      "no_issue_added",
      "no_issue_done",
      "no_of_issue", // Số lượng issue
  };
  String[] sprintRow = new String[] {
      "project_id",
      "sprint_id",
      "planday",
      "story_point",
      "no_issue_starttime",
      "no_issue_added",
      "no_issue_removed",
      "no_issue_todo",
      "no_issue_inprogress",
      "no_issue_done",
      "no_team_size" };
  String[] issueRow = new String[] {
      "issue_name",
      "project_id",
      "sprint_id",
      "type",
      "priority",
      "no_affect_version",
      "no_fix_version",
      "no_link",
      "no_of_comment",
      "no_issue_blocking",
      "no_issue_blocked",
      "no_fix_version_change",
      "no_priority_change",
      "no_description_change",
      "complexity_of_description",
      "suitable_assignee" };
  @Value("${data.filepath}")
  String filePathOfData;

  @Autowired
  public DecisionController(DecisionService decisionService, WorkspaceService workspaceService,
      ProjectService projectService, SprintService sprintService, SprintRepository sprintRepository,
      IssueService issueService) {
    this.decisionService = decisionService;
    this.workspaceService = workspaceService;
    this.projectService = projectService;
    this.sprintService = sprintService;
    this.sprintRepository = sprintRepository;
    this.issueService = issueService;
  }

//  @GetMapping("{projectId}/{sprintId}/predict")
//  public ResponseEntity<ApiResponse<Boolean>> makePredict(
//      @PathVariable String projectId, @PathVariable String sprintId) {
//    var response = decisionService.makePredict(projectId, sprintId, true);
//
//    // Placeholder for decision logic
//    return ResponseEntity.ok(response);
//  }

  @GetMapping("store-data")
  public ResponseEntity<ApiResponse<Boolean>> storeData(@RequestParam String stage, @RequestParam String workspaceId) {
    Instant now = ClockSimulator.now();
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);

    List<Sprint> sprints = workspace.getSprints()
        .stream()
        .filter(s -> s.getDtStart().isBefore(now) && s.getDtEnd().isAfter(now))
        .collect(Collectors.toList());
    for (Sprint sprint : sprints) {
      List<Project> projects = sprint.getProjects();
      for (Project project : projects) {
        writeToExcel(workspace.getId(), project.getId(), sprint.getId(), stage);
      }
      // }
    }
    return ResponseEntity.ok().body(ApiResponse.<Boolean>builder().data(true).build());
  }

  @GetMapping("store_vel_dif")
  public ResponseEntity<ApiResponse<Boolean>> storeVel(@RequestParam String workspaceId) {
    Instant now = ClockSimulator.now();
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);

    List<Sprint> sprints = workspace.getSprints()
        .stream()
        .filter(s -> s.getDtStart().isBefore(now) && s.getDtEnd().isAfter(now))
        .toList();
    for (Sprint sprint : sprints) {
      List<Project> projects = sprint.getProjects();
      for (Project project : projects) {
        writeToExcelVelDiff(workspace.getId(), project.getId(), sprint.getId());
      }
    }
    return ResponseEntity.ok().body(ApiResponse.<Boolean>builder().data(true).build());
  }

  @Transactional
  public void writeToExcel(String workspaceId, String projectId, String sprintId, String stage) {
    Sprint sprint = sprintService.getSprintById(sprintId);
    Project project = projectService.getProjectById(projectId);
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);
    List<Issue> issues = issueService.getIssuesBySprintId(projectId, sprintId);
    String courseFile = this.filePathOfData + "/" + stage + "/" + workspace.getName();
    String sprintFilePath = courseFile + "/" + "sprint.xlsx";
    String issueFilePath = courseFile + "/" + "issue.xlsx";
    File file = new File(sprintFilePath);
    File parentDir = file.getParentFile();
    if (parentDir != null && !parentDir.exists()) {
      parentDir.mkdirs(); // create directories if not exist
    }
    Workbook workbook;
    Sheet sheet;
    try {
      if (file.exists()) {
        // Open existing workbook
        FileInputStream fis = new FileInputStream(file);
        workbook = new XSSFWorkbook(fis);
        sheet = workbook.getSheetAt(0);
        fis.close();
      } else {
        // Create new workbook and sheet
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Sheet1");

        // Optional: Write header row
        Row header = sheet.createRow(0);
        for (int i = 0; i < sprintRow.length; i++) {
          header.createCell(i).setCellValue(sprintRow[i]);
        }
      }

      // Append new data row
      int newRowNum = findNextEmptyRow(sheet);
      Row newRow = sheet.createRow(newRowNum);
      for (int i = 0; i < sprintRow.length; i++) {
        Cell cell = newRow.createCell(i);
        switch (sprintRow[i]) {
          case "project_id":
            cell.setCellValue(projectId);
            break;
          case "sprint_id":
            cell.setCellValue(sprint.getId());
            break;
          case "story_point":
            cell.setCellValue(sprint.getStoryPoint());
            break;
          case "planday":
            cell.setCellValue(decisionService.calculateSprintDuration(sprint));
            break;
          case "no_issue_starttime":
            cell.setCellValue(issueService.getNumberOfIssuesAtStart(project, sprint));
            break;
          case "no_issue_added":
            cell.setCellValue(issueService.getNumberOfIssuesAdded(project, sprint));
            break;
          case "no_issue_removed":
            cell.setCellValue(0);
            // cell.setCellValue(issueService.getNumberOfIssuesRemoved(project, sprint));
            break;
          case "no_issue_todo":
            cell.setCellValue(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.TODO));
            break;
          case "no_issue_inprogress":
            cell.setCellValue(issueService.getNumberOfIssuesByStatuses(project, sprint,
                List.of(IssueStatus.INPROCESS, IssueStatus.REVIEW)));
            break;
          case "no_issue_done":
            cell.setCellValue(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.DONE));
            break;
          case "no_team_size":
            cell.setCellValue(issueService.getNumberOfMembersInSprint(project, sprint));
            break;
        }
      }

      // Write to file
      FileOutputStream fos = new FileOutputStream(sprintFilePath);
      workbook.write(fos);
      fos.close();
      workbook.close();

      System.out.println("Data written to " + sprintFilePath);

    } catch (IOException e) {
      e.printStackTrace();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    file = new File(issueFilePath);
    parentDir = file.getParentFile();
    if (parentDir != null && !parentDir.exists()) {
      parentDir.mkdirs(); // create directories if not exist
    }

    try {
      if (file.exists()) {
        // Open existing workbook
        FileInputStream fis = new FileInputStream(file);
        workbook = new XSSFWorkbook(fis);
        sheet = workbook.getSheetAt(0);
        fis.close();
      } else {
        // Create new workbook and sheet
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Sheet1");

        // Optional: Write header row
        Row header = sheet.createRow(0);
        for (int i = 0; i < issueRow.length; i++) {

          header.createCell(i).setCellValue(issueRow[i]);
        }
      }

      int newRowNum = findNextEmptyRow(sheet);
      for (Issue issue : issues) {
        if (newRowNum >= 1048576) {
          throw new IllegalStateException("Excel row limit reached while writing issues.");
        }
        Row newRow = sheet.createRow(newRowNum++);
        for (int i = 0; i < issueRow.length; i++) {
          Cell cell = newRow.createCell(i);
          switch (issueRow[i]) {
            case "issue_name":
              cell.setCellValue(issue.getName());
              break;
            case "project_id":
              cell.setCellValue(projectId);
              break;
            case "sprint_id":
              cell.setCellValue(sprintId);
              break;
            case "type":
              cell.setCellValue(issue.getTag().name());
              break;
            case "priority":
              cell.setCellValue(issue.getPriority().name());
              break;
            case "no_affect_version":
              cell.setCellValue(issueService.getNumberOfAffectVersions(issue.getId()));
              break;
            case "no_fix_version":
              cell.setCellValue(issueService.getNumberOfFixVersions(issue.getId()));
              break;
            case "no_link":
              cell.setCellValue(issueService.getNumberOfLink(issue.getId()));
              break;
            case "no_issue_blocking":
              cell.setCellValue(issueService.getNumberOfBlocked(issue.getId()));
              break;
            case "no_issue_blocked":
              cell.setCellValue(issueService.getNumberOfBlock(issue.getId()));
              break;
            case "no_of_comment":
              cell.setCellValue(issueService.getNumberOfComments(issue.getId()));
              break;
            case "no_fix_version_change":
              cell.setCellValue(issueService.getNumChangeFixVersion(issue.getId()));
              break;
            case "no_priority_change":
              cell.setCellValue(issue.getNumChangeOfPriority());
              break;
            case "no_description_change":
              cell.setCellValue(issue.getNumChangeOfDescription());
              break;
            case "complexity_of_description":
              cell.setCellValue(issue.getComplexOfDescription());
              break;
            case "suitable_assignee":
              cell.setCellValue(issueService.calculateCompatibleOfAssignee(issue));
              break;
          }
        }
      }
      // Write to file
      FileOutputStream fos = new FileOutputStream(issueFilePath);
      workbook.write(fos);
      fos.close();
      workbook.close();

      System.out.println("Data written to " + issueFilePath);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void writeToExcelVelDiff(String workspaceId, String projectId, String sprintId) {
    Sprint sprint = sprintService.getSprintById(sprintId);
    Project project = projectService.getProjectById(projectId);
    Workspace workspace = workspaceService.getWorkspaceById(workspaceId);
    String courseFile = this.filePathOfData + "/" + "vel_diff" + "/" + workspace.getName();
    String velDifSprintPath = courseFile + "/" + "vel_diff.xlsx";

    File file = new File(velDifSprintPath);
    File parentDir = file.getParentFile();
    if (parentDir != null && !parentDir.exists()) {
      parentDir.mkdirs(); // create directories if not exist
    }
    Workbook workbook;
    Sheet sheet;
    try {
      if (file.exists()) {
        // Open existing workbook
        FileInputStream fis = new FileInputStream(file);
        workbook = new XSSFWorkbook(fis);
        sheet = workbook.getSheetAt(0);
        fis.close();
      } else {
        // Create new workbook and sheet
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Sheet1");

        // Optional: Write header row
        Row header = sheet.createRow(0);
        for (int i = 0; i < velDiffSprintRow.length; i++) {
          header.createCell(i).setCellValue(velDiffSprintRow[i]);
        }
      }

      // Append new data row
      int rowCount = sheet.getLastRowNum();

      Row newRow = sheet.createRow(rowCount + 1);
      for (int i = 0; i < velDiffSprintRow.length; i++) {
        Cell cell = newRow.createCell(i);
        switch (velDiffSprintRow[i]) {
          case "project_id":
            cell.setCellValue(projectId);
            break;
          case "sprint_id":
            cell.setCellValue(sprint.getId());
            break;
          case "story_point":
            cell.setCellValue(sprint.getStoryPoint());
            break;
          case "no_issue_starttime":
            cell.setCellValue(issueService.getNumberOfIssuesAtStart(project, sprint));
            break;
          case "no_issue_added":
            cell.setCellValue(issueService.getNumberOfIssuesAdded(project, sprint));
            break;
          case "no_issue_done":
            cell.setCellValue(issueService.getNumberOfIssuesByStatus(project, sprint, IssueStatus.DONE));
            break;
          case "no_of_issue":
            cell.setCellValue(issueService.getNoOfIssue(project, sprint));
            break;
        }
      }

      // Write to file
      FileOutputStream fos = new FileOutputStream(velDifSprintPath);
      workbook.write(fos);
      fos.close();
      workbook.close();

      System.out.println("Data written to " + velDifSprintPath);

    } catch (IOException e) {
      e.printStackTrace();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private int findNextEmptyRow(Sheet sheet) {
    int maxRows = 1048576;
    for (int i = 1; i < maxRows; i++) {
      Row row = sheet.getRow(i);
      if (row == null || isRowEmpty(row)) {
        return i;
      }
    }
    throw new IllegalStateException("No empty rows available in sheet. Excel row limit reached.");
  }

  private boolean isRowEmpty(Row row) {
    if (row == null)
      return true;
    for (Cell cell : row) {
      if (cell != null && cell.getCellType() != CellType.BLANK) {
        return false;
      }
    }
    return true;
  }

}
