package com.kltn.server.util.helper;

import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.DTO.request.log.MailInviteStudent;

import java.util.List;
import java.util.Map;

public class MailHelper {
    private static final String CONFIRMATION_LINK = "https://google.com"; // Replace with a config value if needed

    private static MailInviteStudent buildInviteStudentMail(List<String> emails, String senderName, String workspaceName) {
        return MailInviteStudent.builder()
                .to(emails)
                .mailRequest(
                        MailRequest.builder()
                                .templateName("workspace-invite-student")
                                .variable(Map.of(
                                        "sender", senderName,
                                        "project.name", workspaceName,
                                        "project.confirmationLink", CONFIRMATION_LINK
                                ))
                                .build()
                )
                .build();
    }

}
