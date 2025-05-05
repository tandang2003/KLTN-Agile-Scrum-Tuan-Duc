package com.kltn.server.service.entity;

import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.DTO.request.entity.project.ProjectCreationRequest;
import com.kltn.server.DTO.request.entity.project.ProjectInvitationRequest;
import com.kltn.server.DTO.request.log.MailInviteStudent;
import com.kltn.server.DTO.request.log.ProjectLogRequest;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.project.ProjectResponse;
import com.kltn.server.config.RoleInit;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.kafka.SendMailEvent;
import com.kltn.server.mapper.base.TopicMapper;
import com.kltn.server.mapper.entity.ProjectMapper;
import com.kltn.server.model.collection.model.Topic;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.Role;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.Workspace;
import com.kltn.server.model.entity.embeddedKey.WorkspacesUsersId;
import com.kltn.server.model.entity.relationship.WorkspacesUsersProjects;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.RoleRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.repository.entity.relation.WorkspacesUsersProjectsRepository;
import com.kltn.server.service.EmailService;
import com.kltn.server.util.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    private ProjectMapper projectMapper;
    private TopicMapper topicMapper;
    private ProjectRepository projectRepository;
    private WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private RoleInit roleInit;
    private EmailService emailService;
    @Value("${verify.invite-project-link}")
    private String link;

    @Autowired
    public ProjectService(EmailService emailService, RoleInit roleInit, UserRepository userRepository, TopicMapper topicMapper, RoleRepository roleRepository, ProjectMapper projectMapper, WorkspacesUsersProjectsRepository workspacesUsersProjectsRepository, ProjectRepository projectRepository) {
        this.roleInit = roleInit;
        this.roleRepository = roleRepository;
        this.topicMapper = topicMapper;
        this.projectMapper = projectMapper;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.workspacesUsersProjectsRepository = workspacesUsersProjectsRepository;
        this.emailService = emailService;
    }

    @SendKafkaEvent(topic = "project-created")
    public ApiResponse<ProjectResponse> createProject(ProjectCreationRequest creationRequest) {
        WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
                .workspaceId(creationRequest.workspaceId())
                .userId(creationRequest.userId())
                .build();

        WorkspacesUsersProjects workspacesUsersProjects = workspacesUsersProjectsRepository.findById(workspacesUsersId)
                .orElseThrow(() -> AppException.builder()
                        .error(Error.NOT_FOUND)
                        .build());
//      insert workspace
        var project = projectMapper.toEntity(creationRequest);
        var savedProject = projectRepository.save(project);

        if (savedProject.getId() == null || savedProject.getId().isEmpty()) {
            throw new RuntimeException("Failed to create project");
        }
        if (workspacesUsersProjects.getProject() != null) {
            throw AppException.builder()
                    .error(Error.ALREADY_EXISTS)
                    .build();
        }

        workspacesUsersProjects.setProject(savedProject);
        workspacesUsersProjects.setRole(roleInit.getRole(RoleType.LEADER.getName()));
        workspacesUsersProjects.setInProject(true);

        workspacesUsersProjectsRepository.save(workspacesUsersProjects);
        List<Topic> topics = topicMapper.toTopicList(creationRequest.tags());
        var logProject = ProjectLogRequest.builder()
                .projectId(project.getId())
                .description(project.getDescription())
                .tags(
                        topics
                ).build();

        return ApiResponse.<ProjectResponse>builder()
                .message("Create project success")
                .data(projectMapper.toCreationResponse(savedProject, topics))
                .logData(logProject)
                .build()
                ;
    }

    //TODO insert mail, optimize
//    @SendMailEvent(topic = "send-mail")
    public ApiResponse<Void> inviteUserToProject(ProjectInvitationRequest invitationRequest) {
        String userInviteId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User userInvite = userRepository.findByUniId(userInviteId).orElseThrow(() -> AppException.builder()
                .error(Error.NOT_FOUND)
                .build());
//        List<String> emailToInvite = new ArrayList<>();
        Project project = projectRepository.findById(invitationRequest.projectId()).orElseThrow(() -> AppException.builder()
                .error(Error.NOT_FOUND)
                .build());
        MailRequest mailRequest = MailRequest.builder()
                .confirmationLink(link)
                .variable(Map.of(
                        "sender", userInvite.getName(),
                        "project.name", project.getName()
                ))
//                .data(Map.of("workspaceId", invitationRequest.workspaceId()))
                .templateName("invite-student").build();
        invitationRequest.userId().forEach(userId -> {
            User user = userRepository.findByUniId(userId).orElseThrow(() -> AppException.builder()
                    .error(Error.NOT_FOUND)
                    .build());

            WorkspacesUsersId workspacesUsersId = WorkspacesUsersId.builder()
                    .userId(user.getId())
                    .workspaceId(invitationRequest.workspaceId())
                    .build();
            WorkspacesUsersProjects usersProjects = WorkspacesUsersProjects
                    .builder()
                    .role(roleInit.getRole(RoleType.MEMBER.getName()))
                    .user(user)
                    .project(project)
                    .workspace(project.getWorkspace())
                    .id(workspacesUsersId)
                    .build();
            try {
                workspacesUsersProjectsRepository.save(usersProjects);
                emailService.inviteToProject(mailRequest.rebuild(user.getEmail(),
                        Map.of(
                                "userId", workspacesUsersId.getUserId(),
                                "workspaceId", workspacesUsersId.getWorkspaceId())));
            } catch (Exception e) {
                throw AppException.builder()
                        .error(Error.SERVER_ERROR)
                        .build();
            }
        });
        return ApiResponse.<Void>builder()
                .message("Invite student to project")
//                .logData(MailInviteStudent.builder()
//                        .to(emailToInvite)
//                        .referenceLink(link)
//                        .mailRequest(MailRequest.builder()
//                                .variable(Map.of(
//                                        "sender", userInvite.getName(),
//                                        "project.name", project.getName()
//                                ))
//                                .data(Map.of("workspaceId", invitationRequest.workspaceId()))
//                                .templateName("invite-student")
//                                .build())
//                        .build())
                .build();
    }
}
