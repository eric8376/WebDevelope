package org.nxstudio.service.workflow.common.controller;

import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.modules.exception.TaskFlowAwayException;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.util.io.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

/**
 * 工作流
 *
 * @author zhangwei
 */
@Controller
@RequestMapping("/WorkFlowAction")
public class WorkFlowAction extends BaseAction {
    @Autowired
    private IActivitiService activitiService;

    /**
     * 工作流首页初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=tabPannelInit")
    public String tabPannelInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/WorkFlow";
    }

    /**
     * 工作流待办页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=inhandworkInit")
    public String inhandworkInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/inhandworkPage";
    }

    /**
     * 工作流在办页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=haveworkingworkInit")
    public String haveworkingworkInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/haveworkingworkPage";
    }

    /**
     * 工作流管理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=flowdefineInit")
    public String flowdefineInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processDefinitionManage";
    }

    /**
     * 部署流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=flowdeploy")
    public String flowdeploy(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<MultipartFile> UploadFileInfo = FileUpload.getUploadFile(request);
        if (G4Utils.isNotEmpty(UploadFileInfo)) {
            for (MultipartFile multipartfile : UploadFileInfo) {
                String fileName = multipartfile.getOriginalFilename();
                InputStream ipts = multipartfile.getInputStream();
                activitiService.doDeployProcess(fileName, ipts);
            }
        }
        setOkTipMsg("流程部署成功", response);
        return null;
    }

    /**
     * 获取所有已部署的流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=flowListFind")
    public String flowListFind(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = activitiService.processList();
        //List list =g4Reader.queryForList("Organization.getUserInfo");
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 开启流程实例
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=startWorkFlow")
    public String startWorkFlow(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        Dto visDto = new BaseDto();
        String variables = dto.getAsString("variables");
        if (variables != null && variables.length() > 0) {
            String[] l = variables.split(",");
            for (String item : l) {
                String[] kv = item.split(":");
                visDto.put(kv[0], kv[1]);
            }
        }
        visDto.put("applyUserId", super.getSessionContainer(request).getUserInfo().getAccount());
        activitiService.doStartWorkflow(dto.getAsString("processKey"), dto.getAsString("businessKey"), visDto);
        super.write("{success:true,data:{msg:'提交成功!'}}", response);
        return null;
    }

    /**
     * 提交流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=submitWorkFlow")
    public String submitWorkFlow(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            CommonActionForm aForm = (CommonActionForm) form;
            Dto dto = aForm.getParamAsDto(request);
            Dto visDto = new BaseDto();
            String variables = dto.getAsString("variables");
            if (variables != null && variables.length() > 0) {
                String[] l = variables.split(",");
                for (String item : l) {
                    String[] kv = item.split(":");
                    visDto.put(kv[0], kv[1]);
                }
            }
            if (dto.containsKey("nextFlow")) {
                visDto.put("nextFlow", dto.getAsString("nextFlow"));
            }
            activitiService.doSubmitWorkFlow(dto.getAsString("taskId"), visDto, dto);
            String nextTaskName = "";
            if (dto.containsKey("nextTaskName")) {
                nextTaskName = "<b>" + dto.getAsString("nextTaskName") + "</b>";
            } else {
                nextTaskName = "下一";
            }
            super.write("{success:true,data:{msg:'成功将流程提交到" + nextTaskName + "环节!'}}", response);
        } catch (Exception ex) {
            super.write("{success:false,data:{msg:'流程提交失败!<br/>" + ex.getMessage() + "'}}", response);
        }
        return null;
    }

    /**
     * 获取下一环节节点
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findNextTaskByProcKey")
    public String findNextTaskByProcKey(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List<Dto> list = activitiService.findNextTaskByProcKey(dto.getAsString("processKey"), dto.getAsString("activityId"));
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write("{success:true,data:" + jsonString + "}", response);
        return null;
    }

    /**
     * 获取下一环节节点
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findNextTask")
    public String findNextTask(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        try {
            List<Dto> list = activitiService.findNextTask(dto.getAsString("processId"), dto.getAsString("taskId"));
            String jsonString = JsonHelper.encodeObject2Json(list);
            super.write("{success:true,data:" + jsonString + "}", response);
        } catch (TaskFlowAwayException ex) {
            super.write("{success:false,data:{msg:'" + ex.getMessage() + "'}}", response);
        }
        return null;
    }

    /**
     * 获取流程待办
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=flowLinkProjectTodoByUserId")
    public String flowLinkProjectTodoByUserId(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        UserInfoVo userInfoVo = super.getSessionContainer(request).getUserInfo();
        dto.put("userid", userInfoVo.getAccount());
        dto.put("user_id", userInfoVo.getUserid());
        String deptid = userInfoVo.getDeptid();
        dto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        List list = g4Reader.queryForPage("workFlow.flowLinkProjectTodoByUserId", dto);
        int count = Integer.parseInt(g4Reader.queryForObject("workFlow.flowLinkProjectTodoByUserIdToCount", dto).toString());
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 获取已结束的流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findEndProcess")
    public String findEndProcess(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("workFlow.findEndProcess", dto);
        int count = Integer.parseInt(g4Reader.queryForObject("workFlow.findEndProcessCount", dto).toString());
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 获取可回退的环节
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findBackAvtivity")
    public String findBackAvtivity(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        if (!dto.containsKey("proc_inst_id_")) {
            throw new NullPointerException("参数传递错误，无法获取必要参数：proc_inst_id_");
        }
        ArrayList<Dto> list = (ArrayList) g4Reader.queryForList("workFlow.findBackTask", dto);
//        ArrayList<Dto> toList = new ArrayList<Dto>();
//        for (Dto inDto : list) {
//            if (!toList.c(inDto)) {
//                toList.add(inDto);
//            }
//        }

        Dto startDto = new BaseDto();
        startDto.put("name_", "起始环节");
        startDto.put("task_def_key_", "cstart");
        if (list.contains(startDto))
            list.remove(startDto);
        list.add(0, startDto);
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 流程回退
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=backProcess")
    public String backProcess(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        Dto visDto = (Dto) dto.get("variables");
        String desc = "用户【" + super.getSessionContainer(request).getUserInfo().getAccount() + "】将流程回退至【" + dto.getAsString("toTaskName") + "】环节";
        activitiService.doBackProcess(dto.getAsString("taskId"), dto.getAsString("toActivityId"), visDto, dto, desc);
        super.write("{success:true,data:{msg:'提交成功，成功将流程回退到<b style=\"color:red;\">" + dto.getAsString("toTaskName") + "</b>环节!'}}", response);
        return null;
    }

    /**
     * 获取用户信息
     *
     * @param assDto
     * @return
     */
    private List<Dto> findUsers(Dto assDto) {
        Dto dto = new BaseDto();
        List<Dto> list = new ArrayList<Dto>();
        if (assDto.containsKey("assignees")) {
            dto.put("accounts", assDto.getAsString("assignees"));
            list.addAll(g4Reader.queryForList("workFlow.findUserByAccounts", dto));
        }
        if (assDto.containsKey("groups")) {
            dto.put("roles", assDto.getAsString("groups"));
            list.addAll(g4Reader.queryForList("workFlow.findUserByRoles", dto));
        }
        List<Dto> toList = new ArrayList<Dto>();
        for (Dto toDto : list) {
            if (!toList.contains(toDto)) {
                toList.add(toDto);
            }
        }
        return toList;
    }

    /**
     * 获取某一环节操作人
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findUserByProcKeyAndActivityId")
    public String findUserByProcKeyAndActivityId(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        Dto assDto = activitiService.findAssigneeByProcessKey(dto.getAsString("processKey"), dto.getAsString("activityId"));
        List<Dto> toList = findUsers(assDto);
        String jsonString = JsonHelper.encodeObject2Json(toList);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 获取某一环节操作人
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findUserByProcInstIdAndActivityId")
    public String findUserByProcInstIdAndActivityId(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        Dto assDto = activitiService.findAssigneeByTaskId(dto.getAsString("procInstanceId"), dto.getAsString("activityId"));
        List<Dto> toList = findUsers(assDto);
        String jsonString = JsonHelper.encodeObject2Json(toList);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 获取正在运行的流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findRunningProcess")
    public String findRunningProcess(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("workFlow.findRunningProcess", dto);
        int count = Integer.parseInt(g4Reader.queryForObject("workFlow.findRunningProcessCount", dto).toString());
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 根据用户获取在办流程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findRunningProcessByAccount")
    public String findRunningProcessByAccount(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("assignee", super.getSessionContainer(request).getUserInfo().getAccount());
        List list = g4Reader.queryForPage("workFlow.findRunningProcessByAccount", dto);
        int count = Integer.parseInt(g4Reader.queryForObject("workFlow.findRunningProcessByAccountCount", dto).toString());
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 获取流程日志
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findHistoryTask")
    public String findHistoryTask(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("assignee", super.getSessionContainer(request).getUserInfo().getAccount());
        ArrayList<Dto> list = (ArrayList) g4Reader.queryForList("workFlow.findHistoryTask", dto);
        List<Dto> procList = g4Reader.queryForList("workFlow.findProcessInstanceByProcInstId", dto);
        Dto startDto = new BaseDto();
//        if (list.size() > 0)
//            startDto.putAll(list.get(0));
        startDto.put("name_", "起始环节");
        startDto.put("task_def_key_", "start");
        if (procList.size() > 0) {
            startDto.put("username", procList.get(0).getAsString("applyuserid"));
            startDto.put("end_time_", procList.get(0).getAsString("start_time_"));
        }
        list.add(0, startDto);
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 通过BusinessKey获取流程日志
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=findHistoryTaskByBusinessKey")
    public String findHistoryTaskByBusinessKey(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("assignee", super.getSessionContainer(request).getUserInfo().getAccount());
        String procInstId = (String) g4Reader.queryForObject("workFlow.findProcInstIdByBusinessKey", dto);
        dto.put("proc_inst_id_", procInstId);
        ArrayList<Dto> list = (ArrayList) g4Reader.queryForList("workFlow.findHistoryTask", dto);
        List<Dto> procList = g4Reader.queryForList("workFlow.findProcessInstanceByProcInstId", dto);
        Dto startDto = new BaseDto();
//        if (list.size() > 0)
//            startDto.putAll(list.get(0));
        startDto.put("name_", "起始环节");
        startDto.put("task_def_key_", "start");
        if (procList.size() > 0) {
            startDto.put("username", procList.get(0).getAsString("applyuserid"));
            startDto.put("end_time_", procList.get(0).getAsString("start_time_"));
        }
        list.add(0, startDto);
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }


    /**
     * 更新流程状态
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=updateProcessState")
    public String updateProcessState(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String state = dto.getAsString("state");
        activitiService.updateProcessState(dto.getAsString("proc_inst_id_"), state);
        super.write("{success:true,data:{msg:'提交成功，成功" + ("active".equals(state) ? "激活" : "挂起") + "流程!'}}", response);
        return null;
    }

    /**
     * 是否会签任务
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=taskIsJoin")
    public String taskIsJoin(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        if (dto.containsKey("taskId")) {
            try {
                super.write("{success:true,data:" + activitiService.taskIsJoin(dto.getAsString("taskId")) + "}", response);
            } catch (TaskFlowAwayException ex) {
                super.write("{success:false,data:{msg:'" + ex.getMessage() + "'}}", response);
            }
        } else {
            super.write("{success:false,data:{msg:'参数传递不完整'}}", response);
        }
        return null;
    }

    /**
     * 任务转办
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=transferAssignee")
    public String transferAssignee(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String desc = "【" + super.getSessionContainer(request).getUserInfo().getAccount() + "】将流程转办至【" + dto.getAsString("userCode") + "】";
        //activitiManager.updateProcessState(dto.getAsString("proc_inst_id_"), state);
        activitiService.doProcessTransferAssignee(dto.getAsString("taskId"), dto.getAsString("userCode"), desc);
        super.write("{success:true,data:{msg:'成功将流程流程转办给<b style=color:red>" + dto.getAsString("userName") + "</b>!'}}", response);
        return null;
    }

    /**
     * 统计一个流程实例的环节耗时
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=TaskTimeStatistics")
    public String TaskTimeStatistics(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        if (dto.containsKey("procInstId")) {
            super.write("{success:false,data:{msg:'传递参数错误'}}", response);
        } else {
            Map<String, Dto> taskTimeInfo = activitiService.TaskTimeStatisticsByPorcInstId(dto.getAsString("procInstId"));
            Iterator iterator = taskTimeInfo.keySet().iterator();
            List<Dto> list = new ArrayList<Dto>();
            Dto inDto = null;
            while (iterator.hasNext()) {
                String key = iterator.next().toString();
                inDto = taskTimeInfo.get(key);
                inDto.put("taskKey", key);
                list.add(inDto);
            }
            String jsonString = JsonHelper.encodeObject2Json(list);
            super.write("{success:false,data:" + jsonString + "}", response);
        }
        return null;
    }

    /**
     * 统计一个流程实例的环节耗时
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=TaskTimeStatisticsToXML")
    public String TaskTimeStatisticsToXML(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        if (dto.containsKey("procInstId")) {
            Map<String, Dto> taskTimeInfo = activitiService.TaskTimeStatisticsByPorcInstId(dto.getAsString("procInstId"));
            Iterator iterator = taskTimeInfo.keySet().iterator();
            Dto inDto = null;

            StringBuffer xmlTxt = new StringBuffer();
            dto.put("PROC_DEF_ID_", dto.getAsString("procInstId"));
            String wf_title = g4Reader.queryForObject("workFlow.findProcessTitleByProcInstId", dto).toString();
            String title = "流程环节耗时图表(单位：分钟)";
            if (wf_title != null) {
                title = wf_title + title;
            }
            xmlTxt.append("<?xml version='1.0' encoding='gb2312'?>");
            xmlTxt.append("<graph baseFontSize='12' baseFont='宋体' caption='" + title + "' showNames='1' numberPrefix='' canvasBorderThickness='1'>");
            while (iterator.hasNext()) {
                String key = iterator.next().toString();
                inDto = taskTimeInfo.get(key);
                xmlTxt.append("<set isSliced='0' name='" + inDto.getAsString("taskName") + "' value='" + inDto.getAsString("consumeTime") + "'/>");
            }
            xmlTxt.append("</graph>");
            super.write(xmlTxt.toString(), response);
        }
        return null;
    }

    /**
     * 统计每个环节，每个人所花费的时间
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=TaskTimeStatisticsEveryOne")
    public String TaskTimeStatisticsEveryOne(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String name = null;
        String overJson = "";
        List sendList = new ArrayList();
        Dto checkDto = new BaseDto();
        String sendStr = "";
        String username = "";
        if (dto.containsKey("procInstId")) {
            Map<String, Dto> taskTimeInfo = activitiService.TaskTimeStatisticsByPorcInstIdEveryOne(dto.getAsString("procInstId"));
//            Iterator iterator = taskTimeInfo.keySet().iterator();
            Dto timeDto = taskTimeInfo.get("alllUserTime");
            Dto userNmae = taskTimeInfo.get("userName");
            for (int i = 0; i < userNmae.size(); i++) {
                name = (String) userNmae.get(i);
                Dto dto1 = new BaseDto();
                dto1.put("account", name);
                username = (String) g4Reader.queryForObject("workFlow.findNameByAccount", dto1);
                List list = timeDto.getAsList(name);
                Iterator iterator = list.iterator();
//                overTime = userNmae+":'" ;
                while (iterator.hasNext()) {
                    String keyAndTime = iterator.next().toString();
                    String[] KAT = keyAndTime.split(":");
                    if (Integer.parseInt(KAT[1]) > 0) {
                        KAT[1] = G4Utils.minuteToWorkingDay(Long.parseLong(KAT[1]));
//                        [{"expenseMoney":1000,"expens":"测试1"},{"expenseMoney":2000,"expens":"测试2"},{"expenseMoney":3000,"expens":"测试3"}]
//                       overTime += KAT[0]+"="+KAT[1]+",";
                        overJson = "{\"name\":\"" + username + "\",\"point\":\"" + KAT[0] + "\",\"time\":\"" + KAT[1] + "\"}";
                        sendList.add(overJson);
                    }
                }
            }
            if (sendList.isEmpty()) {
                overJson = "{\"name\":\"无\",\"point\":\"无\",\"time\":\"无\"}";
                sendList.add(overJson);
                sendStr = JsonHelper.encodeObject2Json(sendList, null);
//                JsonHelper.parseSingleJson2Dto()
            } else {
//                sendStr = overTime.substring(0,overTime.length()-1);
                sendStr = JsonHelper.encodeObject2Json(sendList, null);
            }

            super.write(sendStr, response);
        }
        return null;
    }


    /**
     * 流程提交
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=doProcessAdvance")
    public String doProcessAdvance(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        activitiService.doProcessAdvance(dto);
        super.write("{success:true,data:{msg:'提交成功'}}", response);
        return null;
    }

    /**
     * 流程提交
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=doEndProcess")
    public String doEndProcess(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        activitiService.doEndProcess(dto.getAsString("taskId"));
        super.write("{success:true,data:{msg:'提交成功'}}", response);
        return null;
    }

    /**
     * 获取流程定义资源文件
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=loadByProcessInstance")
    public void loadByProcessInstance(
            HttpServletRequest request, HttpServletResponse response) throws Exception {

        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        InputStream resourceAsStream = activitiService.loadByProcessInstance(dto.getAsString("type"), dto.getAsString("pid"));
        byte[] b = new byte[1024];
        int len = -1;
        while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
            response.getOutputStream().write(b, 0, len);
        }
    }

    /**
     * 获取流程定义资源文件
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=AddVarInstByProcInstId")
    public void AddVarInstByProcInstId(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        if ("ALL".equals(dto.getAsString("porcInstId"))) {
            activitiService.saveVarInstByAll(dto.getAsString("varKey"), dto.getAsString("varValue"));
        } else {
            activitiService.saveVarInstByPorcInstId(dto.getAsString("porcInstId"), dto.getAsString("varKey"), dto.getAsString("varValue"));
        }
        super.write("{success:true,data:{msg:'保存成功'}}", response);
    }

    @RequestMapping(params = "reqCode=traceProcess")
    public String traceProcess(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String pid = dto.getAsString("pid");
        List<Dto> list = activitiService.traceProcess(pid);
        String key;
        for (Dto outDto : list) {
            Dto m = ((Dto) outDto.get("vars"));
            Object s[] = m.keySet().toArray();
            StringBuffer title = new StringBuffer();
            for (int i = 0; i < m.size(); i++) {
                key = s[i].toString();
                title.append(key);
                title.append("：");
                title.append(m.getAsString(key));
                title.append("\n");
            }
            outDto.put("title", title.toString());
        }
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 流程跟踪页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=traceViewInit")
    public String traceViewInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/traceView";
    }

    /**
     * 公开流程回退页面
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=backflowInit")
    public String backflowInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/backProcessManage";
    }

    /**
     * 运行中工作流管理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=runflowInit")
    public String runflowInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/runningprocessManage";
    }

    /**
     * 流程环节耗时报表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=taskConsumeTime")
    public String taskConsumeTime(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        return "/WorkFlow/taskConsumeTime";
    }

    /**
     * 获取流程变量
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=getProcessVar")
    public String getProcessVar(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String varValue = activitiService.findVarInstByProcInstId(dto.getAsString("proc_inst_id_"), dto.getAsString("varKey")).toString();
        super.write(varValue, response);
        return null;
    }

    /**
     * 运行中流程表(动态)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=endProcessInit")
    public String endProcessInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/endProcess";
    }

    /**
     * 运行中流程表(动态)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=runflowlistdynamicInit")
    public String runflowlistdynamicInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processDynamicForm/runningprocessDynamicForm";
    }

    /**
     * 任务列表(动态)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=tasklistdynamicInit")
    public String tasklistdynamicInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processDynamicForm/tasklistdynamicForm";
    }

    /**
     * 流程列表(动态)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=flowlistdynamicInit")
    public String flowlistdynamicInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processDynamicForm/processlistDynamicForm";
    }

    /**
     * 已结束流程(动态)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=endflowdynamicInit")
    public String endflowdynamicInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processDynamicForm/endprocesslistDynamicForm";
    }

    /**
     * 运行中流程表(外置)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=runflowlistoutlayInit")
    public String runflowlistoutlayInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processOutlayForm/runningprocessOutlayForm";
    }

    /**
     * 任务列表(外置)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=tasklistoutlayInit")
    public String tasklistoutlayInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processOutlayForm/tasklistOutlayForm";
    }

    /**
     * 流程列表(外置)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=flowlistoutlayInit")
    public String flowlistoutlayInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processOutlayForm/processlistOutlayForm";
    }

    /**
     * 已结束流程(外置)页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=endflowoutlayInit")
    public String endflowoutlayInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/WorkFlow/processOutlayForm/endprocesslistOutlayForm";
    }


    /**
     * 更改设计师默认操作人
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=changeAssignee")
    public String changeAssignee(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        activitiService.saveVarInstByPorcInstId(dto.getAsString("procId"), "usertask31Assignee", dto.getAsString("userCode"));
//        activitiService.getTaskService().setAssignee();
        activitiService.changeAssignee(dto.getAsString("procId"), "usertask31", dto.getAsString("userCode"));
        super.write("{success:true,data:{msg:'成功将设计环节默认人更改为<b style=color:red>" + dto.getAsString("userName") + "</b>!'}}", response);
        return null;
    }


    /**
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getTaskByTaskIdAndProcessId")
    public String getTaskByTaskIdAndProcessId(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List<Dto> list = activitiService.getTaskByTaskIdAndProcessId("usertask9", "myProcess");
        list.addAll(activitiService.getTaskByTaskIdAndProcessId("task9", "add_supply"));
        List<Dto> newlist = new ArrayList<Dto>();
        for (int i = 0; i < list.size(); i++) {
            if (dto.containsKey("wf_title") && !dto.getAsString("wf_title").equals("") && dto.getAsString("wf_title") != null) {
                if (list.get(i).getAsString("wf_title").indexOf(dto.getAsString("wf_title")) != -1) {
                    newlist.add(list.get(i));
                }
            }
        }
        if (newlist.size() != 0) {
            list = newlist;
        }
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_Date);
        super.write(jsonString, response);
        return null;
    }

    @RequestMapping(params = "reqCode=taskClaim")
    public String taskClaim(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String result = "{success:true,data:{msg:'任务签收成功'}}";
        UserInfoVo userInfoVo = super.getSessionContainer(request).getUserInfo();
        ProcessInstance processInstance = activitiService.findProcessInstanceByTaskId(dto.getAsString("taskid"));
        if (G4Utils.isNotEmpty(processInstance)) {
            List<Task> taskslist = activitiService.getTaskService().createTaskQuery().taskId(dto.getAsString("taskid")).list();
            if (G4Utils.isEmpty(taskslist)) {
                result = "{error:true,data:{msg:'未找到任务实例，无法签收，请刷新页面'}}";
            } else {
                if (G4Utils.isNotEmpty(taskslist.get(0).getAssignee())) {
                    result = "{error:true,data:{msg:'任务已签收，无法签收，请刷新页面'}}";
                } else {
                    activitiService.dotaskClaim(dto.getAsString("taskid"), userInfoVo.getAccount());
                }
            }
        } else {
            result = "{error:true,data:{msg:'未找到流程无法签收，无法签收，请刷新页面'}}";
        }
        super.write(result, response);
        return null;
    }

}
