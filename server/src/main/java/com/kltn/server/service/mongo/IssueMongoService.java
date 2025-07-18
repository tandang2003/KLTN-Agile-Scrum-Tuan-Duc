package com.kltn.server.service.mongo;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.collection.Issue;
import com.kltn.server.repository.document.IssueLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IssueMongoService {
  private IssueLogRepository issueLogRepository;

  @Autowired
  public IssueMongoService(IssueLogRepository issueLogRepository) {
    this.issueLogRepository = issueLogRepository;
  }

  @Transactional
  public Issue save(Issue issue) {
    var taskSaved = issueLogRepository.save(issue);
    if (taskSaved == null || taskSaved.getId() == null)
      throw AppException.builder().error(Error.DB_SERVER_ERROR).build();
    return taskSaved;
  }

  public Issue getById(String id) {
    return issueLogRepository.findByNkTaskId(id).orElseThrow(() ->
      AppException.builder().error(Error.NOT_FOUND).message("Task not found").build());
  }

  public List<Issue> getById(List<String> ids) {
    var ln = issueLogRepository.findByNkTaskIdIn(ids);
    if (ln == null || ln.isEmpty() || ln.contains(null))
      throw AppException.builder().error(Error.NOT_FOUND).message("Task not found").build();
    return ln;
  }

  public Issue saveDocument(Issue taskMongo) {
    return issueLogRepository.save(taskMongo);
  }

  public void delete(String id) {
    issueLogRepository.delete(getById(id));
  }
}
