package com.kltn.server.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationProps {
    private List<String> whitelist;
    private List<String> react;

    public void setWhitelist(List<String> whitelist) {
        this.whitelist = whitelist;
    }

    public List<String> getWhitelist() {
        return whitelist;
    }

  public List<String> getReact() {
    return react;
  }

  public void setReact(List<String> react) {
    this.react = react;
  }
}