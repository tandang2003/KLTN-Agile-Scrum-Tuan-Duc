package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, String> {

}
