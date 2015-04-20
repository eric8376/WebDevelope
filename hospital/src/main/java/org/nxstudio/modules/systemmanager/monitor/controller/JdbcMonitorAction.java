package org.nxstudio.modules.systemmanager.monitor.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.monitor.service.MonitorService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * JDBC监控
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-09-03
 */
@Controller
@RequestMapping("/jdbcMonitor")
public class JdbcMonitorAction extends BaseAction {
    @Autowired
    private MonitorService monitorService;
//            = (MonitorService) super.getService("monitorService");

    /**
     * JDBC实时监控页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=jdbcInit")
    public String jdbcInit(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {

        return "/arm/jdbcMonitor";
    }

    /**
     * 查询监控信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryMonitorData")
    public String queryMonitorData(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("ksrq", G4Utils.Date2String(dto.getAsDate("ksrq"), "yyyyMMdd000000"));
        dto.put("jsrq", G4Utils.Date2String(dto.getAsDate("jsrq"), "yyyyMMdd235959"));
        List eventList = g4Reader.queryForPage("Monitor.queryJdbcMonitorRecordsByDto", dto);
        for (int i = 0; i < eventList.size(); i++) {
            Dto dto2 = (BaseDto) eventList.get(i);
            dto2.put("starttime", G4Utils.stringToDate(dto2.getAsString("starttime"), "yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss"));
            dto2.put("effectrows", dto2.getAsString("effectrows").equals("-1") ? "-" : dto2.getAsString("effectrows"));
        }
        Integer totalCount = (Integer) g4Reader.queryForObject("Monitor.queryJdbcMonitorRecordsByDtoForPageCount", dto);
        String jsonString = encodeList2PageJson(eventList, totalCount, G4Constants.FORMAT_DateTime);
        write(jsonString, response);
        return null;
    }

    /**
     * 删除监控信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteMonitorDatas")
    public String deleteMonitorDatas(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        monitorService.deleteJDBCMonitorData(dto);
        if (dto.getAsString("type").equalsIgnoreCase("reset"))
            setOkTipMsg("执行成功,所有监控记录已被清除!", response);
        else
            setOkTipMsg("数据删除成功!", response);
        return null;
    }

}
