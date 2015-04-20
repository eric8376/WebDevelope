package org.nxstudio.modules.tool.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.tool.dao.SysCalendarDao;
import org.nxstudio.modules.tool.service.ISysCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共附件管理】
 * 时间: 2013-06-10 下午4:36
 */
@Service("sysCalService")
public class SysCalendarService implements ISysCalendarService {

    @Autowired
    private SysCalendarDao sysCalendarDao;

    @Override
    public Dto addCalendar(Dto pDto) {

        Dto outDto = (Dto) sysCalendarDao.queryForObject("sysCalendar.selectT_SB_CALENDAR",
                pDto);
        if (outDto == null) {
            // dao
            sysCalendarDao.insert("sysCalendar.insertT_SB_CALENDAR", pDto);

            // 增加时间设定
            String str_tmp = (String) sysCalendarDao
                    .queryForObject("sysCalendar.maxT_SB_CALENDAR_TIME");
            int maxNo = str_tmp == null ? 1 : Integer.parseInt(str_tmp) + 1;
            pDto.put("begin_work_time", "9:00");
            pDto.put("end_work_time", "18:00");
            pDto.put("begin_wuxiu_time", "12:00");
            pDto.put("end_wuxiu_time", "13:30");
            for (int i = 0; i <= 7; i++) {
                pDto.put("week_type", i);
                pDto.put("time_no", maxNo++);
                sysCalendarDao.insert("sysCalendar.insertT_SB_CALENDAR_TIME", pDto);
            }
            pDto.put("success", true);
        } else {
            pDto.put("success", false);
        }

        return pDto;
    }

    @Override
    public Dto delCalendar(Dto pDto) {
        // dao
        sysCalendarDao.delete("sysCalendar.delete2T_SB_CALENDAR_MX", pDto);// 删除明细
        sysCalendarDao.delete("sysCalendar.deleteT_SB_CALENDAR_TIME", pDto);// 删除时间设定
        sysCalendarDao.delete("sysCalendar.deleteT_SB_CALENDAR", pDto);// 删除日历

        return pDto;
    }

    @Override
    public Dto updCalendar(Dto pDto) {
        // dao
        sysCalendarDao.update("sysCalendar.updateT_SB_CALENDAR", pDto);

        return pDto;
    }

    @Override
    public Dto updSetCalendar(Dto pDto) {
        // dao
        // 把所有基础设定清空
        String cal_no = pDto.getAsString("cal_no");
        pDto.put("cal_isbase", 0);
        pDto.put("cal_no", null);
        sysCalendarDao.update("sysCalendar.updateSetT_SB_CALENDAR", pDto);

        // 设定该基础日历
        pDto.put("cal_isbase", 1);
        pDto.put("cal_no", cal_no);
        sysCalendarDao.update("sysCalendar.updateSetT_SB_CALENDAR", pDto);

        return pDto;
    }

    @Override
    public Dto setCalTime(Dto pDto) {
        // dao
        for (int i = 0; i <= 7; i++) {
            pDto.put("week_type", i);// 设定类型
            pDto.put("begin_work_time", pDto.getAsString("w" + i + "1"));// 设定上班时间
            pDto.put("end_work_time", pDto.getAsString("w" + i + "2"));// 设定下班时间
            pDto.put("begin_wuxiu_time", pDto.getAsString("w" + i + "3"));// 设定午休开始时间
            pDto.put("end_wuxiu_time", pDto.getAsString("w" + i + "4"));// 设定午休结束时间
            sysCalendarDao.update("sysCalendar.updateT_SB_CALENDAR_TIME", pDto);
        }

        return pDto;
    }

    @Override
    public Dto getOneCalendar(Dto pDto) {
        // 查询在action处可直接 调用sql
        return pDto;
    }

    /**
     * 分页获取日历表列表
     */
    public List<Dto> getCalendarList(Dto pDto) {
        // 查询在action处可直接 调用sql
        return null;
    }

    @Override
    public Dto addHoliday(Dto pDto) {
        Dto outDto = (Dto) sysCalendarDao.queryForObject(
                "sysCalendar.selectT_SB_CALENDAR_HOLIDAY", pDto);
        if (outDto == null) {
            // dao
            String maxno = (String) sysCalendarDao
                    .queryForObject("sysCalendar.maxnoT_SB_CALENDAR_HOLIDAY");
            if (maxno == null) {
                pDto.put("hol_no", 1);
            } else {
                pDto.put("hol_no", Integer.parseInt(maxno) + 1);
            }
            sysCalendarDao.insert("sysCalendar.insertT_SB_CALENDAR_HOLIDAY", pDto);
            pDto.put("success", true);
        } else {
            pDto.put("success", false);
        }

        return pDto;
    }

    @Override
    public Dto delHoliday(Dto pDto) {
        // dao
        sysCalendarDao.delete("sysCalendar.deleteT_SB_CALENDAR_HOLIDAY", pDto);

        return pDto;
    }

    @Override
    public Dto updHoliday(Dto pDto) {
        // dao
        sysCalendarDao.update("sysCalendar.updateT_SB_CALENDAR_HOLIDAY", pDto);

        return pDto;
    }

    @Override
    public Dto getOneHoliday(Dto pDto) {
        // 查询可真接在action中查询
        return null;
    }

    @Override
    public Dto getHolidayList(Dto pDto) {
        // 查询可真接在action中查询
        return null;
    }

    @Override
    public Dto addCalendarMx(Dto pDto) {
        // dao
        Dto outDto = (Dto) sysCalendarDao.queryForObject(
                "sysCalendar.selectT_SB_CALENDAR_MX", pDto);
        if (outDto == null) {
            // dao
            String maxno = (String) sysCalendarDao
                    .queryForObject("sysCalendar.maxnoT_SB_CALENDAR_MX");
            if (maxno == null) {
                pDto.put("mx_no", 1);
            } else {
                pDto.put("mx_no", Integer.parseInt(maxno) + 1);
            }
            sysCalendarDao.insert("sysCalendar.insertT_SB_CALENDAR_MX", pDto);
            pDto.put("success", true);
        } else {
            pDto.put("success", false);
        }

        return pDto;
    }

    @Override
    public Dto delCalendarMx(Dto pDto) {
        // dao
        sysCalendarDao.update("sysCalendar.deleteT_SB_CALENDAR_MX", pDto);

        return pDto;
    }

    @Override
    public Dto updCalendarMx(Dto pDto) {
        // dao
        sysCalendarDao.update("sysCalendar.updateT_SB_CALENDAR_MX", pDto);

        return pDto;
    }

    @Override
    public Dto getOneCalendarMx(Dto pDto) {
        // 查询可真接在action中查询
        return null;
    }

    @Override
    public Dto getCalendarMxList(Dto pDto) {
        // 查询可真接在action中查询
        return null;
    }

}
