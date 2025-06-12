package com.kltn.server.model.collection.model;

import com.kltn.server.model.collection.Issue;
import com.kltn.server.model.type.task.IssueRelationType;
import org.bson.types.ObjectId;

public class Relation<T> {
  private ObjectId id;
  private T related;
  private IssueRelationType relationType;


  public Relation() {
    id = new ObjectId();
  }

  private Relation(RelationBuilder<T> builder) {
    this();
    this.related = builder.related;
    this.relationType = builder.relationType;
  }

  public static <T> RelationBuilder<T> builder() {
    return new RelationBuilder<>();
  }

  public static class RelationBuilder<T> {
    private T related;
    private IssueRelationType relationType;


    public RelationBuilder<T> related(T related) {
      this.related = related;
      return this;
    }

    public RelationBuilder<T> relationType(IssueRelationType relationType) {
      this.relationType = relationType;
      return this;
    }

    public Relation<T> build() {
      return new Relation<>(this);
    }
  }

  public ObjectId getId() {
    return id;
  }

  public void setId(ObjectId id) {
    this.id = id;
  }

  public T getRelated() {
    return related;
  }

  public void setRelated(T related) {
    this.related = related;
  }
}
