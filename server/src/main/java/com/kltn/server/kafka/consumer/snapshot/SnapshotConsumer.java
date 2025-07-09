package com.kltn.server.kafka.consumer.snapshot;

import com.kltn.server.DTO.request.kafka.SnapshotRequest;
import com.kltn.server.mapper.snapshot.SnapshotMapper;
import com.kltn.server.model.base.BaseEntity;
import com.kltn.server.model.collection.model.Relation;
import com.kltn.server.model.collection.snapshot.ProjectSnapshot;
import com.kltn.server.model.entity.Issue;
import com.kltn.server.model.entity.Resource;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.ProjectSprintId;
import com.kltn.server.model.entity.relationship.IssueRelation;
import com.kltn.server.repository.document.IssueLogRepository;
import com.kltn.server.repository.document.snapshot.SnapshotRepository;
import com.kltn.server.repository.entity.IssueRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.relation.ProjectSprintRepository;
import com.kltn.server.service.entity.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SnapshotConsumer {
  private final UserRepository userRepository;
  private ProjectSprintRepository projectSprintRepository;
  private IssueRepository issueRepository;
  private IssueLogRepository issueLogRepository;
  private SnapshotRepository snapshotRepository;
  private SnapshotMapper snapshotMapper;

  @Autowired
  public SnapshotConsumer(IssueLogRepository issueLogRepository, SnapshotRepository snapshotRepository,
                          SnapshotMapper snapshotMapper, IssueRepository issueRepository,
                          ProjectSprintRepository projectSprintRepository, UserRepository userRepository) {
    this.issueLogRepository = issueLogRepository;
    this.projectSprintRepository = projectSprintRepository;
    this.issueRepository = issueRepository;
    this.snapshotRepository = snapshotRepository;
    this.snapshotMapper = snapshotMapper;
    this.userRepository = userRepository;
  }

  @KafkaListener(topics = "snapshot", groupId = "snapshot-1")
  @Transactional
  public void consumeSnapshot1(@Payload SnapshotRequest snapshotRequest, @Header("X-Auth-User") String user) {
    User u = userRepository.findByUniId(user).get();
//    User u = userService.getUserById(user);
    SecurityContextHolder.getContext()
      .setAuthentication(new UsernamePasswordAuthenticationToken(u.getUniId(), null, u.getAuthorities()));
    boolean flag = projectSprintRepository.existsById(ProjectSprintId.builder()
      .projectId(snapshotRequest.getProjectId())
      .sprintId(snapshotRequest.getSprintId())
      .build())
      & !snapshotRepository.existsByProjectIdAndSprintId(
      snapshotRequest.getProjectId(), snapshotRequest.getSprintId());

    if (flag) {
      Optional<List<Issue>> tasks = issueRepository.findAllByProjectIdAndSprintId(snapshotRequest.getProjectId(),
        snapshotRequest.getSprintId());
      if (tasks.isPresent()) {
        List<Issue> issues = tasks.get();
        Map<String, List<Resource>> mapResources = issues.stream()
          .collect(
            Collectors.toMap(BaseEntity::getId, Issue::getResources));
        Map<String, List<Relation<String>>> relationships = new HashMap<>();
        for (Issue issue : issues) {
          List<Relation<String>> relations = new ArrayList<>();
          List<IssueRelation> ir = issueRepository.getIssueRelation(issue.getId());
          ir.forEach(r -> relations.add(Relation.<String>builder()
            .related(r.getIssueRelated()
              .getId())
            .relationType(r.getTypeRelation())
            .build()));
          relationships.put(issue.getId(), relations);
        }

        ProjectSnapshot projectSnapshot = snapshotMapper.toSnapshot(snapshotRequest.getProjectId(),
          snapshotRequest.getSprintId(), issues.stream()
            .collect(
              Collectors.toMap(
                issue -> issue,
                issue -> issueLogRepository.findByNkTaskId(
                    issue.getId())
                  .orElseThrow(
                    () -> new RuntimeException(
                      "Issue not found")))),
          mapResources, relationships);
        projectSnapshot = snapshotRepository.save(projectSnapshot);

      }
    }
  }

  // @KafkaListener(topics = "snapshot",
  // groupId = "snapshot-1")
  // public void consumeSnapshot2(SnapshotRequest snapshotRequest) {
  // boolean flag = projectSprintRepository.existsById(ProjectSprintId.builder()
  // .projectId(snapshotRequest.getProjectId())
  // .sprintId(snapshotRequest.getSprintId())
  // .build()) & !snapshotRepository.existsByProjectIdAndSprintId(
  // snapshotRequest.getProjectId(), snapshotRequest.getSprintId());
  // if (flag) {
  // Optional<List<Issue>> tasks =
  // issueRepository.findAllByProjectIdAndSprintId(snapshotRequest.getProjectId(),
  // snapshotRequest.getSprintId());
  // if (tasks.isPresent()) {
  // List<Issue> issues = tasks.get();
  // Map<String, List<Resource>> mapResources = issues.stream()
  // .collect(
  // Collectors.toMap(BaseEntity::getId, Issue::getResources));
  // Map<String, List<Relation<String>>> relationships = new HashMap<>();
  // for (Issue issue : issues) {
  // List<Relation<String>> relations = new ArrayList<>();
  // List<IssueRelation> ir = issueRepository.getIssueRelation(issue.getId());
  // ir.forEach(r -> relations.add(Relation.<String>builder()
  // .related(r.getIssueRelated()
  // .getId())
  // .relationType(r.getTypeRelation())
  // .build()));
  // relationships.put(issue.getId(), relations);
  // }
  //
  // ProjectSnapshot projectSnapshot =
  // snapshotMapper.toSnapshot(snapshotRequest.getProjectId(),
  // snapshotRequest.getSprintId(), issues.stream()
  // .collect(
  // Collectors.toMap(
  // issue -> issue,
  // issue -> issueLogRepository.findByNkTaskId(
  // issue.getId())
  // .orElseThrow(
  // () -> new RuntimeException(
  // "Issue not found")))),
  // mapResources, relationships);
  // projectSnapshot = snapshotRepository.save(projectSnapshot);
  // // issues.forEach(issue -> {
  // // issue.setSprint(null);
  // // });
  // }
  // }
  // }
  //
  // @KafkaListener(topics = "snapshot",
  // groupId = "snapshot-1")
  // public void consumeSnapshot3(SnapshotRequest snapshotRequest) {
  // System.out.println("catching____________________________________________________");
  //
  // boolean flag = projectSprintRepository.existsById(ProjectSprintId.builder()
  // .projectId(snapshotRequest.getProjectId())
  // .sprintId(snapshotRequest.getSprintId())
  // .build()) & !snapshotRepository.existsByProjectIdAndSprintId(
  // snapshotRequest.getProjectId(), snapshotRequest.getSprintId());
  // if (flag) {
  // Optional<List<Issue>> tasks =
  // issueRepository.findAllByProjectIdAndSprintId(snapshotRequest.getProjectId(),
  // snapshotRequest.getSprintId());
  // if (tasks.isPresent()) {
  // List<Issue> issues = tasks.get();
  // Map<String, List<Resource>> mapResources = issues.stream()
  // .collect(
  // Collectors.toMap(BaseEntity::getId, Issue::getResources));
  // Map<String, List<Relation<String>>> relationships = new HashMap<>();
  // for (Issue issue : issues) {
  // List<Relation<String>> relations = new ArrayList<>();
  // List<IssueRelation> ir = issueRepository.getIssueRelation(issue.getId());
  // ir.forEach(r -> relations.add(Relation.<String>builder()
  // .related(r.getIssueRelated()
  // .getId())
  // .relationType(r.getTypeRelation())
  // .build()));
  // relationships.put(issue.getId(), relations);
  // }
  //
  // ProjectSnapshot projectSnapshot =
  // snapshotMapper.toSnapshot(snapshotRequest.getProjectId(),
  // snapshotRequest.getSprintId(), issues.stream()
  // .collect(
  // Collectors.toMap(
  // issue -> issue,
  // issue -> issueLogRepository.findByNkTaskId(
  // issue.getId())
  // .orElseThrow(
  // () -> new RuntimeException(
  // "Issue not found")))),
  // mapResources, relationships);
  // projectSnapshot = snapshotRepository.save(projectSnapshot);
  // // issues.forEach(issue -> {
  // // issue.setSprint(null);
  // // });
  // }
  // }
  // }
}
