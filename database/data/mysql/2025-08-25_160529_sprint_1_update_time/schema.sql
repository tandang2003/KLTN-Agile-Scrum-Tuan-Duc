-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: kltn_demo
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `have_model` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_relation`
--

DROP TABLE IF EXISTS `course_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_relation` (
  `dependent_course_id` varchar(255) NOT NULL,
  `prerequisite_course_id` varchar(255) NOT NULL,
  PRIMARY KEY (`dependent_course_id`,`prerequisite_course_id`),
  KEY `FKcvgwhpow44qh29xj7uno4810s` (`prerequisite_course_id`),
  CONSTRAINT `FKcvgwhpow44qh29xj7uno4810s` FOREIGN KEY (`prerequisite_course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKmbae9jjfy3em73u1sht25g368` FOREIGN KEY (`dependent_course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issue_relation`
--

DROP TABLE IF EXISTS `issue_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_relation` (
  `type_relation` enum('BLOCKS','DEPENDS_ON','DUPLICATES','IS_BLOCKED_BY','IS_DEPENDED_ON_BY','IS_DUPLICATED_BY','IS_RELATED_TO','IS_SUPERSEDED_BY','RELATES_TO','SUPERSEDES') DEFAULT NULL,
  `issue_id` varchar(255) NOT NULL,
  `issue_related_id` varchar(255) NOT NULL,
  PRIMARY KEY (`issue_id`,`issue_related_id`),
  KEY `FKm4fy0yjvp5abw68qdtkbkm6qg` (`issue_related_id`),
  CONSTRAINT `FK2j5dsih6bgdu7h2ycsyhpsuaj` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`),
  CONSTRAINT `FKm4fy0yjvp5abw68qdtkbkm6qg` FOREIGN KEY (`issue_related_id`) REFERENCES `issues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issue_resources`
--

DROP TABLE IF EXISTS `issue_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_resources` (
  `issue_id` varchar(255) NOT NULL,
  `resource_id` varchar(255) NOT NULL,
  KEY `FK35j55w2inbg0wnw0vnaplxmdg` (`resource_id`),
  KEY `FKe4hjjsnwrvamiocsmeuodgueh` (`issue_id`),
  CONSTRAINT `FK35j55w2inbg0wnw0vnaplxmdg` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`id`),
  CONSTRAINT `FKe4hjjsnwrvamiocsmeuodgueh` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `commplex_of_description` int DEFAULT NULL,
  `description` longtext,
  `dt_end` datetime(6) DEFAULT NULL,
  `dt_planning` datetime(6) DEFAULT NULL,
  `dt_start` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `num_changing_of_description` int DEFAULT NULL,
  `num_changing_of_priority` int DEFAULT NULL,
  `open` bit(1) NOT NULL DEFAULT b'1',
  `position` varchar(255) DEFAULT NULL,
  `priority` enum('BLOCKED','CRITICAL','MAJOR','MINOR','TRIVIAL') DEFAULT NULL,
  `status` enum('BACKLOG','DONE','INPROCESS','REVIEW','TODO') DEFAULT NULL,
  `tag` enum('PRACTICE','THEORY') DEFAULT NULL,
  `assignee_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) NOT NULL,
  `reviewer_id` varchar(255) DEFAULT NULL,
  `sprint_id` varchar(255) DEFAULT NULL,
  `dt_append` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6tkde1c2odhrtreahor01p5fb` (`assignee_id`),
  KEY `FK4j2x3reshuu7qj5svh6eacnpt` (`project_id`),
  KEY `FKk5vrhlqq2o3j6025h1tqcmjcq` (`reviewer_id`),
  KEY `FK9dv7dy82mg9598oxgpivxjjd1` (`sprint_id`),
  CONSTRAINT `FK4j2x3reshuu7qj5svh6eacnpt` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `FK6tkde1c2odhrtreahor01p5fb` FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK9dv7dy82mg9598oxgpivxjjd1` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`),
  CONSTRAINT `FKk5vrhlqq2o3j6025h1tqcmjcq` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_skill`
--

DROP TABLE IF EXISTS `personal_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_skill` (
  `proficiency` int NOT NULL,
  `skill_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`skill_id`),
  KEY `FK4cu83r1o9yra9eqcyel4nyxln` (`skill_id`),
  CONSTRAINT `FK4cu83r1o9yra9eqcyel4nyxln` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  CONSTRAINT `FKd33ysucmr5n7bkd9k8vh7ft0x` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_sprint`
--

DROP TABLE IF EXISTS `project_sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_sprint` (
  `file_backlog_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) NOT NULL,
  `sprint_id` varchar(255) NOT NULL,
  `dt_last_predicted` datetime(6) DEFAULT NULL,
  `predicted_result` int DEFAULT '-2',
  `removed_issue` int DEFAULT '0',
  `file_daily_first_id` varchar(255) DEFAULT NULL,
  `file_daily_second_id` varchar(255) DEFAULT NULL,
  `dt_last_predicted_second` datetime(6) DEFAULT NULL,
  `predicted_result_second` int NOT NULL DEFAULT '-2',
  PRIMARY KEY (`project_id`,`sprint_id`),
  UNIQUE KEY `UKqakv6jiht1m7mow4w6vf5fwua` (`file_backlog_id`),
  UNIQUE KEY `UKo38yt6b5xethfn71q032tq8e0` (`file_daily_first_id`),
  UNIQUE KEY `UKebsj8jytklgvm0iu0modxkt1l` (`file_daily_second_id`),
  KEY `FKc72pgdev7lt0kjs5x2b533x43` (`sprint_id`),
  CONSTRAINT `FKc72pgdev7lt0kjs5x2b533x43` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`),
  CONSTRAINT `FKdwwvsm4gt575rf23ax43qnt7x` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `FKeldwi7d66a6a2exyc6ldtdtue` FOREIGN KEY (`file_backlog_id`) REFERENCES `resources` (`id`),
  CONSTRAINT `FKh59ryoxyd49q8qqgedl3hulic` FOREIGN KEY (`file_daily_second_id`) REFERENCES `resources` (`id`),
  CONSTRAINT `FKrj7ntgy256krjwsvsy9llyis6` FOREIGN KEY (`file_daily_first_id`) REFERENCES `resources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `content_type` enum('FILE','IMAGE') DEFAULT NULL,
  `extension` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `place_content` enum('AVATAR','ISSUE','PROJECT') DEFAULT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  `size` bigint NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcoba1blh4w96p6n34i4xfoiyp` (`user_id`),
  CONSTRAINT `FKcoba1blh4w96p6n34i4xfoiyp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles_permissions`
--

DROP TABLE IF EXISTS `roles_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_permissions` (
  `role_id` varchar(255) NOT NULL,
  `permission_id` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FKbx9r9uw77p58gsq4mus0mec0o` (`permission_id`),
  CONSTRAINT `FKbx9r9uw77p58gsq4mus0mec0o` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `FKqi9odri6c1o81vjox54eedwyh` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sprint_resource`
--

DROP TABLE IF EXISTS `sprint_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprint_resource` (
  `project_id` varchar(255) NOT NULL,
  `sprint_id` varchar(255) NOT NULL,
  `resource_id` varchar(255) NOT NULL,
  KEY `FKcnku041i9vd3dyk560pj5xp5g` (`resource_id`),
  KEY `FKavu8ovtlnib2wp1iydsb8gq63` (`project_id`,`sprint_id`),
  CONSTRAINT `FKavu8ovtlnib2wp1iydsb8gq63` FOREIGN KEY (`project_id`, `sprint_id`) REFERENCES `project_sprint` (`project_id`, `sprint_id`),
  CONSTRAINT `FKcnku041i9vd3dyk560pj5xp5g` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sprints`
--

DROP TABLE IF EXISTS `sprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprints` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `dt_end` datetime(6) DEFAULT NULL,
  `dt_predict` datetime(6) DEFAULT NULL,
  `dt_start` datetime(6) DEFAULT NULL,
  `story_point` int NOT NULL,
  `title` longtext,
  `workspace_id` varchar(255) DEFAULT NULL,
  `description` longtext,
  `dt_predict_second` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo9l6h39pakacjhw8xm18jrcqu` (`workspace_id`),
  CONSTRAINT `FKo9l6h39pakacjhw8xm18jrcqu` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_course_relation`
--

DROP TABLE IF EXISTS `user_course_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_course_relation` (
  `point` double NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`,`user_id`),
  KEY `FKkas22ewe230cyl6lh63lydshm` (`user_id`),
  CONSTRAINT `FKg86682svlai38w87s7004dg6h` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKkas22ewe230cyl6lh63lydshm` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `class_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `uni_id` varchar(255) DEFAULT NULL,
  `uni_password` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `avatar_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrsulcn2gynjy3cddpwmosv881` (`avatar_id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKaq8j9ja3pamqai2tgdis5p01l` FOREIGN KEY (`avatar_id`) REFERENCES `resources` (`id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workspaces`
--

DROP TABLE IF EXISTS `workspaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspaces` (
  `id` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `dt_created` datetime(6) NOT NULL,
  `dt_deleted` datetime(6) DEFAULT NULL,
  `dt_modified` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `description` longtext,
  `end` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start` datetime(6) DEFAULT NULL,
  `owner_id` varchar(255) DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK58ks96jjlsbhsh21cen7hr59h` (`owner_id`),
  KEY `FKbyvrasf0lert2smb94e5qfwar` (`course_id`),
  CONSTRAINT `FK58ks96jjlsbhsh21cen7hr59h` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKbyvrasf0lert2smb94e5qfwar` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workspaces_users_projects`
--

DROP TABLE IF EXISTS `workspaces_users_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspaces_users_projects` (
  `in_project` bit(1) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `workspace_id` varchar(255) NOT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `in_workspace` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`,`workspace_id`),
  KEY `FKie1muh0vgmfaw8neob7rdjkq1` (`project_id`),
  KEY `FKljv7uknbf639p7tocjun96648` (`role_id`),
  KEY `FKs3dvdk0he6o7t7lejv96yl3os` (`workspace_id`),
  CONSTRAINT `FKd4ittss577eek7ve3eqmkxnkq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKie1muh0vgmfaw8neob7rdjkq1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `FKljv7uknbf639p7tocjun96648` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKs3dvdk0he6o7t7lejv96yl3os` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-25 16:05:30
