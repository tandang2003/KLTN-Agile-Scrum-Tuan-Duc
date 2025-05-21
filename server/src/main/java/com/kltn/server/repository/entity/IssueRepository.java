package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, String> {

    Optional<List<Issue>> findAllByProjectIdAndSprintId(String projectId, String sprintId);



}
