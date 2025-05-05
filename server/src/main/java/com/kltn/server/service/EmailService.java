package com.kltn.server.service;

import com.kltn.server.DTO.request.base.MailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletionStage;

@Service
public class EmailService {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void inviteToProject(MailRequest mail) {
        CompletionStage<SendResult<String, Object>> sendResult = kafkaTemplate.send("send-mail", mail);
        sendResult.thenAccept(re -> {
            System.out.println("Sent message=[" + mail + "] to with offset=[" + re.getRecordMetadata().offset() + "]");
        }).exceptionally(e -> {
            System.out.println("Unable to send message=[" + mail + "] due to : " + e.getMessage());
            return null;
        });
    }
}
