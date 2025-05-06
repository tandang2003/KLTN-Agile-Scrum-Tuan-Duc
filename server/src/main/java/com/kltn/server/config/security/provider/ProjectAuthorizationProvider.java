package com.kltn.server.config.security.provider;

import com.kltn.server.config.RoleInit;
import com.kltn.server.config.security.LoadUserService;
import com.kltn.server.config.security.exception.AuthenticationError;
import com.kltn.server.config.security.exception.MyAuthenticationException;
import com.kltn.server.config.security.token.ProjectAuthorizationToken;
import com.kltn.server.model.entity.Project;
import com.kltn.server.model.entity.User;
import com.kltn.server.repository.entity.ProjectRepository;
import com.kltn.server.repository.entity.UserRepository;
import com.kltn.server.util.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ProjectAuthorizationProvider implements AuthenticationProvider {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private RoleInit roleInit;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof ProjectAuthorizationToken) {
            ProjectAuthorizationToken projectAuthorizationToken = (ProjectAuthorizationToken) authentication;
            String uniId = authentication.getPrincipal().toString();
            if (!Objects.equals(uniId, projectAuthorizationToken.getToken().getClaimAsString("userId"))) {
                throw new MyAuthenticationException(AuthenticationError.INVALID_CREDENTIALS);
            }
            List<String> roles = projectAuthorizationToken.getToken().getClaimAsStringList("authorities");
            List<GrantedAuthority> roleAuthorities = roles.stream()
                    .map(SimpleGrantedAuthority::new) // Prefix "ROLE_"
                    .collect(Collectors.toList());
            roleAuthorities.addAll(authentication.getAuthorities());
            return new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), roleAuthorities);
        }
        throw MyAuthenticationException.builder().error(AuthenticationError.INVALID_CREDENTIALS).build();
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(ProjectAuthorizationToken.class);
    }


    private boolean isValidToken(Authentication authentication) {
        if (authentication instanceof ProjectAuthorizationToken) {
            ProjectAuthorizationToken projectAuthorizationToken = (ProjectAuthorizationToken) authentication;
            String uniId = projectAuthorizationToken.getToken().getClaimAsString("uniId");
            User userDetails = userRepository.findByUniId(uniId).orElseThrow(() ->
                    new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE));
            Project project = projectRepository.findById(projectAuthorizationToken.getToken().getClaimAsString("projectId")).orElseThrow(() ->
                    new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE));
            if (userDetails.getRole().equals(roleInit.getRole(RoleType.TEACHER.getName()))) {

            }
//            return Objects.equals(userDetails.getId(), project.get().getId()) && Objects.equals(userDetails.getId(), projectAuthorizationToken.getToken().getClaimAsString("userId"));

//            return Objects.equals(userDetails.getId(), projectAuthorizationToken.getToken().getClaimAsString("userId"));
        }
        return false;
    }
}
