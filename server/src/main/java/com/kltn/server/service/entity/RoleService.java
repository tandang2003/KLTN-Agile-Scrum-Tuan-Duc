package com.kltn.server.service.entity;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.model.entity.Role;
import com.kltn.server.repository.entity.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private Map<String, Role> roles;
    private RoleRepository roleRepository;

    private RoleService() {
        roles = new ConcurrentHashMap<>();
    }

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this();
        this.roleRepository = roleRepository;
    }

    public Role getRole(String roleName) {
        if (roles.containsKey(roleName)) {
            return roles.get(roleName);
        }
        Role role = roleRepository.getByName(roleName).orElseThrow(() -> AppException.builder().error(Error.DB_SERVER_MISSING_DATA).build());
        roles.put(roleName, role);
        return role;
    }

    public Collection<GrantedAuthority> mapPermissionsToAuthorities(Role role) {
        List<GrantedAuthority> permissions = role.getPermissions().stream()
                .map(p -> new SimpleGrantedAuthority(p.getName()))
                .collect(Collectors.toList());

        permissions.add(new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
        return permissions;
    }
}
