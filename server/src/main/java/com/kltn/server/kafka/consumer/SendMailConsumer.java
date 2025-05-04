package com.kltn.server.kafka.consumer;

import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.kafka.consumer.service.KafkaSendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class SendMailConsumer {

    KafkaSendMailService kafkaSendMailService;

    @Autowired
    public SendMailConsumer(KafkaSendMailService kafkaSendMailService) {
        this.kafkaSendMailService = kafkaSendMailService;
    }

    @KafkaListener(topics = "send-mail", groupId = "send-mail")
    public void consumeObj1(MailRequest mail) {
        try {
            kafkaSendMailService.sendEmail(mail);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @KafkaListener(topics = "send-mail", groupId = "send-mail")
    public void consumeObj2(MailRequest mail) {
        try {
            kafkaSendMailService.sendEmail(mail);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @KafkaListener(topics = "send-mail", groupId = "send-mail")
    public void consumeObj3(MailRequest mail) {
        try {
            kafkaSendMailService.sendEmail(mail);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }


}
