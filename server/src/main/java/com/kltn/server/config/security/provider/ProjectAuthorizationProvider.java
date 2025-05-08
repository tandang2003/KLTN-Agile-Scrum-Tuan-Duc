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
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Set;
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
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof ProjectAuthorizationToken) {
            ProjectAuthorizationToken projectAuthorizationToken = (ProjectAuthorizationToken) authentication;
            String uniId = projectAuthorizationToken.getAuthentication().getPrincipal().toString();
            if (!Objects.equals(uniId, projectAuthorizationToken.getToken().getClaimAsString("userId"))) {
                throw new MyAuthenticationException(AuthenticationError.INVALID_CREDENTIALS);
            }

            List<String> roles = projectAuthorizationToken.getToken().getClaimAsStringList("authorities");
            Set<GrantedAuthority> roleAuthorities = roles.stream()
                    .map(SimpleGrantedAuthority::new) // Prefix "ROLE_"
                    .collect(Collectors.toSet());
            roleAuthorities.addAll(authentication.getAuthorities());
//            UsernamePasswordAuthenticationToken token =
//            token.setDetails(projectAuthorizationToken.getDetails());
//            SecurityContextHolder.getContext().setAuthentication(token);
            return  new UsernamePasswordAuthenticationToken(projectAuthorizationToken.getAuthentication().getPrincipal(), null, roleAuthorities);
        }
        throw MyAuthenticationException.builder().error(AuthenticationError.INVALID_CREDENTIALS).build();
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(ProjectAuthorizationToken.class);
    }


//    private boolean isValidToken(Authentication authentication) {
//        if (authentication instanceof ProjectAuthorizationToken) {
//            ProjectAuthorizationToken projectAuthorizationToken = (ProjectAuthorizationToken) authentication;
//            String uniId = projectAuthorizationToken.getToken().getClaimAsString("uniId");
//            User userDetails = userRepository.findByUniId(uniId).orElseThrow(() ->
//                    new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE));
//            Project project = projectRepository.findById(projectAuthorizationToken.getToken().getClaimAsString("projectId")).orElseThrow(() ->
//                    new MyAuthenticationException(AuthenticationError.AUTHENTICATED_FAILURE));
//            if (userDetails.getRole().equals(roleInit.getRole(RoleType.TEACHER.getName()))) {
//
//            }
////            return Objects.equals(userDetails.getId(), project.get().getId()) && Objects.equals(userDetails.getId(), projectAuthorizationToken.getToken().getClaimAsString("userId"));
//
////            return Objects.equals(userDetails.getId(), projectAuthorizationToken.getToken().getClaimAsString("userId"));
//        }
//        return false;
//    }
}
