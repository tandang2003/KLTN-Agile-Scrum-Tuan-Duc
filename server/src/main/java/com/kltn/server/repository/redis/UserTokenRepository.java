package com.kltn.server.repository.redis;

import com.kltn.server.model.redis.UserToken;
import org.springframework.data.repository.CrudRepository;
public interface UserTokenRepository extends CrudRepository<UserToken, String> {


}
