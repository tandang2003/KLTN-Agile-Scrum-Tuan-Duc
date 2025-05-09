package com.kltn.server.DTO.request.log;

import com.kltn.server.DTO.request.base.MailRequest;

import java.util.List;
import java.util.Map;

public record MailInviteStudent(List<String> to, String link
        , Map<String, String> data
        , MailRequest mailRequest) {
    public static class MailInviteStudentBuilder {
        private List<String> to;
        private Map<String, String> data;
        private MailRequest mailRequest;
        private String link;

        public MailInviteStudentBuilder to(List<String> to) {
            this.to = to;
            return this;
        }

        public MailInviteStudentBuilder data(Map<String, String> data) {
            this.data = data;
            return this;
        }

        public MailInviteStudentBuilder mailRequest(MailRequest mailRequest) {
            this.mailRequest = mailRequest;
            return this;
        }

        public MailInviteStudent build() {
            return new MailInviteStudent(to, link
                    , data
                    , mailRequest);
        }

        public MailInviteStudentBuilder referenceLink(String link) {
            this.link = link;
            return this;
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
