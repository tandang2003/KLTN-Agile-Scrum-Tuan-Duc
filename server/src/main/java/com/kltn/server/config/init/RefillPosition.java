package com.kltn.server.config.init;

import com.kltn.server.model.collection.Project;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.service.mongo.SprintBoardMongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//@Configuration
public class RefillPosition implements CommandLineRunner {
  @Autowired
  private ProjectRepository repo;
  @Autowired
  private SprintBoardMongoService sprintBoardService;
  @Autowired
  private MongoTemplate mongoTemplate;


  @Override
  @Transactional
  public void run(String... args) throws Exception {
    List<Project> projects =  findProjectsWithoutPosition();
    int count = 0;
    for (Project pro : projects){
      var projectId = pro.getNkProjectId();
      var project = repo.findById(projectId).get();
      sprintBoardService.addPositionToProject(projectId, project.getSprints().stream().map(item -> item.getId()).toList());
      System.out.println("Sprint boards refilled.");
      ++count;
    }
    System.out.println(count);
  }
  public List<Project> findProjectsWithoutPosition() {
    Query query = new Query(Criteria.where("position").exists(false));
    return mongoTemplate.find(query, Project.class);
  }

}
