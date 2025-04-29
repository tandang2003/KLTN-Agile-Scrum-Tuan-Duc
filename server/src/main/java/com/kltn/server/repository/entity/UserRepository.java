package com.kltn.server.repository.entity;

import com.kltn.server.model.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>, PagingAndSortingRepository<User, String> {
    Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "id");

    Optional<User> findAllByUniId(String uniId);

    Optional<User> findByUniId(String uniId);

    Optional<User> findByEmail(String email);


}
