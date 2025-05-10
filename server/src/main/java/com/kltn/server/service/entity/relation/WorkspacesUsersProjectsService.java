package com.kltn.server.service.entity.relation;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkspacesUsersProjectsService {
    private final WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;

    @Autowired
    public WorkspacesUsersProjectsService(WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository) {
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    }

    public WorkspacesUsersProjects getByWorkspaceAndUserId(String workspaceId, String userId) {
        return workspacesUsersProjectsRepository.findById(WorkspacesUsersId.builder().workspaceId(workspaceId).userId(userId).build()).orElseThrow(
                () -> AppException.builder()
                        .error(Error.NOT_FOUND_USER_IN_WORKSPACE)
                        .build()
        );
    }

    public WorkspacesUsersProjects getByUserIdAndProjectId(String userId, String projectId) {
        return workspacesUsersProjectsRepository.findByUserIdAndProjectId(userId, projectId).orElseThrow(
                () -> AppException.builder()
                        .error(Error.NOT_FOUND_USER_PROJECT_RELATION)
                        .build()
        );
    }

}
