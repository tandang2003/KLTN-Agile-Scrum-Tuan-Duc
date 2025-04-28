package com.kltn.server.kafka.consumer;

import com.kltn.server.kafka.consumer.service.KafkaSendMailService;

public class SendMailConsumer {

    KafkaSendMailService kafkaSendMailService;

    public SendMailConsumer(KafkaSendMailService kafkaSendMailService) {
        this.kafkaSendMailService = kafkaSendMailService;
    }
}
