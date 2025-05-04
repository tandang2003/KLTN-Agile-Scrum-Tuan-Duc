package com.kltn.server.DTO.request.log;

import com.kltn.server.DTO.request.base.MailRequest;

import java.util.List;

public record MailInviteStudent(List<String> to, MailRequest mailRequest) {
    public static class MailInviteStudentBuilder {
        private List<String> to;
        private MailRequest mailRequest;

        public MailInviteStudentBuilder to(List<String> to) {
            this.to = to;
            return this;
        }

        public MailInviteStudentBuilder mailRequest(MailRequest mailRequest) {
            this.mailRequest = mailRequest;
            return this;
        }

        public MailInviteStudent build() {
            return new MailInviteStudent(to, mailRequest);
        }
    }

    public static MailInviteStudentBuilder builder() {
        return new MailInviteStudentBuilder();
    }

    @Override
    public List<String> to() {
        return to;
    }

    @Override
    public MailRequest mailRequest() {
        return mailRequest;
    }

    @Override
    public String toString() {
        return "MailInviteStudent{" +
                "to=" + to +
                ", mailRequest=" + mailRequest +
                '}';
    }
}
