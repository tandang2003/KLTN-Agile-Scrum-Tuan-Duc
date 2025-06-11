package com.kltn.server.service.mongo;

import org.bson.Document;

import com.fasterxml.jackson.databind.JsonNode;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Project;
import com.kltn.server.repository.document.ProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectMongoService {
    private ProjectMongoRepository projectMongoRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public ProjectMongoService(ProjectMongoRepository projectMongoRepository, MongoTemplate mongoTemplate) {
        this.projectMongoRepository = projectMongoRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Project save(Project project) {
        try {
            return projectMongoRepository.save(project);
        } catch (Exception e) {
            throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
        }
    }

    public Project getByNkProjectId(String id) {
        return projectMongoRepository.findByNkProjectId(id).orElseThrow(() ->
                AppException.builder().error(Error.NOT_FOUND_PROJECT).build());
    }

    public Object getPosition(String id) {
        Query query = new Query(Criteria.where("nk_project_id").is(id));
        // only include the 'position' field in the result
        query.fields().include("position").exclude("_id");

        Document doc = mongoTemplate.findOne(query, Document.class, "project");
        if (doc != null && doc.containsKey("position")) {
            return Optional.of(doc.get("position"));
        }
        return Optional.empty();
    }

    public void savePosition(String id, JsonNode payload) {
        Document positionDoc = Document.parse(payload.toString());

        Query query = new Query(Criteria.where("nk_project_id").is(id));
        Update update = new Update().set("position", positionDoc);
        mongoTemplate.updateFirst(query, update, "project");

    }
}
