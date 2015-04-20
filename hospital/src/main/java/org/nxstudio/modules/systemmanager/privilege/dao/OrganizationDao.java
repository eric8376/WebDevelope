package org.nxstudio.modules.systemmanager.privilege.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eadept;

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
public interface OrganizationDao extends GeneralDao {
    /**
     * 通过组织架构id更新组织架构名称
     *
     * @param dto
     */
    public void updateEadeptnameByDeptId(Dto dto);

    /**
     * 通过部门名称获取部门信息
     *
     * @param dto
     * @return
     */
    public List<Eadept> queryEadeptByDeptName(Dto dto);

    /**
     * 部门重复性校验
     *
     * @param pDto
     */
    public List<Dto> CheckDeptUnion(Dto pDto);
}
