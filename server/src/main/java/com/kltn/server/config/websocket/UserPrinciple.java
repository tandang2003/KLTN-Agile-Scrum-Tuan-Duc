package com.kltn.server.config.websocket;

import java.security.Principal;

public class UserPrinciple implements Principal {
    String uniId;

    public String getUniId() {
        return uniId;
    }

    public void setUniId(String uniId) {
        this.uniId = uniId;
    }

    public UserPrinciple(String uniId) {
        this.uniId = uniId;
    }

    @Override
    public String getName() {
        return this.uniId;
    }
}
