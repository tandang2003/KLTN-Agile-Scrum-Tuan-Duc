-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('e79e184d-0874-11f0-91a0-0242ac120002', 'manage_roles');
INSERT INTO `permissions` VALUES ('e79e70d0-0874-11f0-91a0-0242ac120002', 'create_account');
INSERT INTO `permissions` VALUES ('e79e7242-0874-11f0-91a0-0242ac120002', 'update_account');
INSERT INTO `permissions` VALUES ('e79e72a7-0874-11f0-91a0-0242ac120002', 'deactivate_account');
INSERT INTO `permissions` VALUES ('e79e72d7-0874-11f0-91a0-0242ac120002', 'delete_account');
INSERT INTO `permissions` VALUES ('e79e72ff-0874-11f0-91a0-0242ac120002', 'assign_role');
INSERT INTO `permissions` VALUES ('e79e7327-0874-11f0-91a0-0242ac120002', 'remove_role');
INSERT INTO `permissions` VALUES ('e79e734c-0874-11f0-91a0-0242ac120002', 'create_workspace');
INSERT INTO `permissions` VALUES ('e79e7378-0874-11f0-91a0-0242ac120002', 'update_workspace');
INSERT INTO `permissions` VALUES ('e79e739e-0874-11f0-91a0-0242ac120002', 'deactivate_workspace');
INSERT INTO `permissions` VALUES ('e79e73c1-0874-11f0-91a0-0242ac120002', 'delete_workspace');
INSERT INTO `permissions` VALUES ('e79e73e3-0874-11f0-91a0-0242ac120002', 'manage_workspace_members');
INSERT INTO `permissions` VALUES ('e79e7408-0874-11f0-91a0-0242ac120002', 'create_project');
INSERT INTO `permissions` VALUES ('e79e742d-0874-11f0-91a0-0242ac120002', 'update_project');
INSERT INTO `permissions` VALUES ('e79e7bea-0874-11f0-91a0-0242ac120002', 'delete_project');
INSERT INTO `permissions` VALUES ('e79e7c2a-0874-11f0-91a0-0242ac120002', 'archive_project');
INSERT INTO `permissions` VALUES ('e79e7c52-0874-11f0-91a0-0242ac120002', 'assign_project_members');
INSERT INTO `permissions` VALUES ('e79e7c75-0874-11f0-91a0-0242ac120002', 'remove_project_members');
INSERT INTO `permissions` VALUES ('e79e7c9b-0874-11f0-91a0-0242ac120002', 'create_sprint');
INSERT INTO `permissions` VALUES ('e79e7cc2-0874-11f0-91a0-0242ac120002', 'update_sprint');
INSERT INTO `permissions` VALUES ('e79e7ce5-0874-11f0-91a0-0242ac120002', 'delete_sprint');
INSERT INTO `permissions` VALUES ('e79e7d08-0874-11f0-91a0-0242ac120002', 'start_sprint');
INSERT INTO `permissions` VALUES ('e79e7d29-0874-11f0-91a0-0242ac120002', 'complete_sprint');
INSERT INTO `permissions` VALUES ('e79e7d4a-0874-11f0-91a0-0242ac120002', 'sprint_backlog');
INSERT INTO `permissions` VALUES ('e79e7d6e-0874-11f0-91a0-0242ac120002', 'sprint_retrospect');
INSERT INTO `permissions` VALUES ('e79e7d93-0874-11f0-91a0-0242ac120002', 'create_task');
INSERT INTO `permissions` VALUES ('e79e7db5-0874-11f0-91a0-0242ac120002', 'update_task');
INSERT INTO `permissions` VALUES ('e79e7dd9-0874-11f0-91a0-0242ac120002', 'delete_task');
INSERT INTO `permissions` VALUES ('e79e7df9-0874-11f0-91a0-0242ac120002', 'assign_task');
INSERT INTO `permissions` VALUES ('e79e7e18-0874-11f0-91a0-0242ac120002', 'change_task_status');
INSERT INTO `permissions` VALUES ('e79e7e3a-0874-11f0-91a0-0242ac120002', 'estimate_task_effort');
INSERT INTO `permissions` VALUES ('e79e7e5d-0874-11f0-91a0-0242ac120002', 'view_student_progress');
INSERT INTO `permissions` VALUES ('e79e7e81-0874-11f0-91a0-0242ac120002', 'evaluate_project');
INSERT INTO `permissions` VALUES ('e79e7ea4-0874-11f0-91a0-0242ac120002', 'import_sprint_backlog');
INSERT INTO `permissions` VALUES ('e79e7ec6-0874-11f0-91a0-0242ac120002', 'download_sprint_backlog');
INSERT INTO `permissions` VALUES ('e79e7ee9-0874-11f0-91a0-0242ac120002', 'audit_logs');
INSERT INTO `permissions` VALUES ('e79e7f0b-0874-11f0-91a0-0242ac120002', 'view_sprint_report');

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'Quản trị hệ thống', 'f7b59d23-0874-11f0-91a0-0242ac120002', NULL, 'admin');
INSERT INTO `roles` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'Giáo viên hướng dẫn', 'f7b5f76b-0874-11f0-91a0-0242ac120002', NULL, 'teacher');
INSERT INTO `roles` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'Trưởng nhóm', 'f7b5f8f8-0874-11f0-91a0-0242ac120002', NULL, 'leader');
INSERT INTO `roles` VALUES (NULL, NULL, NULL, NULL, NULL, NULL, 'Sinh viên', 'f7b5f96a-0874-11f0-91a0-0242ac120002', NULL, 'student');

-- ----------------------------
-- Records of roles_permissions
-- ----------------------------
INSERT INTO `roles_permissions` VALUES ('e79e184d-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e70d0-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7242-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e72a7-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e72d7-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e72ff-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7327-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7378-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ce5-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e5d-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e81-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ec6-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ee9-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7f0b-0874-11f0-91a0-0242ac120002', 'f7b59d23-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e734c-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7378-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e739e-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e73e3-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7c9b-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7cc2-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ce5-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d08-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e3a-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e5d-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e81-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ec6-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7f0b-0874-11f0-91a0-0242ac120002', 'f7b5f76b-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e742d-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7bea-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7c52-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7c75-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d08-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d29-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d4a-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d6e-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d93-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7db5-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7dd9-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7df9-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e18-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7ea4-0874-11f0-91a0-0242ac120002', 'f7b5f8f8-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7408-0874-11f0-91a0-0242ac120002', 'f7b5f96a-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7d93-0874-11f0-91a0-0242ac120002', 'f7b5f96a-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7db5-0874-11f0-91a0-0242ac120002', 'f7b5f96a-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7df9-0874-11f0-91a0-0242ac120002', 'f7b5f96a-0874-11f0-91a0-0242ac120002');
INSERT INTO `roles_permissions` VALUES ('e79e7e18-0874-11f0-91a0-0242ac120002', 'f7b5f96a-0874-11f0-91a0-0242ac120002');
