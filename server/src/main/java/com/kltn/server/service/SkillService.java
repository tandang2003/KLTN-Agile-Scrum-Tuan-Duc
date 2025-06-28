package com.kltn.server.service;

import com.kltn.server.DTO.response.ApiResponse;
import com.kltn.server.DTO.response.skill.PersonalSkillResponse;
import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import com.kltn.server.mapper.entity.SkillMapper;
import com.kltn.server.model.entity.Skill;
import com.kltn.server.model.entity.User;
import com.kltn.server.model.entity.embeddedKey.PersonalSkillId;
import com.kltn.server.model.entity.relationship.PersonalSkill;
import com.kltn.server.repository.entity.SkillRepository;
import com.kltn.server.repository.entity.relation.PersonalSkillRepository;
import com.kltn.server.service.entity.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

  private final UserService userService;
  private final PersonalSkillRepository personalSkillRepository;
  private final SkillMapper skillMapper;
  private SkillRepository skillRepository;

  @Autowired
  public SkillService(SkillRepository skillRepository, UserService userService,
      PersonalSkillRepository personalSkillRepository, SkillMapper skillMapper) {
    this.skillRepository = skillRepository;
    this.userService = userService;
    this.personalSkillRepository = personalSkillRepository;
    this.skillMapper = skillMapper;
  }

  public ApiResponse<Void> createSkill(String skillName, int proficiency) {
    User user = userService.getCurrentUser();
    Skill skill;
    if (!skillRepository.existsByName(skillName)) {
      skill = Skill.builder()
          .name(skillName)
          .build();
      skill = skillRepository.save(skill);
    } else {
      skill = skillRepository.findByName((skillName))
          .orElseThrow(() -> AppException.builder()
              .error(Error.SKILL_NOT_FOUND)
              .build());
    }
    PersonalSkill personalSkill = PersonalSkill.builder()
        .id(PersonalSkillId.builder()
            .skillId(skill.getId())
            .personalId(user.getId())
            .build())
        .user(user)
        .skill(skill)
        .proficiency(proficiency)
        .build();
    personalSkillRepository.save(personalSkill);
    return ApiResponse.<Void>builder()
        .code(HttpStatus.CREATED.value())
        .message("Skill created successfully")
        .build();
  }

  public ApiResponse<Void> deleteSkill(String skillName) {
    User user = userService.getCurrentUser();
    Skill skill = skillRepository.findByName(skillName)
        .orElseThrow(() -> AppException.builder()
            .error(Error.SKILL_NOT_FOUND)
            .build());
    PersonalSkill personalSkill = PersonalSkill.builder()
        .id(PersonalSkillId.builder()
            .skillId(skill.getId())
            .personalId(user.getId())
            .build())
        .user(user)
        .skill(skill)
        .build();
    personalSkill = personalSkillRepository.findById(personalSkill.getId())
        .orElseThrow(() -> AppException.builder()
            .error(Error.PERSONAL_SKILL_NOT_FOUND)
            .build());
    personalSkillRepository.delete(personalSkill);
    return ApiResponse.<Void>builder()
        .code(HttpStatus.OK.value())
        .message("Skill deleted successfully")
        .build();
  }

  public ApiResponse<PersonalSkillResponse> updateSkill(String skillName, int proficiency) {
    User user = userService.getCurrentUser();
    Skill skill = skillRepository.findByName(skillName)
        .orElseThrow(() -> AppException.builder()
            .error(Error.SKILL_NOT_FOUND)
            .build());
    PersonalSkill personalSkill = PersonalSkill.builder()
        .id(PersonalSkillId.builder()
            .skillId(skill.getId())
            .personalId(user.getId())
            .build())
        .user(user)
        .skill(skill)
        .build();
    personalSkill = personalSkillRepository.findById(personalSkill.getId())
        .orElseThrow(() -> AppException.builder()
            .error(Error.PERSONAL_SKILL_NOT_FOUND)
            .build());
    personalSkill.setProficiency(proficiency);
    personalSkillRepository.save(personalSkill);
    return ApiResponse.<PersonalSkillResponse>builder()
        .code(HttpStatus.OK.value())
        .message("Skill updated successfully")
        .data(skillMapper.toPersonalSkillResponse(personalSkill))
        .build();
  }

  public ApiResponse<List<PersonalSkillResponse>> getSkillsPersonal() {
    User user = userService.getCurrentUser();
    List<PersonalSkill> personalSkills = personalSkillRepository.findByUser(user)
        .orElseThrow(() -> AppException.builder()
            .error(
                Error.PERSONAL_SKILL_NOT_FOUND)
            .build());
    return ApiResponse.<List<PersonalSkillResponse>>builder()
        .code(HttpStatus.OK.value())
        .message("Skills retrieved successfully")
        .data(skillMapper.toListPersonalSkillResponse(personalSkills))
        .build();
  }

  public ApiResponse<List<String>> getSkills() {
    List<String> skills = skillRepository.findAll().stream().map(Skill::getName).toList();
    return ApiResponse.<List<String>>builder()
        .code(HttpStatus.OK.value())
        .message("All Skills")
        .data(skills)
        .build();
  }
}
