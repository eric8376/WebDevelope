package org.nxstudio.modules.systemassist.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.systemassist.dao.UserWorkMgrDao;
import org.nxstudio.plugin.pagination.Page;
import org.springframework.stereotype.Repository;

/**
 * Copyright 2000-2014 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of
 * RenWoYou Corporation ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with RenWoYou.
 * <p/>
 * <p/>
 * Created by Chunji.Luo on 2014/8/5.
 */
@Repository
public class UserWorkMgrDaoImpl extends GeneralDaoImpl implements UserWorkMgrDao {

    public Page listAllBySql(Dto pDto) {
        if (pDto.getAsString("deptid").equals("root-001")) {
            pDto.put("deptid", "001");
        }
        //service
        String columns = "id_,proc_inst_id_,proc_def_id_,name_,create_time_,userid,account,username,deptid";
        String afterSql = "from act_ru_task a right join eauser b on a.assignee_=b.account where b.deptid!='001' and b.enabled=1 and b.deptid like \'%1$S%%\' and (name_ like \'%%%2$S%%\' or username like \'%%%2$S%%\') order by a.suspension_state_,b.deptid,b.username,a.create_time_";
        afterSql = String.format(afterSql, pDto.getAsString("deptid"), pDto.getAsString("searchKey"));
        return this.listPageBySql(columns, afterSql, pDto);
    }

    public Page listUnCommitBySql(Dto pDto) {
        //service
        String columns = "mgr_no,task_id,key,flow_no,point_no,job_name,assignee,status,is_finish,job_level,last_resume_date,username";
        String afterSql = "from T_WF_USER_TASKS_MGR a left join eauser b on a.assignee=b.account where a.is_finish in(0,2) and (job_name like '" + pDto.getAsString("searchKey") + "' or username like '" + pDto.getAsString("searchKey") + "')";
        return this.listPageBySql(columns, afterSql, pDto);
    }

    public Page listAllBySql(String id) {
        String columns = "ordernumber";
        String afterSql = "from t_or_projectinfo t where t.projectid='" + id + "'";
        return this.listPageBySql(columns, afterSql, null);
    }
}
