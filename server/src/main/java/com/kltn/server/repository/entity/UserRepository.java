package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findAllByUniId(String uniId);

    Optional<User> findByUniId(String uniId);
}
