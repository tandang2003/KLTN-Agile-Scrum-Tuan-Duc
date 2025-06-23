package com.kltn.server.kafka.AOP;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.kafka.SendKafkaEvent;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.kafka.support.SendResult;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.concurrent.CompletionStage;

@Aspect
@Component
public class KafkaSendObject<T> {
  @Autowired
  private KafkaTemplate<String, Object> kafkaTemplate;

  @AfterReturning(pointcut = "@annotation(com.kltn.server.kafka.SendKafkaEvent)",
                  returning = "result",
                  argNames = "joinPoint,result")
  public void sendKafkaEvent(JoinPoint joinPoint, Object result) {
    ApiResponse<?> apiResponse = (ApiResponse<?>) result;
    if (apiResponse.getLogData() != null) {
      MethodSignature signature = (MethodSignature) joinPoint.getSignature();
      Method method = signature.getMethod();
      SendKafkaEvent sendKafkaEvent = method.getAnnotation(SendKafkaEvent.class);
      String curUser = SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getPrincipal()
                                            .toString();
      Object logData = apiResponse.getLogData() != null ? apiResponse.getLogData() : apiResponse.getData();
//            try {
      Message<Object> message = MessageBuilder.withPayload(logData)
                                              .setHeader(KafkaHeaders.TOPIC, sendKafkaEvent.topic())
                                              .setHeader("X-Auth-User", curUser)
                                              .build();
      CompletionStage<SendResult<String, Object>> sendResult = kafkaTemplate.send(message);
      sendResult.whenComplete((re, ex) -> {
                  System.out.println("Sent message=[" + logData + "] to with offset=[" + re.getRecordMetadata()
                                                                                           .offset() + "]");
                })
                .exceptionally(e -> {
                  System.out.println("Unable to send message=[" + logData + "] due to : " + e.getMessage());
                  return null;
                });
//            } catch (Exception e) {
//                System.out.println("ERROR :  " + e.getMessage());
//            }
    }
  }

}
