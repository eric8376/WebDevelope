prompt PL/SQL Developer import file
prompt Created on 2013年1月8日 by Administrator
set feedback off
set define off
prompt Dropping T_DICT_TABLE...
drop table T_DICT_TABLE cascade constraints;
prompt Dropping T_PER_RECORD...
drop table T_PER_RECORD cascade constraints;
prompt Dropping T_PER_ROLE_XM...
drop table T_PER_ROLE_XM cascade constraints;
prompt Dropping T_PER_USER...
drop table T_PER_USER cascade constraints;
prompt Dropping T_PER_USER_ROLE...
drop table T_PER_USER_ROLE cascade constraints;
prompt Dropping T_PER_XM_KS...
drop table T_PER_XM_KS cascade constraints;
prompt Creating T_DICT_TABLE...
create table T_DICT_TABLE
(
  dict_id    varchar(36) not null,
  group_id   varchar(36),
  dict_text  varchar(50),
  group_code varchar(20),
  parent_id  varchar(36)
)
;
alter table T_DICT_TABLE
  add constraint PRI_DICT_ID unique (DICT_ID);

prompt Creating T_PER_RECORD...
create table T_PER_RECORD
(
  record_id  varchar(36),
  user_name  varchar(20),
  check_time varchar(20),
  zyh        varchar(20),
  result     varchar(100),
  dianping   varchar(100),
  kaohe      varchar(20),
  ksxm_id    varchar(36)
)
;

prompt Creating T_PER_ROLE_XM...
create table T_PER_ROLE_XM
(
  role_id varchar(36),
  ksxm_id varchar(36)
)
;

prompt Creating T_PER_USER...
create table T_PER_USER
(
  user_id     varchar(36),
  user_name   varchar(30),
  password    varchar(30),
  real_name   varchar(30),
  description varchar(40),
  email       varchar(40),
  regdate     varchar(40),
  ks          varchar(36),
  jb          varchar(10),
  bm          varchar(10)
)
;
comment on column T_PER_USER.ks
  is '科室';
comment on column T_PER_USER.jb
  is '级别';
comment on column T_PER_USER.bm
  is '部门类型';

prompt Creating T_PER_USER_ROLE...
create table T_PER_USER_ROLE
(
  user_id varchar(36) not null,
  role_id varchar(36) not null
)
;

prompt Creating T_PER_XM_KS...
create table T_PER_XM_KS
(
  xm_id   varchar(50) not null,
  ks_id   varchar(50) not null,
  ksxm_id varchar(50)
)
;

prompt Loading T_DICT_TABLE...
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('cb7f0048-618d-46ae-88d1-d6986f14cbe6', '1', '妇产科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('c65307bd-a3c2-4b72-ab6a-a351f54db5ea', '1', '其他科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('10046c28-25a2-4014-8bd5-5416b8762f63', '1', '质控科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('ee7428aa-1da0-4697-8d5f-f6f039e15275', '1', '血库', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('0e58f126-3193-4ede-894f-0f91a7e7296d', '1', '心电图室', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('95425f9a-e1c9-4cfb-817b-6934468d16a0', '1', '手术室', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('8ae17907-f0f7-43b6-b65c-4ffb995fa932', '1', '检验科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('ab145706-e4b3-45c0-9e49-33c59b92e69f', '1', '病理科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('253744f9-c661-44ad-ac32-ed4f1b8a17bc', '1', 'B超室', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('847ad9d0-eb73-4269-9f66-0e9b1e46358c', '1', '影像科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('c83a5575-be0a-4213-9a29-f2057accc898', '1', '内镜室', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '2', '医德医风', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('ed7c4742-3b2d-4015-a6cd-d2ba518ac230', '2', '年门诊量', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('7ea1bb6e-d96e-4588-93fd-58e6136f51cf', '2', '运行病历', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('1f2315fa-f661-46ff-aa07-cf4b97eb768c', '2', '检查申请单', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('9980b892-4da7-43d0-818b-dcc328e6e620', '2', '临床用血', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('9a57f33d-48d7-418f-845c-97703ea36d78', '2', '合理用药', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('dc94da7c-34a0-4a8b-8674-d5b31bec9faa', '2', '处方', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('d2c48d35-473b-434d-8623-4dabfac47c00', '2', '门诊病历', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('0f7604e2-5cde-41f4-a8a5-5dc2532686f4', '2', '大金额病历及处方', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('97a64b6c-f002-4d80-a97c-21157c002dc9', '2', '核心制度', 'xm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('5119329e-7ef1-41fc-9313-e51f6db90145', '1', '药剂科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('03129521-0048-44d2-b8e4-39da00d4ace0', '1', '康复理疗科', 'ks', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('57a07a2b-053f-4c64-8413-430b703d189f', '3', '角色1', 'js', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('e5632998-61d0-4bde-9451-0cfbb28e042f', '3', '角色2', 'js', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('25', '3', '院办公室', 'bm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('27', '3', '部门2', 'bm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('28', '3', '部门3', 'bm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('29', '3', '部门4', 'bm', null);
insert into T_DICT_TABLE (dict_id, group_id, dict_text, group_code, parent_id)
values ('30', '3', '部门5', 'bm', null);
commit;
prompt 30 records loaded
prompt Loading T_PER_RECORD...
insert into T_PER_RECORD (record_id, user_name, check_time, zyh, result, dianping, kaohe, ksxm_id)
values ('a084e630-994f-4aaa-87f5-11b513ca4b32', 'ii', '01-12-2012', null, 'ok', 'ok', null, '4ceae71f-fe3b-4259-a445-f73bb8f5ce21');
insert into T_PER_RECORD (record_id, user_name, check_time, zyh, result, dianping, kaohe, ksxm_id)
values ('78170dc5-773c-4326-9a61-49624c8c4937', '王二', '05-01-2013', null, 'ok', 'ok', null, '17fe088c-3a12-4de3-b1c7-2907588924d0');
commit;
prompt 2 records loaded
prompt Loading T_PER_ROLE_XM...
insert into T_PER_ROLE_XM (role_id, ksxm_id)
values ('57a07a2b-053f-4c64-8413-430b703d189f', '17fe088c-3a12-4de3-b1c7-2907588924d0');
insert into T_PER_ROLE_XM (role_id, ksxm_id)
values ('57a07a2b-053f-4c64-8413-430b703d189f', 'ef15ecae-bca2-4b12-921d-aeeba185f8d5');
insert into T_PER_ROLE_XM (role_id, ksxm_id)
values ('57a07a2b-053f-4c64-8413-430b703d189f', 'aeede383-c151-4e8b-a629-ee20a89739a5');
insert into T_PER_ROLE_XM (role_id, ksxm_id)
values ('57a07a2b-053f-4c64-8413-430b703d189f', '92d7ef94-b66c-4a50-9e77-c54be505fb82');
commit;
prompt 4 records loaded
prompt Loading T_PER_USER...
insert into T_PER_USER (user_id, user_name, password, real_name, description, email, regdate, ks, jb, bm)
values ('15118c73-206e-4493-8556-dda4997f9472', 'staff', '123', '王飞', null, null, '06-1月 -13', 'cb7f0048-618d-46ae-88d1-d6986f14cbe6', '1', '0');
insert into T_PER_USER (user_id, user_name, password, real_name, description, email, regdate, ks, jb, bm)
values ('be04de2a-a42e-46e1-b5ac-1c7994bea9bb', 'admin', '123', '肯特', null, null, '01-1月 -13', 'cb7f0048-618d-46ae-88d1-d6986f14cbe6', '0', '1');
commit;
prompt 2 records loaded
prompt Loading T_PER_USER_ROLE...
insert into T_PER_USER_ROLE (user_id, role_id)
values ('15118c73-206e-4493-8556-dda4997f9472', '57a07a2b-053f-4c64-8413-430b703d189f');
insert into T_PER_USER_ROLE (user_id, role_id)
values ('be04de2a-a42e-46e1-b5ac-1c7994bea9bb', '57a07a2b-053f-4c64-8413-430b703d189f');
commit;
prompt 2 records loaded
prompt Loading T_PER_XM_KS...
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '10046c28-25a2-4014-8bd5-5416b8762f63', 'ef15ecae-bca2-4b12-921d-aeeba185f8d5');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('ed7c4742-3b2d-4015-a6cd-d2ba518ac230', '5119329e-7ef1-41fc-9313-e51f6db90145', '92d7ef94-b66c-4a50-9e77-c54be505fb82');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '03129521-0048-44d2-b8e4-39da00d4ace0', '77512fca-a466-4393-bfe4-9bae7e5223d4');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '0e58f126-3193-4ede-894f-0f91a7e7296d', 'e38c9bf4-ae51-4ebf-b9a6-10c9f84ccfcf');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('ed7c4742-3b2d-4015-a6cd-d2ba518ac230', '847ad9d0-eb73-4269-9f66-0e9b1e46358c', 'c25ce48f-b3be-4842-8908-00b83187d4c6');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '253744f9-c661-44ad-ac32-ed4f1b8a17bc', 'a018068d-2262-42c5-b291-6f405952a45d');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '5119329e-7ef1-41fc-9313-e51f6db90145', '8808eb80-d667-494b-b48c-6915fe0d19d7');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '847ad9d0-eb73-4269-9f66-0e9b1e46358c', '95a90cda-5926-4098-abb6-6887404a602b');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('ed7c4742-3b2d-4015-a6cd-d2ba518ac230', 'ee7428aa-1da0-4697-8d5f-f6f039e15275', '4ceae71f-fe3b-4259-a445-f73bb8f5ce21');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('dc94da7c-34a0-4a8b-8674-d5b31bec9faa', 'ee7428aa-1da0-4697-8d5f-f6f039e15275', 'aeede383-c151-4e8b-a629-ee20a89739a5');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', 'cb7f0048-618d-46ae-88d1-d6986f14cbe6', '17fe088c-3a12-4de3-b1c7-2907588924d0');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '95425f9a-e1c9-4cfb-817b-6934468d16a0', '1d7c93b5-28bc-4f46-b428-9d5b401b5f19');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', 'ab145706-e4b3-45c0-9e49-33c59b92e69f', 'a7a53fb4-d2bb-4b58-af6e-c9d18f34c5de');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', '8ae17907-f0f7-43b6-b65c-4ffb995fa932', '17d00e62-a94d-4050-9f1c-0db5d3890ff2');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', 'c65307bd-a3c2-4b72-ab6a-a351f54db5ea', '94a24bce-075d-4a70-9e8d-933984fc5dd0');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', 'ee7428aa-1da0-4697-8d5f-f6f039e15275', '77bb5a64-550f-4f45-8a5d-f9c38277847d');
insert into T_PER_XM_KS (xm_id, ks_id, ksxm_id)
values ('e570d597-fe91-47a9-bebb-daee348f1604', 'c83a5575-be0a-4213-9a29-f2057accc898', 'c48ac83f-474b-4f0e-91b3-3d21f128a995');
commit;
prompt 17 records loaded
set feedback on
set define on
prompt Done.
