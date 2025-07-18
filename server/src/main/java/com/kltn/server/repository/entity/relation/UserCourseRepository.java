package com.kltn.server.repository.entity.relation;

import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourseRelation, UserCourseRelationId> {

}
