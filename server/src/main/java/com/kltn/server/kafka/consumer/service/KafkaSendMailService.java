package com.kltn.server.kafka.consumer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class KafkaSendMailService {
    @Autowired
    private JavaMailSender javaMailSender;
    private String from;
    private String to;

}
