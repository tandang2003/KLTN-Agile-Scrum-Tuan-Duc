package com.kltn.server.config;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.entity.Role;
import com.kltn.server.repository.entity.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RoleInit {
    private Map<String, Role> roles;
    private RoleRepository roleRepository;

    private RoleInit() {
        roles = new ConcurrentHashMap<>();
    }

    @Autowired
    public RoleInit(RoleRepository roleRepository) {
        this();
        this.roleRepository = roleRepository;
    }

    public Role getRole(String roleName) {
        if (roles.containsKey(roleName)) {
            return roles.get(roleName);
        }
        Role role = roleRepository.getByName(roleName).orElseThrow(() -> AppException.builder().error(Error.SERVER_ERROR).build());
        roles.put(roleName, role);
        return role;
    }

}
