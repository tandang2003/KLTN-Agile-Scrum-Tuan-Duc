package com.kltn.server.config.properties;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    Security security;

    public Security getSecurity() {
        return this.security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public static class Security {
        private List<String> whiteList;

        public List<String> getWhiteList() {
            return whiteList;
        }

        public void setWhiteList(List<String> whiteList) {
            this.whiteList = whiteList;
        }
    }
}
