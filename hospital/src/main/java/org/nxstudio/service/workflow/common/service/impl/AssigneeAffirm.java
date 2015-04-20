package org.nxstudio.service.workflow.common.service.impl;

import org.activiti.engine.HistoryService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.history.HistoricTaskInstance;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-6-11
 * Time: 上午10:39
 * =================================
 * 确定环节执行人
 */
@Service
public class AssigneeAffirm {
    /**
     * 工作流服务
     */
    @Autowired
    private IActivitiService activitiService;
    //
//    @Autowired
//    protected Dao this;
    @Autowired
    @Qualifier("generalDao")
    protected GeneralDao generalDao;
    /**
     * 组织机构管理
     */
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private HistoryService historyService;


    /**
     * 确定环节操作人
     */
    public void Affirm(DelegateTask delegateTask) throws Exception {
        Dto assDto = activitiService.findAssigneeByTaskId(delegateTask.getProcessDefinitionId(), delegateTask.getTaskDefinitionKey());
        if (assDto.size() != 0) {
            Dto dto = new BaseDto();
            List<Dto> list = new ArrayList<Dto>();
            if (assDto.containsKey("assignees")) {
                dto.put("accounts", assDto.getAsString("assignees"));
                list.addAll(generalDao.queryForList("workFlow.findUserByAccounts", dto));
            } else if (assDto.containsKey("groups")) {
                dto.put("roles", assDto.getAsString("groups"));
                list.addAll(generalDao.queryForList("workFlow.findUserByRoles", dto));
            }
            List<Dto> toList = new ArrayList<Dto>();
            for (Dto toDto : list) {
                if (!toList.contains(toDto)) {
                    toList.add(toDto);
                }
            }
            if (toList.size() == 1) {
                //delegateTask.setAssignee(toList.get(0).getAsString("account"));//设置任务的操作人
                activitiService.getTaskService().setAssignee(delegateTask.getId(), toList.get(0).getAsString("account"));
            }
        }
    }

    /**
     * 确定环节操作人
     */
    public void AffirmToUserTask31(DelegateTask delegateTask) throws Exception {
        List<HistoricTaskInstance> list = activitiService.getHistoryService().createHistoricTaskInstanceQuery().taskDefinitionKey("usertask31").processInstanceId(delegateTask.getProcessInstanceId()).orderByHistoricTaskInstanceEndTime().desc().list();
        if (list.size() > 0) {
            HistoricTaskInstance task = list.get(0);
            delegateTask.setAssignee(task.getAssignee());//设置任务的操作人
        }
    }

    /**
     * 根据指定环节来确定当前环节操作人
     *
     * @param delegateTask
     * @param toUserTaskId
     */
    public void AffirmByUserTaskId(DelegateTask delegateTask, String toUserTaskId) {
        List<HistoricTaskInstance> list = activitiService.findHistoricTaskByProcIdAndTaskKey(delegateTask.getProcessInstanceId(), toUserTaskId);
        if (list.size() == 0) {
            throw new NullPointerException("无法根据指定的UserTaskId获取历史环节");
        }
        HistoricTaskInstance task = list.get(0);
        delegateTask.setAssignee(task.getAssignee());//设置任务的操作人
    }

    /**
     * 设置操作人为下单客服对应的课长
     *
     * @param delegateTask
     */
    public void AffirmToSectionByApplyUserId(DelegateTask delegateTask) throws Exception {
        String applyUserAccount = activitiService.findVarInstByProcInstId(delegateTask.getProcessInstanceId(), "applyUserId").toString();
        Dto dto = new BaseDto();
        dto.put("account", applyUserAccount);
        Dto managerDto = organizationService.queryDeptManagerByAccount(dto, false);
        String cadUser = getCadByDeptId(managerDto.getAsString("deptid"));
        if (cadUser == null || "".equals(cadUser)) {
            throw new NullPointerException("无法获取下单人对应的CAD课长");
        }
        delegateTask.setAssignee(cadUser);//设置任务的操作人
    }

    private String getCadByDeptId(String deptid) {
        String caduser = "";
        if (deptid.indexOf("001009001") == 0) {
            caduser = "S09070602";
        } else if (deptid.indexOf("001009002") == 0) {
            caduser = "S00106";
        } else if (deptid.indexOf("001009003") == 0) {
            caduser = "S00670";
        } else if (deptid.indexOf("001009004") == 0) {
            caduser = "S00297";
        }
        return caduser;
    }

    /**
     * 根据某个流程变量(该变量为某个流程的bussinessKey)获取某个环节操作人
     */
    public void AffirmByUserProcessId(DelegateTask delegateTask, String var, String checkVar) throws Exception {
        String businesskey = (String) activitiService.findVarInstByProcInstId(delegateTask.getProcessInstanceId(), var);
        String procInstId = (String) activitiService.findProcInstIdByBusinessKey(businesskey, "myProcess");
//        String procInstId = historyService.createHistoricProcessInstanceQuery().processDefinitionKey("myProcess").processInstanceBusinessKey(businesskey).singleResult().getId();
//     String assignee = (String)activitiService.findVarInstByProcInstId(procInstId,checkVar);
        String assignee = (String) activitiService.findHiVarInstByProcInstId(procInstId, checkVar);
        delegateTask.setAssignee(assignee);//设置任务的操作人
    }


    /**
     * 确认环节的最后操作人
     *
     * @param delegateTask
     */
    public void AffirmUserTaskAssignee(DelegateTask delegateTask) {
        activitiService.saveVarInstByTaskId(delegateTask.getId(), delegateTask.getTaskDefinitionKey() + "Assignee", activitiService.getTaskService().createTaskQuery().taskId(delegateTask.getId()).singleResult().getAssignee());
    }

    public IActivitiService getActivitiService() {
        return activitiService;
    }

    public void setActivitiService(IActivitiService activitiService) {
        this.activitiService = activitiService;
    }

    //    public Dao getthis() {
//        return this;
//    }
//
//    public void setthis(Dao this) {
//        this.this = this;
//    }
    public OrganizationService getOrganizationService() {
        return organizationService;
    }

    public void setOrganizationService(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    public void setHistoryService(HistoryService historyService) {
        this.historyService = historyService;
    }

    public HistoryService getHistoryService() {
        return historyService;
    }
}
