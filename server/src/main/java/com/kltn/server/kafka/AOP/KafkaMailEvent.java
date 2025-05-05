package com.kltn.server.kafka.AOP;

import com.kltn.server.DTO.request.log.MailInviteStudent;
import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.kafka.SendKafkaEvent;
import com.kltn.server.kafka.SendMailEvent;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.concurrent.CompletionStage;

@Aspect
@Component
public class KafkaMailEvent<T> {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @AfterReturning(
            pointcut = "@annotation(com.kltn.server.kafka.SendMailEvent)",
            returning = "result",
            argNames = "joinPoint,result"
    )
    public void sendKafkaEvent(JoinPoint joinPoint, Object result) {
        ApiResponse<?> apiResponse = (ApiResponse<?>) result;
        if (apiResponse.getLogData() != null) {
            MethodSignature signature = (MethodSignature) joinPoint.getSignature();
            Method method = signature.getMethod();
            SendMailEvent sendKafkaEvent = method.getAnnotation(SendMailEvent.class);

            MailInviteStudent logData = apiResponse.getLogData() != null
                    ? (MailInviteStudent) apiResponse.getLogData()
                    : (MailInviteStudent) apiResponse.getData();
            try {
//                for (String email : logData.to()) {
//                    CompletionStage<SendResult<String, Object>> sendResult = kafkaTemplate.send(sendKafkaEvent.topic(), logData.mailRequest().rebuild(email));
//                    sendResult.thenAccept(re -> {
//                        System.out.println("Sent message=[" + logData + "] to with offset=[" + re.getRecordMetadata().offset() + "]");
//                    }).exceptionally(e -> {
//                        System.out.println("Unable to send message=[" + logData + "] due to : " + e.getMessage());
//                        return null;
//                    });
//                }
            } catch (Exception e) {
                System.out.println("ERROR :  " + e.getMessage());
            }
        }
    }

}
