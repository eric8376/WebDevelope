package org.nxstudio.modules.systemmanager.privilege.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;

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
public interface RoleDao extends GeneralDao {
    /**
     * 通过角色名称获取角色信息
     *
     * @param dto
     * @return
     */
    public List<Earole> queryEaroleByHql(Dto dto);

    public List<Dto> queryEaroleBySql(Dto pDto);

    public List<Dto> queryUserRole(Dto pDto);

    /**
     * 删除用户分配的角色
     *
     * @param pDto
     */
    public void deleteEaUserAuthorize(Dto pDto);

    /**
     * 检查用户分配角色是否已存在
     *
     * @param pDto
     * @return
     */
    public Integer queryRoleExistByUser(Dto pDto);
}
