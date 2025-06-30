package com.kltn.server.service.entity;

import com.kltn.server.model.entity.embeddedKey.UserCourseRelationId;
import com.kltn.server.model.entity.relationship.UserCourseRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface UserCourseRelationRepository extends JpaRepository<UserCourseRelation, UserCourseRelationId> {
}
