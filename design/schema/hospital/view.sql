----------------------------------------------------
-- Export file for user USER_BASK_APP             --
-- Created by Administrator on 2013/1/7, 21:30:43 --
----------------------------------------------------

spool view.log

prompt
prompt Creating view T_PER_BM
prompt ======================
prompt
create or replace view user_bask_app.t_per_bm as
select "DICT_ID","GROUP_ID","DICT_TEXT","GROUP_CODE","PARENT_ID" from t_dict_table t where t.group_code='bm';

prompt
prompt Creating view T_PER_KS
prompt ======================
prompt
create or replace view user_bask_app.t_per_ks as
select "DICT_ID","GROUP_ID","DICT_TEXT","GROUP_CODE","PARENT_ID" from t_dict_table t where t.group_code='ks';

prompt
prompt Creating view T_PER_ROLE
prompt ========================
prompt
create or replace view user_bask_app.t_per_role as
select "DICT_ID","GROUP_ID","DICT_TEXT","GROUP_CODE","PARENT_ID" from t_dict_table where GROUP_CODE='js';

prompt
prompt Creating view T_PER_XM
prompt ======================
prompt
create or replace view user_bask_app.t_per_xm as
select "DICT_ID","GROUP_ID","DICT_TEXT","GROUP_CODE","PARENT_ID" from t_dict_table t where t.group_code='xm';


spool off
