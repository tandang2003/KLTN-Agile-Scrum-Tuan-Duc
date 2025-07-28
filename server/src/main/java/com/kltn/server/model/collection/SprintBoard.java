package com.kltn.server.model.collection;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE, setterVisibility = JsonAutoDetect.Visibility.NONE)
public class SprintBoard {
  @Field("TODO")
  @JsonProperty("TODO")
  private List<String> TODO;
  @Field("INPROCESS")
  @JsonProperty("INPROCESS")
  private List<String> INPROCESS;
  @Field("REVIEW")
  @JsonProperty("REVIEW")
  private List<String> REVIEW;
  @Field("DONE")
  @JsonProperty("DONE")
  private List<String> DONE;

  public SprintBoard() {
    this.TODO = new ArrayList<>();
    this.INPROCESS = new ArrayList<>();
    this.REVIEW = new ArrayList<>();
    this.DONE = new ArrayList<>();
  }

  private SprintBoard(Builder builder) {
    this.TODO = builder.TODO;
    this.INPROCESS = builder.INPROCESS;
    this.REVIEW = builder.REVIEW;
    this.DONE = builder.DONE;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private List<String> TODO = new ArrayList<>();
    private List<String> INPROCESS = new ArrayList<>();
    private List<String> REVIEW = new ArrayList<>();
    private List<String> DONE = new ArrayList<>();

    public Builder TODO(List<String> TODO) {
      this.TODO = TODO;
      return this;
    }

    public Builder INPROCESS(List<String> INPROCESS) {
      this.INPROCESS = INPROCESS;
      return this;
    }

    public Builder REVIEW(List<String> REVIEW) {
      this.REVIEW = REVIEW;
      return this;
    }

    public Builder DONE(List<String> DONE) {
      this.DONE = DONE;
      return this;
    }

    public SprintBoard build() {
      return new SprintBoard(this);
    }
  }

  // Getters (optional)
  public List<String> getTODO() {
    return TODO;
  }

  public List<String> getINPROCESS() {
    return INPROCESS;
  }

  public List<String> getREVIEW() {
    return REVIEW;
  }

  public List<String> getDONE() {
    return DONE;
  }

  public void setTODO(List<String> TODO) {
    this.TODO = TODO;
  }

  public void setINPROCESS(List<String> INPROCESS) {
    this.INPROCESS = INPROCESS;
  }

  public void setREVIEW(List<String> REVIEW) {
    this.REVIEW = REVIEW;
  }

  public void setDONE(List<String> DONE) {
    this.DONE = DONE;
  }

}
