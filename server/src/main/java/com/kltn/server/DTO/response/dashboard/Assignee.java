package com.kltn.server.DTO.response.dashboard;

public  class Assignee {
  private String uniId;
  private String name;

  private Assignee() {
  }

  public static AssigneeBuilder builder() {
    return new AssigneeBuilder();
  }

  public static class AssigneeBuilder {
    private final Assignee instance = new Assignee();

    public AssigneeBuilder uniId(String uniId) {
      instance.uniId = uniId;
      return this;
    }

    public AssigneeBuilder name(String name) {
      instance.name = name;
      return this;
    }

    public Assignee build() {
      return instance;
    }
  }


  public String getUniId() {
    return uniId;
  }

  public String getName() {
    return name;
  }
}

