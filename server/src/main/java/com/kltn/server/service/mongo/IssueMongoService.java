package com.kltn.server.service.mongo;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.repository.document.IssueLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueMongoService {
    private IssueLogRepository issueLogRepository;

    @Autowired
    public IssueMongoService(IssueLogRepository issueLogRepository) {
        this.issueLogRepository = issueLogRepository;
    }

    public Issue save(Issue issue) {
        var taskSaved = issueLogRepository.save(issue);
        if (taskSaved == null || taskSaved.getId() == null)
            throw AppException.builder().error(Error.SERVER_ERROR).build();
        return taskSaved;
    }
}
