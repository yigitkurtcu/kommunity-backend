-- Kommunity.app DB Schema
-- Version: 0.0

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema community
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `community` ;

-- -----------------------------------------------------
-- Schema community
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `community` DEFAULT CHARACTER SET utf8 ;
USE `community` ;

-- -----------------------------------------------------
-- Table `community`.`communities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`communities` ;

CREATE TABLE IF NOT EXISTS `community`.`communities` (
  `uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  `tagline` VARCHAR(100) NOT NULL,
  `desc` TEXT NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `social_links` JSON NULL,
  `avatar_upload_uuid` CHAR(36) NULL,
  `tier` JSON NOT NULL,
  `visibility` ENUM('public', 'private', 'secret') NOT NULL DEFAULT 'public',
  `is_active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

INSERT INTO `community`.`communities` (
  `uuid`,
  `name`,
  `tagline`,
  `desc`,
  `location`,
  `social_links`,
  `avatar_upload_uuid`,
  `tier`,
  `visibility`,
  `is_active`
  ) VALUES
    ('6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 01', 'Community,01,Tags', 'Community 01 description.', 'Turkey', '{"twitter":"twitter link 01", "facebook":"facebook link 01"}', '23ea0fe4-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'public', 0)
  , ('6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 02', 'Community,02,Tags', 'Community 02 description.', 'Turkey', '{"twitter":"twitter link 02", "facebook":"facebook link 02"}', '23ea0eb8-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'private', 1)
  , ('6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 03', 'Community,03,Tags', 'Community 03 description.', 'Turkey', '{"twitter":"twitter link 03", "facebook":"facebook link 03"}', '23ea0cb8-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'secret', 1)
  , ('6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 04', 'Community,04,Tags', 'Community 04 description.', 'Germany', '{"twitter":"twitter link 04", "facebook":"facebook link 04"}', '23ea0787-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'public', 1)
  , ('6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 05', 'Community,05,Tags', 'Community 05 description.', 'Germany', '{"twitter":"twitter link 05", "facebook":"facebook link 05"}', '23ea0788-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'private',0)
  , ('6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', 'Test Community 06', 'Community,06,Tags', 'Community 06 description.', 'United Kingdom', '{"twitter":"twitter link 06", "facebook":"facebook link 06"}', '23ea0404-d6a1-11e8-9f8b-f2801f1b9fd1', '{"free":"true"}', 'public', 1)
  ;

-- -----------------------------------------------------
-- Table `community`.`community_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`community_users` ;

CREATE TABLE IF NOT EXISTS `community`.`community_users` (
  `community_uuid` CHAR(36) NOT NULL,
  `user_uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `status` ENUM('invited', 'applied', 'approved', 'banned') NOT NULL,
  `role` ENUM('guest', 'member', 'moderator', 'admin', 'owner') NOT NULL,
  PRIMARY KEY (`community_uuid`, `user_uuid`));

INSERT INTO `community`.`community_users` (
  `community_uuid`,
  `user_uuid`,
  `status`,
  `role`
  ) VALUES
    ('6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'applied', 'guest')
  , ('6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'invited', 'moderator')
  , ('6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'admin')

  , ('6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'applied', 'guest')
  , ('6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'invited', 'moderator')
  , ('6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'admin')

  , ('6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'applied', 'guest')
  , ('6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'invited', 'moderator')
  , ('6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'admin')

  , ('6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'member')
  , ('6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'banned', 'moderator')
  , ('6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'invited', 'moderator')

  , ('6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'invited', 'admin')
  , ('6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'applied', 'guest')
  , ('6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'moderator')

  , ('6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'owner')
  , ('6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'member')
  , ('6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'approved', 'member')
  , ('6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'banned', 'member')
  ;

-- -----------------------------------------------------
-- Table `community`.`conversation_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`conversation_categories` ;

CREATE TABLE IF NOT EXISTS `community`.`conversation_categories` (
  `uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `community_uuid` CHAR(36) NOT NULL,
  `user_uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `visibility` ENUM('public', 'private', 'secret') NOT NULL,
  `min_role_required` ENUM('guest', 'member', 'moderator', 'admin') NOT NULL,
  PRIMARY KEY (`uuid`));

INSERT INTO `community`.`conversation_categories` (
  `uuid`,
  `community_uuid`,
  `user_uuid`,
  `name`,
  `visibility`,
  `min_role_required`
  ) VALUES
    ('310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 01', 'public', 'guest')
  , ('310f97c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 02', 'private', 'member')
  , ('310f98c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 03', 'private', 'moderator')
  , ('310f99c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 03', 'secret', 'admin')

  , ('310d93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 04', 'public', 'guest')
  , ('310g93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 05', 'private', 'member')
  , ('310h93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 06', 'private', 'moderator')
  , ('310l93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 07', 'secret', 'admin')

  , ('310q93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 08', 'public', 'guest')
  , ('312f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 09', 'private', 'member')
  , ('311f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 10', 'private', 'moderator')
  , ('313f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 11', 'secret', 'admin')

  , ('317f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 12', 'public', 'guest')
  , ('318f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 13', 'private', 'member')
  , ('319f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 14', 'private', 'moderator')
  , ('320f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 15', 'secret', 'admin')

  , ('330f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 16', 'public', 'guest')
  , ('340f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 17', 'private', 'member')
  , ('350f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 18', 'private', 'moderator')
  , ('360f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e508-d6a6-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 19', 'secret', 'admin')

  , ('370f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 20', 'public', 'guest')
  , ('380f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 21', 'private', 'member')
  , ('390f93c8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 22', 'private', 'moderator')
  , ('310f93u8-d76a-11e8-9f8b-f2801f1b9fd1', '6c52e63e-d6a6-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Category 23', 'secret', 'admin')
  ;

-- -----------------------------------------------------
-- Table `community`.`conversation_posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`conversation_posts` ;

CREATE TABLE IF NOT EXISTS `community`.`conversation_posts` (
  `uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `user_uuid` CHAR(36) NOT NULL,
  `parent_uuid` CHAR(36) NULL,
  `community_uuid` CHAR(36) NOT NULL,
  `category_uuid` CHAR(36) NULL,
  `content` LONGTEXT NOT NULL,
  `view_count` INT NULL DEFAULT 0,
  `attachment_upload_uuids` JSON NULL,
  PRIMARY KEY (`uuid`));

INSERT INTO `community`.`conversation_posts` (
  `uuid`,
  `user_uuid`,
  `parent_uuid`,
  `community_uuid`,
  `category_uuid`,
  `content`,
  `view_count`,
  `attachment_upload_uuids`
  ) VALUES
    ('1749067c-d78d-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', NULL, '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 01', 10, '{"uuids" : ["23ea0d96-d6a1-11e8-9f8b-f2801f1b9fd1"]}')
  , ('1749091a-d78d-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', '1749067c-d78d-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 02', 10, NULL)
  , ('17490a78-d78d-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', '1749067c-d78d-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 03', 10, NULL)
  , ('17490bae-d78d-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', '17490a78-d78d-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 04', 10, NULL)
  , ('17490ce4-d78d-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', '17490bae-d78d-11e8-9f8b-f2801f1b9fd1', '6c52dc16-d6a6-11e8-9f8b-f2801f1b9fd1', '310f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 05', 10, NULL)

  , ('17490e1a-d78d-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', NULL, '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 06', 5, NULL)
  , ('1749102c-d78d-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', '17490e1a-d78d-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 07', 5, '{"uuids" : ["23ea02d8-d6a1-11e8-9f8b-f2801f1b9fd1"]}')
  , ('17491176-d78d-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', '17490e1a-d78d-11e8-9f8b-f2801f1b9fd1', '6c52debe-d6a6-11e8-9f8b-f2801f1b9fd1', '310g93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 08', 5, NULL)

  , ('174913e2-d78d-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', NULL, '6c52e274-d6a6-11e8-9f8b-f2801f1b9fd1', '311f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 09', 7, NULL)
  , ('174915c2-d78d-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', NULL, '6c52e3c8-d6a6-11e8-9f8b-f2801f1b9fd1', '320f93c8-d76a-11e8-9f8b-f2801f1b9fd1', 'Test conversation posts 10', 8, '{"uuids" : ["23ea065c-d6a1-11e8-9f8b-f2801f1b9fd1"]}')
  ;

-- -----------------------------------------------------
-- Table `community`.`uploads`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`uploads` ;

CREATE TABLE IF NOT EXISTS `community`.`uploads` (
  `uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `owner_uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `original_file_name` VARCHAR(100) NOT NULL,
  `type` ENUM('user_avatar', 'community_avatar', 'post_attachment') NOT NULL,
  `short_desc` VARCHAR(250) NULL,
  PRIMARY KEY (`uuid`));

INSERT INTO `community`.`uploads` (
  `uuid`,
  `owner_uuid`,
  `name`,
  `original_file_name`,
  `type`,
  `short_desc`
  ) VALUES
  ('23e9bfd0-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Avatar 01', 'test_user_avatar_01.png', 'user_avatar', 'Test user avatart file 01.')
, ('23ea1110-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Avatar 02', 'test_user_avatar_02.png', 'user_avatar', 'Test user avatart file 02.')
, ('23ea0fe4-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 01', 'test_community_avatar_01.png', 'community_avatar', 'Test community avatart file 01.')
, ('23ea0eb8-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 02', 'test_community_avatar_02.png', 'community_avatar', 'Test community avatart file 02.')
, ('23ea0cb8-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 03', 'test_community_avatar_03.png', 'community_avatar', 'Test community avatart file 03.')
, ('23ea0d96-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Post Attachment 01', 'test_01.doc', 'post_attachment', 'Test user post attachment file 01.')
, ('23ea0c60-d6a1-11e8-9f8b-f2801f1b9fd1', '3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Post Attachment 02', 'test_02.doc', 'post_attachment', 'Test user post attachment file 02.')

, ('23ea0b02-d6a1-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Avatar 03', 'test_user_avatar_03.png', 'user_avatar', 'Test user avatart file 03.')
, ('23ea0787-d6a1-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 04', 'test_community_avatar_04.png', 'community_avatar', 'Test community avatart file 04.')
, ('23ea0788-d6a1-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 05', 'test_community_avatar_05.png', 'community_avatar', 'Test community avatart file 05.')
, ('23ea065c-d6a1-11e8-9f8b-f2801f1b9fd1', '33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Post Attachment 03', 'test_03.doc', 'post_attachment', 'Test user post attachment file 03.')

, ('23ea0530-d6a1-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Avatar 04', 'test_user_avatar_04.png', 'user_avatar', 'Test user avatart file 04.')
, ('23ea0404-d6a1-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test Community Avatar 06', 'test_community_avatar_06.png', 'community_avatar', 'Test community avatart file 06.')
, ('23ea02d8-d6a1-11e8-9f8b-f2801f1b9fd1', '33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Post Attachment 04', 'test_04.doc', 'post_attachment', 'Test user post attachment file 04.')

, ('23fa0530-d6a1-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Avatar 05', 'test_user_avatar_05.png', 'user_avatar', 'Test user avatart file 05.')
, ('23es02d8-d6a1-11e8-9f8b-f2801f1b9fd1', '33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'Test User Post Attachment 05', 'test_05.doc', 'post_attachment', 'Test user post attachment file 05.')
;

-- -----------------------------------------------------
-- Table `community`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `community`.`users` ;

CREATE TABLE IF NOT EXISTS `community`.`users` (
  `uuid` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(25) NULL,
  `last_name` VARCHAR(25) NULL,
  `attributes` JSON NULL,
  `location` VARCHAR(25) NULL,
  `avatar_upload_uuid` CHAR(36) NULL,
  `last_seen_at` TIMESTAMP NULL,
  `confirmed_email_at` TIMESTAMP NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

INSERT INTO `community`.`users` (
  `uuid`,
  `email`,
  `password_hash`,
  `first_name`,
  `last_name`,
  `attributes`,
  `location`,
  `avatar_upload_uuid`,
  `last_seen_at`,
  `confirmed_email_at`
  ) VALUES
  ('3346776a-d69d-11e8-9f8b-f2801f1b9fd1', 'test01@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'Turkey', '23ea1110-d6a1-11e8-9f8b-f2801f1b9fd1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
, ('33467ba2-d69d-11e8-9f8b-f2801f1b9fd1', 'test02@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'Germany', '23ea0b02-d6a1-11e8-9f8b-f2801f1b9fd1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
, ('33467fee-d69d-11e8-9f8b-f2801f1b9fd1', 'test03@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'United Kingdom', '23ea0530-d6a1-11e8-9f8b-f2801f1b9fd1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
, ('33467a44-d69d-11e8-9f8b-f2801f1b9fd1', 'test04@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'Germany', '23fa0530-d6a1-11e8-9f8b-f2801f1b9fd1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
, ('33467e86-d69d-11e8-9f8b-f2801f1b9fd1', 'test05@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'United Kingdom', NULL, NULL, NULL)
, ('23e9da9c-d69d-11e8-9f8b-f2801f1b9fd1', 'test06@test.com', 'e10adc3949ba59abbe56e057f20f883e', 'Firstname', 'Lastname', '{"title":"Test Title"}', 'Turkey', NULL, NULL, NULL)
;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
