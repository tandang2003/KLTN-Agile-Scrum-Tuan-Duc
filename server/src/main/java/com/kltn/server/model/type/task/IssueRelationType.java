package com.kltn.server.model.type.task;

public enum IssueRelationType {
  BLOCKS("blocks"),
  IS_BLOCKED_BY("is blocked by"),
  RELATES_TO("relates to"),
  IS_RELATED_TO("is related to"),
  DEPENDS_ON("depends on"),
  IS_DEPENDED_ON_BY("is depended on by"),
  SUPERSEDES("supersedes"),
  IS_SUPERSEDED_BY("is superseded by"),
  DUPLICATES("duplicates"),
  IS_DUPLICATED_BY("is duplicated by");

  public static IssueRelationType fromValue(String value) {
    value = value.toUpperCase();
    for (IssueRelationType type : IssueRelationType.values()) {
      if (type.name().equals(value)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Unknown value: " + value);
  }

  public String getName() {
    return this.name();
  }

  private final String value;

  IssueRelationType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

}
