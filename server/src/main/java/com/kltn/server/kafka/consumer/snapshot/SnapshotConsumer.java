package com.kltn.server.kafka.consumer.snapshot;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.mapper.snapshot.SnapshotMapper;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Sprint;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.ProjectSprint;
import com.kltn.server.repository.document.IssueLogRepository;
import com.kltn.server.repository.document.snapshot.SnapshotRepository;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.mongo.IssueMongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SnapshotConsumer {
    private ProjectSprintRepository projectSprintRepository;
    private IssueRepository issueRepository;
    private IssueLogRepository issueLogRepository;
    private SnapshotRepository snapshotRepository;
    private SnapshotMapper snapshotMapper;

    @Autowired
    public SnapshotConsumer(IssueLogRepository issueLogRepository, SnapshotRepository snapshotRepository, SnapshotMapper snapshotMapper, IssueRepository issueRepository, ProjectSprintRepository projectSprintRepository) {
        this.issueLogRepository = issueLogRepository;
        this.projectSprintRepository = projectSprintRepository;
        this.issueRepository = issueRepository;
        this.snapshotRepository = snapshotRepository;
        this.snapshotMapper = snapshotMapper;
    }

    @KafkaListener(topics = "snapshot", groupId = "snapshot-1")
    public void consumeSnapshot1(SnapshotRequest snapshotRequest) {
        Optional<ProjectSprint> projectSprint = projectSprintRepository.findById(ProjectSprintId.builder().projectId(snapshotRequest.getProjectId()).sprintId(snapshotRequest.getSprintId()).build());
        if (projectSprint.isPresent()) {
            Project project = projectSprint.get().getProject();
            Sprint sprint = projectSprint.get().getSprint();
            Optional<List<Issue>> tasks = issueRepository.findAllByProjectIdAndSprintId(project.getId(), sprint.getId());
            if (tasks.isPresent()) {
                List<Issue> issues = tasks.get();
                ProjectSnapshot projectSnapshot = snapshotMapper.toSnapshot(project.getId(), sprint.getId(), issues.stream().collect(Collectors.toMap(
                        issue -> issue,
                        issue -> issueLogRepository.findByNkTaskId(issue.getId()).orElseThrow(() -> new RuntimeException("Issue not found")))));
                projectSnapshot = snapshotRepository.save(projectSnapshot);
            }
        }


    }


    @KafkaListener(topics = "snapshot", groupId = "snapshot-1")
    public void consumeSnapshot2(SnapshotRequest snapshotRequest) {
        Optional<ProjectSprint> projectSprint = projectSprintRepository.findById(ProjectSprintId.builder().projectId(snapshotRequest.getProjectId()).sprintId(snapshotRequest.getSprintId()).build());
        if (projectSprint.isPresent()) {
            Project project = projectSprint.get().getProject();
            Sprint sprint = projectSprint.get().getSprint();
            Optional<List<Issue>> tasks = issueRepository.findAllByProjectIdAndSprintId(project.getId(), sprint.getId());
            if (tasks.isPresent()) {
                List<Issue> issues = tasks.get();
                ProjectSnapshot projectSnapshot = snapshotMapper.toSnapshot(project.getId(), sprint.getId(), issues.stream().collect(Collectors.toMap(
                        issue -> issue,
                        issue -> issueLogRepository.findByNkTaskId(issue.getId()).orElseThrow(() -> new RuntimeException("Issue not found")))));
                projectSnapshot = snapshotRepository.save(projectSnapshot);
            }
        }
    }

    @KafkaListener(topics = "snapshot", groupId = "snapshot-1")
    public void consumeSnapshot3(SnapshotRequest snapshotRequest) {
        Optional<ProjectSprint> projectSprint = projectSprintRepository.findById(ProjectSprintId.builder().projectId(snapshotRequest.getProjectId()).sprintId(snapshotRequest.getSprintId()).build());
        if (projectSprint.isPresent()) {
            Project project = projectSprint.get().getProject();
            Sprint sprint = projectSprint.get().getSprint();
            Optional<List<Issue>> tasks = issueRepository.findAllByProjectIdAndSprintId(project.getId(), sprint.getId());
            if (tasks.isPresent()) {
                List<Issue> issues = tasks.get();
                ProjectSnapshot projectSnapshot = snapshotMapper.toSnapshot(project.getId(), sprint.getId(), issues.stream().collect(Collectors.toMap(
                        issue -> issue,
                        issue -> issueLogRepository.findByNkTaskId(issue.getId()).orElseThrow(() -> new RuntimeException("Issue not found")))));
                projectSnapshot = snapshotRepository.save(projectSnapshot);
            }
        }
    }
}
