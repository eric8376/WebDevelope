package org.nxstudio.modules.systemmanager.privilege.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eauser;

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
public interface UserDao extends GeneralDao {
    /**
     * 账户重复性检查
     *
     * @param dto
     * @return
     */
    public Integer checkAccount(Dto dto);

    /**
     * 更新用户所在部门
     *
     * @param dto
     * @param eauser
     */
    public void updateUserDept(Dto dto, Eauser eauser);

    public List<Eauser> ListUsersByDeptid(Dto dto);

    /**
     * 查询账户信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryUserInfo(Dto pDto);

    /**
     * 根据主键查询个人信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> getUserInfoByKey(Dto pDto);
}
