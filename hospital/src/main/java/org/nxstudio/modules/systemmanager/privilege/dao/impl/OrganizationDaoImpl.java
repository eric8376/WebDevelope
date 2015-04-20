package org.nxstudio.modules.systemmanager.privilege.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eadept;
import org.nxstudio.modules.systemmanager.privilege.dao.OrganizationDao;
import org.nxstudio.util.g4.G4Utils;
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
public class OrganizationDaoImpl extends GeneralDaoImpl implements OrganizationDao {
    @Override
    public void updateEadeptnameByDeptId(Dto dto) {
        Eadept eadept = get(Eadept.class, dto.getAsString("deptid"));
        if (G4Utils.isNotEmpty(eadept)) {
            eadept.setDeptname(dto.getAsString("new_deptname"));
            update(eadept);
        }
    }

    @Override
    public List<Eadept> queryEadeptByDeptName(Dto dto) {
        List<Eadept> eadeptlist = this.listAllByHql(" from Eadept d where d.deptname='" + dto.getAsString("deptname") + "' and d.enabled='1'");
        return eadeptlist;
    }

    @Override
    public List<Dto> CheckDeptUnion(Dto pDto) {
        List<Dto> deptlist = queryForList("Organization.CheckDeptUnion", pDto);
        return deptlist;
    }

}
