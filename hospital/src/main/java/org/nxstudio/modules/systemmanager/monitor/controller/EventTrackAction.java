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
 * 事件跟踪Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-09-12
 */
@Controller
@RequestMapping("/eventTrack")
public class EventTrackAction extends BaseAction {
    @Autowired
    private MonitorService monitorService;
//    = (MonitorService)super.getService("monitorService");

    /**
     * 事件跟踪页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=init")
    public String init(HttpServletRequest request,
                       HttpServletResponse response) throws Exception {
        return "/arm/eventTrack";
    }

    /**
     * 查询事件列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryEvents")
    public String queryEvents(HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("ksrq", G4Utils.Date2String(dto.getAsDate("ksrq"), "yyyyMMdd000000"));
        dto.put("jsrq", G4Utils.Date2String(dto.getAsDate("jsrq"), "yyyyMMdd235959"));
        List eventList = g4Reader.queryForPage("Monitor.queryEventsByDto", dto);
        for (int i = 0; i < eventList.size(); i++) {
            Dto dto2 = (BaseDto) eventList.get(i);
            dto2.put("activetime", G4Utils.stringToDate(dto2.getAsString("activetime"), "yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss"));
        }
        Integer totalCount = (Integer) g4Reader.queryForObject("Monitor.queryEventsByDtoForPageCount", dto);
        String jsonString = encodeList2PageJson(eventList, totalCount, G4Constants.FORMAT_DateTime);
        write(jsonString, response);
        return null;
    }

    /**
     * 删除事件
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteEvents")
    public String deleteEvents(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        monitorService.deleteEvent(dto);
        if (dto.getAsString("type").equalsIgnoreCase("reset"))
            setOkTipMsg("清空成功,所有事件已被清除!", response);
        else
            setOkTipMsg("数据删除成功!", response);
        return null;
    }
}
