CREATE DATABASE IF NOT EXISTS `medic`;

USE medic;

CREATE TABLE IF NOT EXISTS `name`(
   `name_id` INT AUTO_INCREMENT,
   `name_ch` VARCHAR(10) UNIQUE,
   `pinying` VARCHAR(20),
   `full_surname` VARCHAR(10),
   `abbre_surname` VARCHAR(5),
   `full_firstname` VARCHAR(20),
   `abbre_firstname` VARCHAR(5),
   PRIMARY KEY (`name_id`)
);

CREATE TABLE IF NOT EXISTS `city`(
   `city_key` INT AUTO_INCREMENT,
   `city_code` CHAR(12) NOT NULL UNIQUE,
   `city_name` VARCHAR(20) NOT NULL,
   `city_province` VARCHAR(10) NOT NULL,
   PRIMARY KEY (`city_key`)
);

CREATE TABLE IF NOT EXISTS `county`(
   `county_key` INT AUTO_INCREMENT,
   `county_code` CHAR(12) NOT NULL UNIQUE,
   `county_name` VARCHAR(20),
   `city_code` CHAR(12) NOT NULL,
   PRIMARY KEY (`county_key`),
   FOREIGN KEY (`city_code`) REFERENCES `city`(`city_code`)
);

CREATE TABLE IF NOT EXISTs `hospital`(
   `hospital_key` INT AUTO_INCREMENT,
   `hospital_id` CHAR(8) NOT NULL UNIQUE,
   `hospital_name` VARCHAR(15) NOT NULL,
   `hospital_class` CHAR(2),
   `hospital_address` TINYTEXT,
   `hospital_introduction` TINYTEXT,
   `city_code` CHAR(12) NOT NULL,
   PRIMARY KEY (`hospital_key`),
   FOREIGN KEY (`city_code`) REFERENCES `city`(`city_code`)
);

CREATE TABLE IF NOT EXISTS `doctor`(
   `doctor_key` INT AUTO_INCREMENT,
   `doctor_id` CHAR(8) NOT NULL UNIQUE,
   `doctor_faculty` VARCHAR(20) NOT NULL,
   `doctor_profession` VARCHAR(20),
   `doctor_political` VARCHAR(10),
   `doctor_expertise` LONGTEXT,
   `doctor_description` LONGTEXT,
   `doctor_status` VARCHAR(10),
   `hospital_id` CHAR(8) NOT NULL,
   `name_ch` VARCHAR(10) NOT NULL,
   PRIMARY KEY (`doctor_key`),
   FOREIGN KEY (`name_ch`) REFERENCES `name`(`name_ch`),
   FOREIGN KEY (`hospital_id`) REFERENCES `hospital`(`hospital_id`)
);

CREATE TABLE IF NOT EXISTS `article`(
   `article_key` INT AUTO_INCREMENT,
   `article_id` VARCHAR(50) NOT NULL,
   `author_order` CHAR(10) NOT NULL,
   `department` TEXT NOT NULL,
   `doctor_id` CHAR(10) NOT NULL,
   PRIMARY KEY ( `article_key` ),
   FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`doctor_id`)
);