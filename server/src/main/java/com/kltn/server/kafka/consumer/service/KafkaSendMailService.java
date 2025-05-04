package com.kltn.server.kafka.consumer.service;

import com.kltn.server.DTO.request.base.MailRequest;
import jakarta.activation.DataSource;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class KafkaSendMailService {

    @Autowired
    private JavaMailSender mailSender;
    @Value("${mail.sender}")
    private String senderMail;
    @Value("${mail.name}")
    private String senderName;

    public void sendEmail(MailRequest request) throws Exception {
        String content = render(request.templateName(), request.variable());

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(request.to());
        helper.setText(content, true);
        helper.setFrom(senderMail, senderName);

        if (request.resource() != null) {
            for (Map.Entry<String, String> source : request.resource().entrySet())
                helper.addInline(source.getKey(), new ClassPathResource(source.getValue())); // use `cid:logo` in HTML
        }
        try {
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);

        }
    }

    private String render(String template, Map<String, String> variable) throws IOException {
        ClassPathResource resource = new ClassPathResource("template/" + template + ".html");
        String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        for (Map.Entry<String, String> entry : variable.entrySet()) {
            content = content.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return content;
    }

}
