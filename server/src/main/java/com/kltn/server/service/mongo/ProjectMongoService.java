package com.kltn.server.service.mongo;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Project;
import com.kltn.server.repository.document.ProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectMongoService {
    private ProjectMongoRepository projectMongoRepository;

    @Autowired
    public ProjectMongoService(ProjectMongoRepository projectMongoRepository) {
        this.projectMongoRepository = projectMongoRepository;
    }

    public Project save(Project project) {
        try {
            return projectMongoRepository.save(project);
        } catch (Exception e) {
            throw AppException.builder().error(Error.SERVER_ERROR).build();
        }
    }

    public Project getByNkProjectId(String id) {
        return projectMongoRepository.findByNkProjectId(id).orElseThrow(() ->
                AppException.builder().error(Error.NOT_FOUND_PROJECT).build());
    }
}
