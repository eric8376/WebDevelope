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
 * SpringBean监控
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-09-20
 */
@Controller
@RequestMapping("/beanMonitor")
public class BeanMonitorAction extends BaseAction {
    @Autowired
    private MonitorService monitorService;


    @RequestMapping(params = "reqCode=init")
    public String init() {
        return "/arm/beanMonitor";
    }

    @RequestMapping(params = "reqCode=queryMonitorDatas")
    public void queryMonitorDatas(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        CommonActionForm aForm = new CommonActionForm();
        Dto dto = aForm.getParamAsDto(request);
        dto.put("ksrq", G4Utils.Date2String(dto.getAsDate("ksrq"), "yyyyMMdd000000"));
        dto.put("jsrq", G4Utils.Date2String(dto.getAsDate("jsrq"), "yyyyMMdd235959"));
        List eventList = g4Reader.queryForPage("Monitor.queryExceptionRecordsByDto", dto);
        for (int i = 0; i < eventList.size(); i++) {
            Dto dto2 = (BaseDto) eventList.get(i);
            dto2.put("activetime", G4Utils.stringToDate(dto2.getAsString("activetime"), "yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss"));
        }
        Integer totalCount = (Integer) g4Reader.queryForObject("Monitor.queryExceptionRecordsByDtoForPageCount", dto);
        String jsonString = encodeList2PageJson(eventList, totalCount, G4Constants.FORMAT_DateTime);
        write(jsonString, response);
    }

    @RequestMapping(params = "reqCode=deleteMonitorDatas")
    public void deleteMonitorDatas(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = new CommonActionForm();
        Dto dto = aForm.getParamAsDto(request);
        monitorService.deleteMonitorData(dto);
        if (dto.getAsString("type").equalsIgnoreCase("reset"))
            setOkTipMsg("执行成功,所有监控记录已被清除!", response);
        else
            setOkTipMsg("数据删除成功!", response);
    }


}
