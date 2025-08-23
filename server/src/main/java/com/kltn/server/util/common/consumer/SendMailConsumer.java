package com.kltn.server.util.common.consumer;

import com.kltn.server.DTO.request.base.MailRequest;
import com.kltn.server.util.common.consumer.service.SendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class SendMailConsumer {

  SendMailService sendMailService;

  @Autowired
  public SendMailConsumer(SendMailService sendMailService) {
    this.sendMailService = sendMailService;
  }

  @KafkaListener(topics = "send-mail", groupId = "send-mail")
  public void consumeMail(MailRequest mail) {
    try {
      sendMailService.sendEmail(mail);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send email", e);
    }
  }
//
//  @KafkaListener(topics = "send-mail", groupId = "send-mail")
//  public void consumeObj2(MailRequest mail) {
//    try {
//      kafkaSendMailService.sendEmail(mail);
//    } catch (Exception e) {
//      throw new RuntimeException("Failed to send email", e);
//    }
//  }
//
//  @KafkaListener(topics = "send-mail", groupId = "send-mail")
//  public void consumeObj3(MailRequest mail) {
//    try {
//      kafkaSendMailService.sendEmail(mail);
//    } catch (Exception e) {
//      throw new RuntimeException("Failed to send email", e);
//    }
//  }


}