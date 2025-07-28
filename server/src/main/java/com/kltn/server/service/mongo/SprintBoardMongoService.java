package com.kltn.server.service.mongo;

import com.kltn.server.model.collection.Project;
import com.kltn.server.model.collection.SprintBoard;
import com.kltn.server.model.type.task.IssueStatus;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SprintBoardMongoService {
  private MongoTemplate mongoTemplate;

  public SprintBoardMongoService(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  // Use for move backlog to sprint
  public void addIssue(String projectId, String sprintId, String issueId) {
    // Build the MongoDB query: match by nk_project_id
    Query query = new Query(Criteria.where("nk_project_id").is(projectId));

    // Build the update path: position.sprintId.TODO
    String updatePath = String.format("position.%s.TODO", sprintId);

    // Use addToSet to avoid duplicates (use push() if you allow duplicates)
    Update update = new Update().addToSet(updatePath, issueId);

    // Perform the update
    mongoTemplate.updateFirst(query, update, Project.class);
  }

  public void deleteIssue(String projectId, String sprintId, String issueId, IssueStatus status) {
    Query query = new Query(Criteria.where("nk_project_id").is(projectId));

    // Build dynamic path based on status
    String statusField = status.name(); // Assumes enum names are "TODO", "INPROCESS", etc.
    String updatePath = String.format("position.%s.%s", sprintId, statusField);

    Update update = new Update().pull(updatePath, issueId);

    mongoTemplate.updateFirst(query, update, Project.class);
  }

  public void addPositionToProject(String projectId, List<String> sprintIds) {
    Query query = new Query(Criteria.where("nk_project_id").is(projectId));
    Update update = new Update();

    for (String sprintId : sprintIds) {
      String basePath = String.format("position.%s", sprintId);
      update.set(basePath + ".TODO", new ArrayList<>());
      update.set(basePath + ".INPROCESS", new ArrayList<String>());
      update.set(basePath + ".REVIEW", new ArrayList<String>());
      update.set(basePath + ".DONE", new ArrayList<String>());
    }

    mongoTemplate.updateFirst(query, update, Project.class);
  }

  public void addPositionToSprint(String sprintId, String[] projectIds){
    // ✅ Query projects with nk_project_id in provided array
    Query query = new Query(Criteria.where("nk_project_id").in(projectIds));

    // ✅ Create an empty SprintBoard
    SprintBoard emptySprint = new SprintBoard();

    // ✅ Construct update path like "position.sprint123"
    String updatePath = String.format("position.%s", sprintId);

    // ✅ Set the value for that sprint ID in 'position' to the empty SprintBoard
    Update update = new Update().set(updatePath, emptySprint);

    // ✅ Apply the update to all matched projects
    mongoTemplate.updateMulti(query, update, Project.class);
  }
}
