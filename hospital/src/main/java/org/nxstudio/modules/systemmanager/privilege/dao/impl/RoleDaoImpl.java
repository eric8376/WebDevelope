package org.nxstudio.modules.systemmanager.privilege.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;
import org.nxstudio.modules.systemmanager.privilege.dao.RoleDao;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Copyright 2000-2014 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of
 * RenWoYou Corporation ("Confidential Information").  You
 * <p/>
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with RenWoYou.
 * <p/>
 * <p/>
 * Created by Chunji.Luo on 2014/7/30.
 */
@Repository
public class RoleDaoImpl extends GeneralDaoImpl implements RoleDao {
    @Override
    public List<Earole> queryEaroleByHql(Dto dto) {
        List<Earole> eadeptlist = this.listAllByHql("from Earole e where e.rolename in (" + dto.getAsString("rolename") + ")");
        return eadeptlist;
    }

    @Override
    public List<Dto> queryEaroleBySql(Dto pDto) {
        List<Dto> eadeptlist = this.queryForList("Role.queryEaroleBySql", pDto);
        return eadeptlist;
    }

    @Override
    public List<Dto> queryUserRole(Dto pDto) {
        List<Dto> eadeptlist = this.queryForList("Role.queryUserRole", pDto);
        return eadeptlist;
    }

    @Override
    public void deleteEaUserAuthorize(Dto pDto) {
        delete("Role.deleteEaUserAuthorize", pDto);
    }

    @Override
    public Integer queryRoleExistByUser(Dto pDto) {
        return (Integer) queryForObject("Role.queryRoleExistByUser", pDto);
    }
}
