package org.nxstudio.modules.tool.service;

import org.nxstudio.core.model.Dto;

import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统行事历业务层】
 * 时间: 2013-06-10 下午4:36
 */
public interface ISysCalendarService {

    /**
     * 添加日历表
     */
    public Dto addCalendar(Dto pDto);

    /**
     * 删除日历表
     */
    public Dto delCalendar(Dto pDto);

    /**
     * 更新日历表
     */
    public Dto updCalendar(Dto pDto);

    /**
     * 获取一条日历表
     */
    public Dto getOneCalendar(Dto pDto);

    /**
     * 分页获取日历表列表
     */
    public List<Dto> getCalendarList(Dto pDto);

    /**
     * 设置日历表为基表（其它日历参照基础日历展开）
     */
    public Dto updSetCalendar(Dto pDto);

    /**
     * 添加节假日
     */
    public Dto addHoliday(Dto pDto);

    /**
     * 删除节假日
     */
    public Dto delHoliday(Dto pDto);

    /**
     * 更新节假日
     */
    public Dto updHoliday(Dto pDto);

    /**
     * 查询某个节假日
     */
    public Dto getOneHoliday(Dto pDto);

    /**
     * 查询所有节假日
     */
    public Dto getHolidayList(Dto pDto);


    /**
     * 添加日历表明细
     */
    public Dto addCalendarMx(Dto pDto);

    /**
     * 删除日历表明细
     */
    public Dto delCalendarMx(Dto pDto);

    /**
     * 更新日历表明细
     */
    public Dto updCalendarMx(Dto pDto);

    /**
     * 查询某条日历表明细
     */
    public Dto getOneCalendarMx(Dto pDto);

    /**
     * 查询日历表明细（按年份查询)
     */
    public Dto getCalendarMxList(Dto pDto);

    /**
     * 修改某个日历的工作时间设定
     */
    public Dto setCalTime(Dto pDto);

}
