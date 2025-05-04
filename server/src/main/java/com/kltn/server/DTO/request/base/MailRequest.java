package com.kltn.server.DTO.request.base;


import java.util.HashMap;
import java.util.Map;

public record MailRequest(String to, String templateName, Map<String, String> variable,
                          Map<String, String> resource) {

    public static class MailRequestBuilder {
        private String to;
        private String templateName;
        private Map<String, String> variable;
        private Map<String, String> resource;
        public MailRequestBuilder() {
            resource = new HashMap<>();
            resource.put("logo", "logo/kltn_logo.jpeg");
        }

        public MailRequestBuilder to(String to) {
            this.to = to;
            return this;
        }

        public MailRequestBuilder templateName(String templateName) {
            this.templateName = templateName;
            return this;
        }

        public MailRequestBuilder variable(Map<String, String> variable) {
            this.variable = variable;
            return this;
        }

        public MailRequestBuilder resource(Map<String, String> resource) {
            this.resource = resource;
            return this;
        }

        public MailRequest build() {
            return new MailRequest(to, templateName, variable, resource);
        }
    }

    public static MailRequestBuilder builder() {
        return new MailRequestBuilder();
    }

    @Override
    public String to() {
        return to;
    }

    @Override
    public String templateName() {
        return templateName;
    }

    @Override
    public Map<String, String> variable() {
        return variable;
    }

    @Override
    public Map<String, String> resource() {
        return resource;
    }
    public MailRequest rebuild(String to) {
        return MailRequest.builder()
                .to(to)
                .templateName(templateName)
                .variable(variable)
                .resource(resource)
                .build();
    }

    @Override
    public String toString() {
        return "MailRequest{" +
                "to='" + to + '\'' +
                ", templateName='" + templateName + '\'' +
                ", variable=" + variable +
                ", resource=" + resource +
                '}';
    }
}
