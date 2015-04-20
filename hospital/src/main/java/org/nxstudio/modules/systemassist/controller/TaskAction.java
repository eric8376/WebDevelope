package org.nxstudio.modules.systemassist.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.ITaskService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;
import org.quartz.CronExpression;
import org.quartz.JobDataMap;

import org.nxstudio.modules.systemassist.service.impl.TServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务管理Action】
 * 时间: 2013-06-10 下午4:36
 */

@Controller
@RequestMapping("/TaskAction")
public class TaskAction extends BaseAction {
    @Resource
    private TServer tServer;

    /**
     * 查询所有历史队列
     */
    @RequestMapping(params = "reqCode=getHisQue")
    public String getHisQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 查询
        List list = g4Reader.queryForPage("taskMgr.queryT_SB_TSERVER_HISTORY_QUE", pDto);
        int total = (Integer) g4Reader.queryForObject("taskMgr.countT_SB_TSERVER_HISTORY_QUE", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total, G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询当前所有一般队列
     */
    @RequestMapping(params = "reqCode=getSTQue")
    public String getSTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 查询
        List list = g4Reader.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_ST");


        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询某队列的参数表
     */
    @RequestMapping(params = "reqCode=getQueParams")
    public String getQueParams(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 查询
        List list = g4Reader.queryForList("taskMgr.queryT_SB_TSERVER_QUE_PARAMS", pDto);


        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 创建一般任务
     */
    @RequestMapping(params = "reqCode=newSTQue")
    public String newSTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        try {
            Class.forName(pDto.getAsString("class_name"));
        } catch (Exception e) {
            setErrTipMsg("您所填写的类命名所对应的java类不存在,请检查后再进行添加!", response);
            return "null";
        }

        //参数确认
        String[] dateStrings = pDto.getAsString("date").split("-");
        int year = Integer.parseInt(dateStrings[0]);
        int month = Integer.parseInt(dateStrings[1]);
        int date = Integer.parseInt(dateStrings[2]);
        int hour = Integer.parseInt(pDto.getAsString("t1"));
        int minute = Integer.parseInt(pDto.getAsString("t2"));
        Date begindate = new Date(year - 1900, month - 1, date, hour, minute);

        JobDataMap map = new JobDataMap();
        String[] keys = pDto.getAsString("keys").split(",");
        String[] values = pDto.getAsString("values").split(",");
        for (int i = 0; i < keys.length; i++) {
            if (keys[i] != "") {
                map.put(keys[i], values[i]);
            }
        }

        // 创建一般任务
        int res = tServer.createST(begindate,
                pDto.getAsInteger("repeat_count"),
                pDto.getAsLong("repeat_interval"),
                pDto.getAsString("class_name"), map,
                pDto.getAsString("explain"));

        if (res > 0) {
            setOkTipMsg("该任务已创建", response);
        } else {
            setErrTipMsg("任务未创建成功！！！！！！！", response);
        }

        return "null";
    }

    /**
     * 终止一般任务
     */
    @RequestMapping(params = "reqCode=delSTQue")
    public String delSTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 终止任务
        boolean res = tServer.stopST(pDto.getAsString("serial"), 2);

        if (res) {
            setOkTipMsg("该任务已被web客户端强制终止了！", response);
        } else {
            setErrTipMsg("任务未成功终止！！！！！！！", response);
        }

        return "null";
    }

    /**
     * 查询当前所有周期任务队列
     */
    @RequestMapping(params = "reqCode=getCTQue")
    public String getCTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 查询
        List list = g4Reader.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_CT");

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 创建周期任务
     */
    @RequestMapping(params = "reqCode=newCTQue")
    public String newCTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        try {
            Class.forName(pDto.getAsString("class_name"));
        } catch (Exception e) {
            setErrTipMsg("您所填写的类命名所对应的java类不存在,请检查后再进行添加!", response);
            return "null";
        }

        try {
            CronExpression cronExp = new CronExpression(pDto.getAsString("cron_exp"));
        } catch (Exception e) {
            setErrTipMsg("您所填写的Cron表达式无法被解析,请检查后再进行添加!", response);
            return "null";
        }

        //参数确认
        JobDataMap map = new JobDataMap();
        String[] keys = pDto.getAsString("keys").split(",");
        String[] values = pDto.getAsString("values").split(",");
        for (int i = 0; i < keys.length; i++) {
            if (keys[i] != "") {
                map.put(keys[i], values[i]);
            }
        }

        // 创建周期任务
        tServer.createCT(pDto.getAsString("class_name"), map, pDto.getAsString("cron_exp"), pDto.getAsString("explain"));
        setOkTipMsg("该任务已创建", response);

        return "null";
    }

    /**
     * 终止周期性任务
     */
    @RequestMapping(params = "reqCode=delCTQue")
    public String delCTQue(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 接参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 终止任务
        boolean res = tServer.stopCT(pDto.getAsString("serial"), 2);

        if (res) {
            setOkTipMsg("该任务已被web客户端强制终止了！", response);
        } else {
            setErrTipMsg("任务未成功终止！！！！！！！", response);
        }

        return "null";
    }


}
