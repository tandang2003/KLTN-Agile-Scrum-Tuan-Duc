package com.kltn.server.config.websocket;

import com.kltn.server.config.security.LoadUserService;
import com.kltn.server.model.entity.User;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

  private final LoadUserService loadUserService;
  private final JwtDecoder jwtDecoder;

  public WebSocketAuthInterceptor(LoadUserService loadUserService, JwtDecoder jwtDecoder) {
    this.loadUserService = loadUserService;
    this.jwtDecoder = jwtDecoder;
  }

  @Override
  public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
    System.out.println("Channel Inbound after send complete");
    ChannelInterceptor.super.afterSendCompletion(message, channel, sent, ex);
  }

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    System.out.println("Channel Inbound pre send");

    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
      String token = accessor.getFirstNativeHeader("Authorization");
      if (token != null && token.startsWith("Bearer ")) {
        System.out.println("token" + token);
        token = token.substring(7);
        String uniId = jwtDecoder.decode(token)
                                 .getClaim("uniId");
        UserDetails userDetails = this.loadUserService.loadUserByUsername(uniId);
        UserPrinciple user = new UserPrinciple(((User) userDetails).getUniId());
        // set attr in here
        Objects.requireNonNull(accessor.getSessionAttributes())
               .put("key", "value");

        // set user to use @SendToUser
        accessor.setUser(user);
      }
    }
    return ChannelInterceptor.super.preSend(message, channel);
  }

  @Override
  public void postSend(Message<?> message, MessageChannel channel, boolean sent) {
    System.out.println("Channel Inbound post send");
    ChannelInterceptor.super.postSend(message, channel, sent);
  }

  @Override
  public boolean preReceive(MessageChannel channel) {
    System.out.println("Channel Inbound pre receive");
    return ChannelInterceptor.super.preReceive(channel);
  }

  @Override
  public Message<?> postReceive(Message<?> message, MessageChannel channel) {
    System.out.println("Channel Inbound post receive");
    return ChannelInterceptor.super.postReceive(message, channel);
  }

  @Override
  public void afterReceiveCompletion(Message<?> message, MessageChannel channel, Exception ex) {
    System.out.println("Channel Inbound after receive complete");
    ChannelInterceptor.super.afterReceiveCompletion(message, channel, ex);
  }
}
