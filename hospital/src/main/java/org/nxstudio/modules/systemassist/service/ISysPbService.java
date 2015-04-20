package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统排班业务层】
 * 时间: 2013-06-10 下午4:36
 */
public interface ISysPbService {

    /**
     * 添加部门日历关系
     */
    public Dto addCalendarDeptR(Dto pDto);

    /**
     * 删除部门日历关系
     */
    public Dto delCalendarDeptR(Dto pDto);


    /**
     * 添加规律排班信息
     */
    public Dto addRegPbInfo(Dto pDto);

    /**
     * 删除规律排班信息
     */
    public Dto delRegPbInfo(Dto pDto);

    /**
     * 更新规律排班信息
     */
    public Dto updRegPbInfo(Dto pDto);


    /**
     * 生成排班信息
     */
    public Dto createPbInfo(Dto pDto);

    /**
     * 获取某个人在两个时间点内的排班信息
     */
    public List getPbInfoByTwoTime(Date beginDate, Date endDate, String userId) throws ParseException;

    /**
     * 根据行事历获取结束时间
     *
     * @param start
     * @param diffSecond
     * @param account
     * @return
     */
    public Date EndTimeByWork(Date start, int diffSecond, String account);

    /**
     * 获取工作时间差
     *
     * @param beginDate
     * @param endDate
     * @param userAccount
     * @return
     */
    public int WorkTimeDiff(Date beginDate, Date endDate, String userAccount);
}
