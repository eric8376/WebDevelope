package org.nxstudio.modules.systemmanager.privilege.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eauser;
import org.nxstudio.modules.systemmanager.privilege.dao.UserDao;
import org.springframework.stereotype.Repository;

import java.util.List;

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
 * Created by Chunji.Luo on 2014/7/30.
 */
@Repository
public class UserDaoImpl extends GeneralDaoImpl implements UserDao {
    /**
     * 账户重复性检查
     *
     * @param dto
     * @return
     */
    public Integer checkAccount(Dto dto) {
        Integer temp = (Integer) queryForObject("User.checkAccount", dto);
        return temp;
    }

    @Override
    public void updateUserDept(Dto dto, Eauser eauser) {
        //更改该用户的部门到部门（A）
        eauser.setDeptid(dto.getAsString("deptid"));
        update(eauser);
    }

    @Override
    public List<Eauser> ListUsersByDeptid(Dto dto) {
        List<Eauser> result = listAllByHql("from Eauser u where u .deptid=\'" + dto.getAsString("deptid") + "\'");
        return result;
    }

    @Override
    public List<Dto> queryUserInfo(Dto pDto) {
        List<Dto> result = queryForList("User.queryUserInfo", pDto);
        return result;
    }

    @Override
    public List<Dto> getUserInfoByKey(Dto pDto) {
        List<Dto> result = queryForList("User.getUserInfoByKey", pDto);
        return result;
    }
}
