package org.nxstudio.modules.tool.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;

import org.nxstudio.modules.tool.service.ISysCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统日历】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/SysCalendarAction")
public class SysCalendarAction extends BaseAction {
    @Autowired
    // 系统日历业务层
    private ISysCalendarService sysCalService;

    /**
     * 跳转至窗口
     */
    @RequestMapping(params = "reqCode=goJsp")
    public String goJsp(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "goMainJsp";
    }

    /**
     * 添加日历表
     */
    @RequestMapping(params = "reqCode=addCalendar")
    public String addCalendar(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("cal_create_date", new Date());
        pDto.put("cal_create_man", getSessionContainer(request).getUserInfo()
                .getUserid());

        // service
        Dto outDto = sysCalService.addCalendar(pDto);

        // 加工
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("已保存...", response);
        } else {
            setErrTipMsg("日历表编号已存在，请更改后再执行保存操作~", response);
        }

        return "null";
    }

    /**
     * 删除日历表
     */
    @RequestMapping(params = "reqCode=delCalendar")
    public String delCalendar(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.delCalendar(pDto);

        setOkTipMsg("已删除...", response);

        return "null";
    }

    /**
     * 更新日历表
     */
    @RequestMapping(params = "reqCode=updCalendar")
    public String updCalendar(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.updCalendar(pDto);

        setOkTipMsg("已更新...", response);
        return "null";
    }

    /**
     * 分页获取日历表
     */
    @RequestMapping(params = "reqCode=queryCalendar")
    public String queryCalendar(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // params
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // dao
        List list = g4Reader.queryForPage("sysCalendar.queryT_SB_CALENDAR", pDto);
        g4Reader.queryForObject("sysCalendar.countT_SB_CALENDAR", pDto);
        Integer total = (Integer) g4Reader.queryForObject(
                "sysCalendar.countT_SB_CALENDAR", pDto);

        // dealing...
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 设置日历表为基表（其它日历参照基础日历展开）
     */
    @RequestMapping(params = "reqCode=setBaseCalendar")
    public String setBaseCalendar(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.updSetCalendar(pDto);

        setOkTipMsg("已更新...", response);
        return "null";
    }

    /**
     * 设置某日历表的时间规则
     */
    @RequestMapping(params = "reqCode=setCalTime")
    public String setCalTime(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.setCalTime(pDto);

        setOkTipMsg("已保存", response);

        return "null";
    }

    /**
     * 获取某日历表的时间规则
     */
    @RequestMapping(params = "reqCode=getCalTime")
    public String getCalTime(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 查询
        List list = g4Reader.queryForList("sysCalendar.queryT_SB_CALENDAR_TIME", pDto);

        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 添加节假日
     */
    @RequestMapping(params = "reqCode=addHoliday")
    public String addHoliday(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.addHoliday(pDto);

        // 加工
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("已添加...", response);
        } else {
            setErrTipMsg("节假日已存在，请更改后再执行保存操作~", response);
        }

        return "null";
    }

    /**
     * 删除节假日
     */
    @RequestMapping(params = "reqCode=delHoliday")
    public String delHoliday(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.delHoliday(pDto);

        setOkTipMsg("已删除...", response);

        return "null";
    }

    /**
     * 更新节假日
     */
    @RequestMapping(params = "reqCode=updHoliday")
    public String updHoliday(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.updHoliday(pDto);

        setOkTipMsg("已保存...", response);

        return "null";
    }

    /**
     * 查询所有节假日
     */
    @RequestMapping(params = "reqCode=queryHoliday")
    public String queryHoliday(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        List list = g4Reader.queryForList(
                "sysCalendar.queryT_SB_CALENDAR_HOLIDAY", pDto);

        // dealing...
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 添加日历表明细
     */
    @RequestMapping(params = "reqCode=addCalendarMx")
    public String addCalendarMx(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.addCalendarMx(pDto);

        // 加工
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg(outDto.getAsString("mx_no"), response);
        } else {
            setErrTipMsg("该日特殊安排信息已存在，建议刷新窗口后再执行保存操作~", response);
        }

        return "null";
    }

    /**
     * 删除日历表明细
     */
    @RequestMapping(params = "reqCode=delCalendarMx")
    public String delCalendarMx(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.delCalendarMx(pDto);

        setOkTipMsg("已删除...", response);

        return "null";
    }

    /**
     * 更新日历表明细
     */
    @RequestMapping(params = "reqCode=updCalendarMx")
    public String updCalendarMx(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = sysCalService.updCalendarMx(pDto);

        setOkTipMsg(outDto.getAsString("mx_no"), response);

        return "null";
    }

    /**
     * 查询日历表明细（按年份查询)
     */
    @RequestMapping(params = "reqCode=queryCalendarMx")
    public String queryCalendarMx(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        System.err.println(pDto.toString());
        // service
        List list = g4Reader.queryForList("sysCalendar.queryT_SB_CALENDAR_MX",
                pDto);

        // dealing...
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

}
