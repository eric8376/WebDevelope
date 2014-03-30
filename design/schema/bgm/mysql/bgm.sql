/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50614
Source Host           : localhost:3306
Source Database       : bgm

Target Server Type    : MYSQL
Target Server Version : 50614
File Encoding         : 65001

Date: 2013-12-21 14:05:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_dict
-- ----------------------------
DROP TABLE IF EXISTS `t_dict`;
CREATE TABLE `t_dict` (
  `dict_id` varchar(32) NOT NULL,
  `dict_code` varchar(10) DEFAULT NULL,
  `dict_text` varchar(30) DEFAULT NULL,
  `parent_id` varchar(32) DEFAULT NULL,
  `dict_type` varchar(10) DEFAULT NULL COMMENT '1������\r\n            2������\r\n            3������\r\n            4������',
  PRIMARY KEY (`dict_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_dict
-- ----------------------------
INSERT INTO `t_dict` VALUES ('4028818842f17d9b0142f670f4ee0003', 'ks', '科室A', '1', '1');
INSERT INTO `t_dict` VALUES ('4028818842f17d9b0142f671e57e0004', 'bm', '部门A', '1', '1');
INSERT INTO `t_dict` VALUES ('4028818842f17d9b0142f6c767b60005', 'ks', '科室B', null, null);

-- ----------------------------
-- Table structure for t_patient
-- ----------------------------
DROP TABLE IF EXISTS `t_patient`;
CREATE TABLE `t_patient` (
  `patient_id` varchar(32) NOT NULL,
  `record_no` char(32) DEFAULT NULL,
  `id_no` char(16) DEFAULT NULL,
  `insurance_id` char(16) DEFAULT NULL,
  `name` char(12) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `born_date` varchar(16) DEFAULT NULL,
  `contact1` varchar(30) DEFAULT NULL,
  `contact2` varchar(30) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1����\r\n            2סԺ',
  `checkin_time` varchar(16) DEFAULT NULL,
  `checkout_time` varchar(16) DEFAULT NULL,
  `memo` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_patient
-- ----------------------------
INSERT INTO `t_patient` VALUES ('20131216091200501', '1', '1', '1', '1', '1', '1', '2013-12-03', '1', '1', '1', '1', '2013-12-03', '2013-12-03', '1');
INSERT INTO `t_patient` VALUES ('20131216091700502', '3324234324', '234', '234', '234', '1', '234', '2013-12-03', '23423', '324234', '324', '1', '2013-12-04', '2013-12-04', '234324');

-- ----------------------------
-- Table structure for t_plan
-- ----------------------------
DROP TABLE IF EXISTS `t_plan`;
CREATE TABLE `t_plan` (
  `plan_id` varchar(32) NOT NULL,
  `patient_id` varchar(32) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  `begin_time` varchar(16) DEFAULT NULL,
  `end_time` varchar(16) DEFAULT NULL,
  `memo` varchar(150) DEFAULT NULL,
  `dectect_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_plan
-- ----------------------------
INSERT INTO `t_plan` VALUES ('402881e942fb92f60142fbec6ead0000', '20131216091700502', '1', null, null, '1', '1');
INSERT INTO `t_plan` VALUES ('402881e942fb92f60142fbed6ba90001', '20131216091700502', '', '2013-12-04', '2013-12-05', '1', '1');

-- ----------------------------
-- Table structure for t_result
-- ----------------------------
DROP TABLE IF EXISTS `t_result`;
CREATE TABLE `t_result` (
  `check_id` varchar(32) NOT NULL,
  `patient_id` varchar(32) DEFAULT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  `mach_id` varchar(32) DEFAULT NULL,
  `check_result` varchar(50) DEFAULT NULL,
  `analysis_result` varchar(100) DEFAULT NULL,
  `check_time` varchar(10) DEFAULT NULL,
  `memo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`check_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_result
-- ----------------------------

-- ----------------------------
-- Table structure for t_terminal
-- ----------------------------
DROP TABLE IF EXISTS `t_terminal`;
CREATE TABLE `t_terminal` (
  `mach_id` varchar(32) NOT NULL,
  `is_register` int(11) DEFAULT NULL,
  PRIMARY KEY (`mach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_terminal
-- ----------------------------

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_id` varchar(32) NOT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `phone` char(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `house_id` varchar(32) DEFAULT NULL,
  `bed_id` varchar(32) DEFAULT NULL,
  `bm_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', '111', '1', '1', '1', '111', '111', '4028818842f17d9b0142f670f4ee0003');
INSERT INTO `t_user` VALUES ('4028818842f17d9b0142f5ee954f0001', 'admin1', '111', '111', '111', '1', '102', '121', '4028818842f17d9b0142f6c767b60005');
INSERT INTO `t_user` VALUES ('4028818842f17d9b0142f5f144fa0002', 'admin2', '111', '111', '111', '1', '', '', '4028818842f17d9b0142f6c767b60005');
