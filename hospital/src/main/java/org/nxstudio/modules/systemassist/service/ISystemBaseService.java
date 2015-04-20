package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.vo.UserInfoVo;

import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 黄琦鸿
 * 主题:【系统辅助】
 * 时间: 2014年1月24日 17:48:41
 */
public interface ISystemBaseService {
    public String saveOrUpdateOrDelUserRelation(Dto dto, UserInfoVo user);

    public List<Dto> getAllParentsUser(String CurUser);

    public List<Dto> getAllParentsUserByAccount(String CurUserAccount);

    public String getMaxLevelUser(String CurUser);

    public String saveLeaveUserTask(Dto pDto);
}
