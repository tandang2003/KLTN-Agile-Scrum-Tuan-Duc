package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


public interface SprintRepository extends JpaRepository<Sprint, String> {
    List<Sprint> findAllByWorkspaceId(String workspaceId);

    List<Sprint> findAllByDtEndAfter(Instant instant);

    List<Sprint> findAllByDtStartAfterAndDtEndBefore(Instant dtStartAfter, Instant dtEndBefore);

  List<Sprint> getAllByCreatedByAfter(String createdByAfter);

  List<Sprint> getAllByDtCreatedAfter(Instant dtCreatedAfter);

    boolean findByIdAndDtEndAfter(String id, Instant dtEndAfter);

  boolean existsByIdAndDtEndAfter(String id, Instant dtEndAfter);

  Sprint getSprintsById(String id);

  Optional<Sprint>findById(String id);

  List<Sprint> findALlByDtPredictAfter(Instant dtPredictAfter);
}
