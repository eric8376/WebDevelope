package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ActivitisManage;
import org.nxstudio.service.workflow.common.service.IRTXInform;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.aspectj.lang.ProceedingJoinPoint;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-8-7
 * Time: 上午10:11
 * =================================
 */
@Service("RTXInform")
public class RTXInform extends ActivitisManage implements IRTXInform {

    /**
     * 发送流程达到通知
     *
     * @param pjp
     * @throws Throwable
     */
    public synchronized void TaskArriveWarn(ProceedingJoinPoint pjp) throws Throwable {
        if (pjp.getSignature().getName().equals("doProcessTransferAssignee")) {
            Task AssigneeTask = findTaskById(pjp.getArgs()[0].toString());
            if (G4Utils.isNotEmpty(AssigneeTask)) {
                //获取该用户的最终代理对象     String taskId, String assignee, String desc
                String ProxyUserAccount = getLastProxyUser(pjp.getArgs()[1].toString());
                if (G4Utils.isNotEmpty(ProxyUserAccount)) {
                    pjp.getArgs()[1] = ProxyUserAccount;
                }
                pjp.proceed(pjp.getArgs());
                //发送rtx提醒
                doTaskWarn(AssigneeTask.getId(), AssigneeTask.getAssignee());
//                atool.beginFlowWorkEvent(AssigneeTask.getId(), AssigneeTask.getProcessInstanceId(), AssigneeTask.getProcessDefinitionId(), AssigneeTask.getTaskDefinitionKey(), AssigneeTask.getAssignee());//开始任务催办
            } else {
                throw new NullPointerException("转办异常，无法获取TaskId");
            }

        } else {
            if (pjp.getArgs()[0] == null)
                throw new NullPointerException("发送流程到达通知异常，无法获取TaskId");
            String taskId = pjp.getArgs()[0].getClass() == BaseDto.class ? (((Dto) pjp.getArgs()[0]).getAsString("taskId")) : pjp.getArgs()[0].toString();
            Task beforeTask = null;
            List<HistoricTaskInstance> beforeTasks = new ArrayList<HistoricTaskInstance>();
            if (!"".equals(taskId)) {
                beforeTask = findTaskById(taskId);
                beforeTasks = historyService.createHistoricTaskInstanceQuery().processInstanceId(beforeTask.getProcessInstanceId()).list();
            }
            Object obj = pjp.proceed();
            if (pjp.getSignature().getName().equals("doBackProcess")) {
                List<HistoricTaskInstance> afterTasks = historyService.createHistoricTaskInstanceQuery().processInstanceId(beforeTask.getProcessInstanceId()).list();
                if (afterTasks != null && afterTasks.size() != 0) {
                    int count = afterTasks.size();
                    for (int i = 0; i < count; i++) {
                        HistoricTaskInstance task = afterTasks.get(i);
                        if (!itemIsExist(task, beforeTasks)) {
                            String ProxyUserAccount = getLastProxyUser(task.getAssignee());
                            if (G4Utils.isNotEmpty(ProxyUserAccount)) {
                                Dto inDto = new BaseDto();
                                inDto.put("assignee", ProxyUserAccount);
                                inDto.put("taskid", task.getId());
                                generalDao.update("workFlow.updateTaskAssignee", inDto);
                            }
                            doTaskWarn(task.getId(), task.getAssignee());
//                            atool.beginFlowWorkEvent(task.getId(), task.getProcessInstanceId(), task.getProcessDefinitionId(), task.getTaskDefinitionKey(), task.getAssignee());//开始任务催办
                        }
                    }
                }
            } else if (pjp.getSignature().getName().equals("doProcessAdvance")) {
                List<Task> afterTasks = taskService.createTaskQuery().processInstanceId(((ProcessInstance) obj).getProcessInstanceId()).list();
                int count = afterTasks.size();
                for (int i = 0; i < count; i++) {
                    Task task = afterTasks.get(i);
                    //获取该用户的最终代理对象
                    String ProxyUserAccount = getLastProxyUser(task.getAssignee());
                    if (G4Utils.isNotEmpty(ProxyUserAccount)) {
                        Dto inDto = new BaseDto();
                        inDto.put("assignee", ProxyUserAccount);
                        inDto.put("taskid", task.getId());
                        generalDao.update("workFlow.updateTaskAssignee", inDto);
                    }
                    doTaskWarn(task.getId(), task.getAssignee());
//                    atool.beginFlowWorkEvent(task.getId(), task.getProcessInstanceId(), task.getProcessDefinitionId(), task.getTaskDefinitionKey(), task.getAssignee());//开始任务催办
                }
            }
        }

    }

    /**
     * 判断一个项是否存在于集合里
     *
     * @param item
     * @param list
     * @return
     */
    private boolean itemIsExist(HistoricTaskInstance item, List<HistoricTaskInstance> list) {
        int count = list.size();
        for (int i = 0; i < count; i++) {
            HistoricTaskInstance task = list.get(i);
            if (item.getId().equals(task.getId())) {
                return true;
            }
        }
        return false;
    }

    /**
     * 发送任务到达提醒
     *
     * @param task
     */
    public void doTaskWarn(String taskId, String assignee) throws Exception {
//        ProcessInstance pi = findProcessInstanceByTaskId(taskId);
//        Dto inDto = new BaseDto();
//        List<Dto> list = findCurrentTaskInfoByPorcInstId(pi.getProcessInstanceId());
//        if (list != null && list.size() > 0) {
//            Dto procDto = list.get(0);
//            String title = "任务到达提醒";
//            Dto pDto = new BaseDto();
//            pDto.put("projectid", pi.getBusinessKey());
//            Object r = generalDao.queryForObject("tasklist.findProjectUrgent", pDto);
//            Integer i = r == null ? 0 : (Integer) r;
//            String msg = "";
//            if (i == 2) {
//                msg = "您有一份【" + procDto.getAsString("wf_title") + "】的【特急】任务到达，请优先完成此任务。";
//            } else if (i == 1) {
//                msg = "您有一份【" + procDto.getAsString("wf_title") + "】的【加急】任务到达，请及时处理。";
//            } else {
//                msg = "您有一份【" + procDto.getAsString("wf_title") + "】的任务到达，请及时处理。";
//            }
//            inDto.clear();
//            inDto.put("receiver", assignee);
//            //inDto.put("receiver", "S00409");
//            inDto.put("title", title);
//            inDto.put("msg", msg);
//            sysComunicateService.sendRTX(inDto);
//        }
    }


    /**
     * 发送任务被结束提醒
     *
     * @param task
     * @throws Exception
     */
    public void doTaskEnd(Task task) throws Exception {
        ProcessInstance pi = findProcessInstanceByTaskId(task.getId());
        Dto inDto = new BaseDto();
        List<Dto> list = findCurrentTaskInfoByPorcInstId(pi.getProcessInstanceId());
        if (list != null && list.size() > 0) {
            Dto procDto = list.get(0);

            Dto pDto = new BaseDto();
            pDto.put("taskId", task.getId());
            List<Dto> suglist = generalDao.queryForList("workFlow.findProcessSuggestionByTaskId", pDto);
            String cause = "";
            if (suglist.size() == 0)
                cause = "原因未知";
            else
                cause = "原因为：" + suglist.get(0).getAsString("suggestion_desc");
            String title = "任务结束提醒";
            String msg = "您在办的一份【" + procDto.getAsString("wf_title") + "】的任务已被强制结束，" + cause + "。";
            inDto.clear();
            inDto.put("receiver", task.getAssignee());
            //inDto.put("receiver", "S00409");
            inDto.put("title", title);
            inDto.put("msg", msg);
            sysComunicateService.sendRTX(inDto);
        }
    }

    /**
     * 发送任务被结束提醒
     *
     * @param task
     * @throws Exception
     */
    public void doTaskEnd(String taskId, String cause) throws Exception {
        ProcessInstance pi = findProcessInstanceByTaskId(taskId);
        Dto inDto = new BaseDto();
        List<Dto> list = findCurrentTaskInfoByPorcInstId(pi.getProcessInstanceId());
        if (list != null && list.size() > 0) {
            Dto procDto = list.get(0);

            Dto pDto = new BaseDto();
            pDto.put("taskId", taskId);
            List<Dto> suglist = generalDao.queryForList("workFlow.findProcessSuggestionByTaskId", pDto);
            String title = "任务结束提醒";
            String msg = "您在办的一份【" + procDto.getAsString("wf_title") + "】的任务已被强制结束，原因：" + cause + "。";
            inDto.clear();
            Task task = findTaskById(taskId);
            inDto.put("receiver", task.getAssignee());
            //inDto.put("receiver", "S00409");
            inDto.put("title", title);
            inDto.put("msg", msg);
            sysComunicateService.sendRTX(inDto);
        }
    }

    private String getLastProxyUser(String CurUser) {
//        String result="";
//        Dto dao=new BaseDto("user_bproxyer",CurUser);
//        //查询代理表，状态为代理中的，申请人是 args【1】的
//        List<Dto> UserProxyInfoList=  generalDao.queryForList("workFlow.getUserProxyInfo",dao);
//        if(G4Utils.isEmpty(UserProxyInfoList))
//        {
//            result= null;
//        }                 else
//        {
//            result=  getLastProxyUser(UserProxyInfoList.get(0).getAsString("user_proxyer"));
//            if(result==null)
//            {
//                result=UserProxyInfoList.get(0).getAsString("user_proxyer");
//            }
//        }
//       return result;
        return null;
    }
}
