package org.nxstudio.modules.oa.service;

import org.nxstudio.core.model.Dto;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【用户子信息管理】
 * 时间: 2013-06-10 下午4:36
 */
public interface IUserSubInfoService {

    /**
     * 更新一条用户信息
     */
    public Dto updUserInfo(Dto dto);

    /**
     * 查询一条用户信息（根据id)
     */
    public Dto selectUserInfo(Dto dto);

    /**
     * 根据登录账号查询用户的所有可引用信息
     */
    public Dto selectUserInfoByAccount(String account);
}
