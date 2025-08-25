package com.kltn.server.util.common.AOP;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.util.common.SendEvent;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletionStage;

@Aspect
@Component
public class SendObject<T> {
  @Autowired
  private KafkaTemplate<String, Object> kafkaTemplate;

  @AfterReturning(pointcut = "@annotation(com.kltn.server.util.common.SendEvent)", returning = "result", argNames = "joinPoint,result")
  public void sendKafkaEvent(JoinPoint joinPoint, Object result) {
    ApiResponse<?> apiResponse = (ApiResponse<?>) result;
    if (apiResponse.getLogData() != null) {
      MethodSignature signature = (MethodSignature) joinPoint.getSignature();
      Method method = signature.getMethod();
      SendEvent sendEvent = method.getAnnotation(SendEvent.class);
      String curUser = SecurityContextHolder.getContext()
          .getAuthentication()
          .getPrincipal()
          .toString();
      Object logData = apiResponse.getLogData() != null ? apiResponse.getLogData() : apiResponse.getData();
      // try {

      ProducerRecord<String, Object> record = new ProducerRecord<>(sendEvent.topic(), logData);
      record.headers().add("X-Auth-User", curUser.getBytes(StandardCharsets.UTF_8));
      // Message<Object> message = MessageBuilder.withPayload(logData)
      // .setHeader("X-Auth-User", curUser)
      // .build();

      CompletionStage<SendResult<String, Object>> sendResult = kafkaTemplate.send(
record
      );
      sendResult.whenComplete((re, ex) -> {
        System.out.println("Sent message=[" + logData + "] to with offset=[" + re.getRecordMetadata()
            .offset() + "]");
      })
          .exceptionally(e -> {
            System.out.println("Unable to send message=[" + logData + "] due to : " + e.getMessage());
            return null;
          });
      // } catch (Exception e) {
      // System.out.println("ERROR : " + e.getMessage());
      // }
    }
  }

}