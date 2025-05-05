package com.kltn.server.service;

import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    JwtDecoder jwtDecoder;
    WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;

    @Autowired
    public TokenService(@Qualifier("verifyTokenDecoder") JwtDecoder jwtDecoder, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository) {
        this.jwtDecoder = jwtDecoder;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
    }

    public void verifyInviteUser(String token) {
        Jwt jwt = validateToken(token);

        String workspaceId = jwt.getClaim("workspaceId");
        String userId = jwt.getClaim("userId");

        WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
                .workspaceId(workspaceId)
                .userId(userId)
                .build();
        WorkspacesUsersProjects usersProjects = workspacesUsersProjectsRepository.findById(workspacesUsersId).orElseThrow(() -> new RuntimeException("User not found in workspace"));
        usersProjects.setInProject(true);
        workspacesUsersProjectsRepository.save(usersProjects);

    }

    private Jwt validateToken(String token) {
        try {
            return jwtDecoder.decode(token);
            // Token is valid, you can use the decoded JWT object
        } catch (Exception e) {
            // Token is invalid or expired
            throw new RuntimeException("Invalid token", e);
        }
    }
}
