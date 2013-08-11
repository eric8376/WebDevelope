create or replace view t_per_bm as
select DICT_ID,GROUP_ID,DICT_TEXT,GROUP_CODE,PARENT_ID from t_dict_table t where t.group_code='bm';

create or replace view t_per_ks as
select DICT_ID,GROUP_ID,DICT_TEXT,GROUP_CODE,PARENT_ID from t_dict_table t where t.group_code='ks';


create or replace view t_per_role as
select DICT_ID,GROUP_ID,DICT_TEXT,GROUP_CODE,PARENT_ID from t_dict_table where GROUP_CODE='js';


create or replace view t_per_xm as
select DICT_ID,GROUP_ID,DICT_TEXT,GROUP_CODE,PARENT_ID from t_dict_table t where t.group_code='xm';


