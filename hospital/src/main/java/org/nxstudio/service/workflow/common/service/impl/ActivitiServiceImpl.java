package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ActivitisManage;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.service.workflow.common.service.IProcessAdvance;
import org.nxstudio.modules.exception.TaskFlowAwayException;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.ActivitiOptimisticLockingException;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.bpmn.behavior.ParallelMultiInstanceBehavior;
import org.activiti.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.io.FilenameUtils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;
import java.util.zip.ZipInputStream;

/**
 * 工作流的基本操作
 */

//自由流程参数解释，由于无法再源码中解释，故放于此位置 参数1：taskId 流程id，参数2：流程变量，参数3，目的流程key，调用方法为taskService.complete(taskid,var,destinationTaskKey);
@Service("activitiService")
public class ActivitiServiceImpl extends ActivitisManage implements IActivitiService {
    /**
     * 流程提交方式
     */
    @Autowired
    private IProcessAdvance defaultProcessAdvance;

    /**
     * 请求跳转提交方式
     */
    @Autowired
    private IProcessAdvance askProcessAdvance;

    /**
     * 同意请求跳转方式
     */
    @Autowired
    private IProcessAdvance ratifyProcessAdvance;

    /**
     * 部署流程
     *
     * @param fileName        文件名
     * @param fileInputStream 文件流
     * @return
     */
    public void doDeployProcess(String fileName, InputStream fileInputStream) throws Exception {
        try {
            String extension = FilenameUtils.getExtension(fileName);
            if (extension.equals("zip") || extension.equals("bar")) {
                ZipInputStream zip = new ZipInputStream(fileInputStream);
                repositoryService.createDeployment().addZipInputStream(zip).deploy();
            } else if (extension.equals("png")) {
                repositoryService.createDeployment().addInputStream(fileName, fileInputStream).deploy();
            } else if (fileName.indexOf("bpmn20.xml") != -1) {
                repositoryService.createDeployment().addInputStream(fileName, fileInputStream).deploy();
            } else if (extension.equals("bpmn")) {
        /*
         * bpmn扩展名特殊处理，转换为bpmn20.xml
         */
                String baseName = FilenameUtils.getBaseName(fileName);
                repositoryService.createDeployment().addInputStream(baseName + ".bpmn20.xml", fileInputStream).deploy();
            } else {
                throw new ActivitiException("no support file type of " + extension);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 获取已部署的流程信息
     *
     * @return
     */
    public List<Dto> processList() {
        List<Dto> listRet = new ArrayList<Dto>();
        List<ProcessDefinition> processDefinitionList = repositoryService.createProcessDefinitionQuery().list();
        Dto dto = null;
        for (ProcessDefinition processDefinition : processDefinitionList) {
            String deploymentId = processDefinition.getDeploymentId();
            Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(deploymentId).singleResult();
            dto = new BaseDto();
            dto.put("id", processDefinition.getId());
            dto.put("deploymentid", processDefinition.getDeploymentId());
            dto.put("name", processDefinition.getName());
            dto.put("key", processDefinition.getKey());
            dto.put("version", processDefinition.getVersion());
            dto.put("resourceName", processDefinition.getResourceName());
            dto.put("diagramResourceName", processDefinition.getDiagramResourceName());
            dto.put("deploymentTime", deployment.getDeploymentTime().toString());
            dto.put("isSuspended", processDefinition.isSuspended() ? 1 : 0);

            listRet.add(dto);
        }
        return listRet;
    }

    /**
     * 推进流程
     *
     * @param inDto
     * @throws Exception
     */
    public ProcessInstance doProcessAdvance(Dto inDto) throws Exception {
        try {
            if (inDto.containsKey("activityId")) {
                Dto visDto = inDto.get("variables") instanceof Dto ? (Dto) inDto.get("variables") : new BaseDto();
                /*String variables = inDto.getAsString("variables");//流程变量字符串，key：value
                if (variables != null && variables.length() > 0) {
                    String[] l = variables.split(",");
                    for (String item : l) {
                        String[] kv = item.split(":");
                        visDto.put(kv[0], kv.length == 1 ? "" : kv[1]);
                    }
                }*/
                if (inDto.containsKey("nextFlow")) {
                    visDto.put("nextFlow", inDto.getAsString("nextFlow"));
                }
                if (inDto.containsKey("nextUserAccount"))
                    visDto.put("nextUserAccount", inDto.getAsString("nextUserAccount"));
                if (inDto.containsKey("applyUserId"))
                    visDto.put("applyUserId", inDto.getAsString("applyUserId"));
                if (inDto.containsKey("wf_title"))//设置流程主题
                    visDto.put("wf_title", inDto.getAsString("wf_title"));

                saveProcessSuggestion(visDto, inDto.getAsString("taskId"));//保存流程意见
                ProcessInstance pi = null;
                Task task = null;
                if ("start".equals(inDto.getAsString("activityId"))) {
                    pi = doStartWorkflow(inDto.getAsString("processKey"), inDto.getAsString("businessKey"), visDto);//开启新的流程实例
                    List<Task> tasks = taskService.createTaskQuery().processInstanceId(pi.getProcessInstanceId()).list();
                    if (inDto.containsKey("nextUserAccount") && !inDto.get("nextTaskName").toString().toUpperCase().equals("END")) {
                        int count = tasks.size();
                        for (int i = 0; i < count; i++) {
                            taskService.setAssignee(tasks.get(i).getId(), inDto.get("nextUserAccount").toString());
                        }
                    }
                } else if (inDto.containsKey("taskId")) {
                    task = taskService.createTaskQuery().taskId(inDto.getAsString("taskId")).singleResult();
                    pi = doSubmitWorkFlow(inDto.getAsString("taskId"), visDto, inDto);
                }

                if (pi == null)
                    throw new NullPointerException("流程流转发生未知异常，无法获取流程实例");

                List<Task> tasks = taskService.createTaskQuery().processInstanceId(pi.getProcessInstanceId()).list();
                if (task != null && inDto.containsKey("nextUserAccount") && !inDto.get("nextTaskName").toString().toUpperCase().equals("END")) {
                    int count = tasks.size();
                    for (int i = 0; i < count; i++) {
                        if (task.getExecutionId().equals(tasks.get(i).getExecutionId())) {
                            //taskService.setAssignee(tasks.get(i).getId(), inDto.get("nextUserAccount").toString());
//                            tasks.get(i).setAssignee(inDto.get("nextUserAccount").toString());
//                            taskService.saveTask(tasks.get(i));
                            Dto indto = new BaseDto();
                            indto.put("task_id", tasks.get(i).getId());
                            indto.put("assignee", inDto.get("nextUserAccount").toString());
                            generalDao.update("workFlow.updateTaskAss", indto);
                            generalDao.update("workFlow.updateTaskAssHi", indto);
                        }
                    }
                }
                return pi;
            }
            return null;
        } catch (ActivitiOptimisticLockingException ex) {
            throw new TaskFlowAwayException(ex);
        } catch (Exception e) {
            throw new TaskFlowAwayException(e);
        }
    }

    /**
     * 保存流程意见
     *
     * @param inDto
     */
    public void saveProcessSuggestion(Map<String, Object> dto, String taskId) {
        if (taskId != null && taskId.length() > 0 &&
                dto.containsKey("suggestion_theme") && dto.containsKey("suggestion_desc")) {
            Dto inDto = new BaseDto();
            inDto.put("suggestion_id", IDHelper.getCodeID());
            inDto.put("suggestion_theme", dto.get("suggestion_theme").toString());
            inDto.put("suggestion_desc", dto.get("suggestion_desc") == null ? "" : dto.get("suggestion_desc").toString());
            inDto.put("task_id", taskId);
            dto.remove("suggestion_theme");
            dto.remove("suggestion_desc");
            generalDao.insert("workFlow.saveProcessSuggestion", inDto);
        }
    }

    /**
     * 获取待办任务
     *
     * @param userId
     * @param pageIndex
     * @param limit
     * @return
     */
    public List<Task> findTodoTasks(String userId, int pageIndex, int limit) {
        List<Task> todoList = taskService.createTaskQuery()
                .processDefinitionKey("leave").taskAssignee(userId).active()
                .orderByTaskPriority().desc().orderByTaskCreateTime().desc().listPage(pageIndex * limit, (pageIndex + 1) * limit);
        return todoList;
    }

    /**
     * 流程提交
     *
     * @param taskId
     * @param variables
     */
    public ProcessInstance doSubmitWorkFlow(String taskId, Map<String, Object> variables, Map<String, Object> inDto) throws Exception {
        return doCommitProcess(taskId, variables, inDto, null);
    }

    /**
     * 启动流程
     *
     * @param processKey
     * @param businessKey
     * @param variables
     * @return
     */
    public ProcessInstance doStartWorkflow(String processKey, String businessKey, Map<String, Object> variables) throws Exception {
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceByKey(processKey, businessKey, variables);
//        List<Task> tasks = taskService.createTaskQuery().processInstanceId(processInstance.getProcessInstanceId()).list();
//        for (Task task : tasks)
//            doTaskWarn(task);
        return processInstance;
    }

    /**
     * 获取流程下一环节
     *
     * @param processKey
     * @param activitiId
     * @return
     */
    public List<Dto> findNextTaskByProcKey(String processKey, String activitiId) throws Exception {
        List<ProcessDefinition> procList = repositoryService.createProcessDefinitionQuery().processDefinitionKey(processKey).orderByProcessDefinitionVersion().desc().list();
        List<ActivityImpl> activitiList = new ArrayList<ActivityImpl>();
        List<Dto> nextFlowTos = new ArrayList<Dto>();
        Dto activitiCache = makeCacheActiviti(procList.get(0).getId());
        if (activitiCache.containsKey(activitiId)) {
            nextFlowTos = (List<Dto>) activitiCache.get(activitiId);
        }
        return nextFlowTos;
    }

    /**
     * 获取流程下一环节
     *
     * @param procInstanceId
     * @param taskId
     * @return
     */
    public List<Dto> findNextTask(String procInstanceId, String taskId) throws Exception {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task == null) {
            throw new TaskFlowAwayException();
        }
        List<ActivityImpl> activitiList = new ArrayList<ActivityImpl>();
        List<Dto> nextFlowTos = new ArrayList<Dto>();

        String excId = task.getExecutionId();
        ExecutionEntity execution = (ExecutionEntity) runtimeService.createExecutionQuery().executionId(excId).singleResult();
        String activitiId = execution.getActivityId();//获取当前所在的环节
        Dto activitiCache = makeCacheActiviti(task.getProcessDefinitionId());
        if (activitiCache.containsKey(activitiId)) {
            nextFlowTos = (List<Dto>) activitiCache.get(activitiId);
        }
        return nextFlowTos;
    }

    /**
     * 判断是否是会签环节
     *
     * @param activityId
     * @param ProcessDefinitionId
     * @return
     */
    public boolean taskIsJoin(String activityId, String ProcessDefinitionId) {
        ProcessDefinitionEntity def = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService).getDeployedProcessDefinition(ProcessDefinitionId);
        ActivityImpl activityImpl = def.findActivity(activityId);
        org.activiti.engine.impl.pvm.delegate.ActivityBehavior ab = activityImpl.getActivityBehavior();
        if (ParallelMultiInstanceBehavior.class == ab.getClass()) {
            return true;
        }
        return false;
    }

    /**
     * 根据流程key获取指定环节的操作人
     *
     * @param processKey
     * @param activitiId
     * @return
     * @throws Exception
     */
    public Dto findAssigneeByProcessKey(String processKey, String activitiId) throws Exception {
        List<ProcessDefinition> procList = repositoryService.createProcessDefinitionQuery().processDefinitionKey(processKey).orderByProcessDefinitionVersion().desc().list();
        if (procList == null || procList.size() == 0) {
            throw new NullPointerException("无法根据指定Key获取流程部署实例");
        }
        ProcessDefinitionEntity def = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService).getDeployedProcessDefinition(procList.get(0).getId());
        return findAssigneeByProcessDefinition(def, activitiId);
    }

    /**
     * 根据任务ID获取环节可选操作人
     *
     * @param taskId
     * @return
     * @throws Exception
     */
    public Dto findAssigneeByTaskId(String procInstanceId, String activitiId) throws Exception {
        ProcessDefinitionEntity def = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService).getDeployedProcessDefinition(procInstanceId);
        return findAssigneeByProcessDefinition(def, activitiId);
    }

    /**
     * 根据流程定义实例获取指定环节的操作人
     *
     * @param def
     * @param activitiId
     * @return
     */
    private Dto findAssigneeByProcessDefinition(ProcessDefinitionEntity def, String activitiId) {
        ActivityImpl activityImpl = def.findActivity(activitiId);

        //List<String> list = new ArrayList<String>();
        Dto rtnDto = new BaseDto();
        if ("userTask".equals(activityImpl.getProperty("type"))) {
            org.activiti.engine.impl.pvm.delegate.ActivityBehavior ab = activityImpl.getActivityBehavior();
            if (ab.getClass() == UserTaskActivityBehavior.class) {
                UserTaskActivityBehavior utab = ((UserTaskActivityBehavior) ab);
                TaskDefinition taskDefinition = utab.getTaskDefinition();
                //获取用户集合
                String assignees = "";
                for (Expression ex : taskDefinition.getCandidateUserIdExpressions()) {
                    if (assignees.length() > 0)
                        assignees += "',";
                    assignees += "'" + ex.getExpressionText();
                }
                if (assignees.length() > 0) {
                    assignees += "'";
                    rtnDto.put("assignees", assignees);
                }
                //获取用户组集合
                assignees = "";
                for (Expression ex : taskDefinition.getCandidateGroupIdExpressions()) {
                    if (assignees.length() > 0)
                        assignees += "',";
                    assignees += "'" + ex.getExpressionText();
                }
                if (assignees.length() > 0) {
                    assignees += "'";
                    rtnDto.put("groups", assignees);
                }
            }
        }
        return rtnDto;
    }

    /**
     * 获取运行中的流程
     *
     * @return
     */
    public List<Dto> findRunning() {
        List<Dto> runList = new ArrayList<Dto>();
        List<ProcessInstance> list = runtimeService.createProcessInstanceQuery().list();
        Dto dto = null;
        for (ProcessInstance pi : list) {
            dto = new BaseDto();
            dto.put("id", pi.getId());
            dto.put("processInstanceId", pi.getProcessInstanceId());
            dto.put("processDefinitionId", pi.getProcessDefinitionId());
            dto.put("suspended", pi.isSuspended());
        }
        return runList;
    }

    /**
     * 任务转办
     *
     * @param taskId
     * @param assignee
     * @param desc
     */
    public void doProcessTransferAssignee(String taskId, String assignee, String desc) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        task.setDescription(G4Utils.isNotEmpty(task.getDescription()) ? (task.getDescription() + ";" + desc) : desc);
        task.setAssignee(assignee);
        taskService.saveTask(task);
        List<Dto> list = findCurrentTaskInfoByPorcInstId(task.getProcessInstanceId());
        if (list != null && list.size() > 0) {
            Dto procDto = list.get(0);
            Dto inDto = new BaseDto();
            inDto.put("receiver", task.getAssignee());
            inDto.put("title", "任务到达提醒");
            inDto.put("msg", "您有一份【" + procDto.getAsString("wf_title") + "】的任务到达，请及时处理。");
            sysComunicateService.sendRTX(inDto);
        }
    }

    /**
     * 获取已结束的流程
     *
     * @return
     */
    public List<Dto> findEndProcess() {
        List<Dto> endList = new ArrayList<Dto>();
        List<HistoricProcessInstance> list = historyService.createHistoricProcessInstanceQuery().finished().list();
        Dto dto = null;
        for (HistoricProcessInstance hpi : list) {
            dto.put("id", hpi.getId());
            dto.put("processDefinitionId", hpi.getProcessDefinitionId());
            dto.put("startTime", hpi.getStartTime());
            dto.put("endTime", hpi.getEndTime());
            dto.put("deleteReason", hpi.getDeleteReason());
            dto.put("businessKey", hpi.getBusinessKey());
            endList.add(dto);
        }
        return endList;
    }

    /**
     * 挂起或激活流程
     *
     * @param dto
     */
    public void updateProcessState(String proc_inst_id_, String state) {
        if ("active".equals(state)) {
            runtimeService.activateProcessInstanceById(proc_inst_id_);
        } else if ("suspend".equals(state)) {
            runtimeService.suspendProcessInstanceById(proc_inst_id_);
        }
    }

    /**
     * 驳回流程
     *
     * @param taskId     当前任务ID
     * @param activityId 驳回节点ID
     * @param variables  流程存储参数
     * @throws Exception
     */
    public void doBackProcess(String taskId, String activityId,
                              Map<String, Object> variables, Map<String, Object> inDto, String Description) throws Exception {
        if (G4Utils.isEmpty(activityId)) {
            throw new Exception("驳回目标节点ID为空！");
        }
        //List<HistoricTaskInstance> list = historyService.createHistoricProcessInstanceQuery().createHistoricTaskInstanceQuery().taskDefinitionKey(activityId).orderByHistoricTaskInstanceEndTime().desc().list();
        Task otask = taskService.createTaskQuery().taskId(taskId).singleResult();
        ProcessInstance pi = findProcessInstanceByTaskId(taskId);
        if (G4Utils.isNotEmpty(Description)) {
            otask.setDescription(Description);
            taskService.saveTask(otask);
        }
        saveProcessSuggestion(variables, taskId);
        List<HistoricTaskInstance> list = historyService.createHistoricTaskInstanceQuery().taskDefinitionKey(activityId).processInstanceId(findProcessInstanceByTaskId(taskId).getProcessInstanceId()).orderByHistoricTaskInstanceEndTime().desc().list();
        if (list.size() > 0) {
            HistoricTaskInstance task = list.get(0);
            inDto.put("nextUserAccount", task.getAssignee());
            inDto.put("nextTaskName", task.getName());
            variables.put("nextUserAccount", task.getAssignee());
        }
        // 查找所有并行任务节点，同时驳回
        List<Task> taskList = findTaskListByKey(findProcessInstanceByTaskId(
                taskId).getId(), findTaskById(taskId).getTaskDefinitionKey());
        for (Task task : taskList) {
            doCommitProcess(task.getId(), variables, inDto, activityId);
        }
        //如果是会签环节则不设置操作人
        if (!taskIsJoin(activityId, pi.getProcessDefinitionId()) && inDto.containsKey("nextUserAccount")) {
            List<Task> tasks = taskService.createTaskQuery().processInstanceId(pi.getProcessInstanceId()).list();
            int count = tasks.size();
            for (int i = 0; i < count; i++) {
                if (otask.getExecutionId().equals(tasks.get(i).getExecutionId())) {
                    String account = inDto.get("nextUserAccount").toString();
                    taskService.setAssignee(tasks.get(i).getId(), account);
                }
            }
        }
    }

    /**
     * @param taskId     当前任务ID
     * @param variables  流程变量
     * @param activityId 流程转向执行任务节点ID<br>
     *                   此参数为空，默认为提交操作
     * @throws Exception
     */
    @Override
    public ProcessInstance doCommitProcess(String taskId, Map<String, Object> variables, Map<String, Object> inDto,
                                           String activityId) throws Exception {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task == null) {
            throw new TaskFlowAwayException();
        }
        if (variables == null) {
            variables = new HashMap<String, Object>();
        }
        //根据TaskId获取流程实例
        ProcessInstance pi = findProcessInstanceByTaskId(taskId);
        if (inDto != null && "usertask31".equals(task.getTaskDefinitionKey()) && inDto.containsKey("nextFlow") && "usertask62".equals(inDto.get("nextTaskId").toString())) {
            askProcessAdvance.doAdvance(taskId, variables, inDto, activityId);
        } else if (inDto != null && "usertask62".equals(task.getTaskDefinitionKey()) && inDto.containsKey("nextFlow") && "usertask61".equals(inDto.get("nextTaskId").toString())) {
            List<Dto> list = new ArrayList<Dto>();
            Dto dto = new BaseDto();
            dto.put("pid", pi.getProcessInstanceId());
            dto.put("tkey", "usertask31");
            list.add(dto);
            inDto.put("endFlowList", list);
            ratifyProcessAdvance.doAdvance(taskId, variables, inDto, activityId);
        } else {
            defaultProcessAdvance.doAdvance(taskId, variables, inDto, activityId);
        }

        //如果是会签环节则不设置操作人
        if (activityId != null && !taskIsJoin(activityId, pi.getProcessDefinitionId()) && inDto != null && inDto.containsKey("nextUserAccount")) {
            List<Task> tasks = taskService.createTaskQuery().processInstanceId(pi.getProcessInstanceId()).list();
            if (tasks.size() == 1) {
                String account = inDto.get("nextUserAccount").toString();
                taskService.setAssignee(tasks.get(0).getId(), account);
            }
        }

        return pi;
    }

    /**
     * 中止流程(特权人直接审批通过等)
     *
     * @param taskId
     */
    public ProcessInstance doEndProcess(String taskId) throws Exception {
        ActivityImpl endActivity = findActivitiImpl(taskId, "end");
        return doCommitProcess(taskId, null, null, endActivity.getId());
    }

    /**
     * 根据当前任务ID，查询可以驳回的任务节点
     *
     * @param taskId 当前任务ID
     */
    public List<ActivityImpl> findBackAvtivity(String taskId) throws Exception {
        List<ActivityImpl> rtnList = iteratorBackActivity(taskId, findActivitiImpl(taskId,
                        null), new ArrayList<ActivityImpl>(),
                new ArrayList<ActivityImpl>());
        return reverList(rtnList);
    }

    /**
     * 转办流程
     *
     * @param taskId   当前任务节点ID
     * @param userCode 被转办人Code
     */
    public void doTransferAssignee(String taskId, String userCode) {
        taskService.setAssignee(taskId, userCode);
    }

    /**
     * 统计一个流程实例的环节耗时
     *
     * @param procInstId
     * @return
     */
    public Map<String, Dto> TaskTimeStatisticsByPorcInstId(String procInstId) {
        List<HistoricTaskInstance> hiTaskList = historyService.createHistoricTaskInstanceQuery().processInstanceId(procInstId).list();
        Map<String, Dto> taskTimeInfo = new HashMap<String, Dto>();
        int count = hiTaskList.size();
        for (int i = 0; i < count; i++) {
            HistoricTaskInstance hti = hiTaskList.get(i);
            Dto infoDto = null;
            if (taskTimeInfo.containsKey(hti.getTaskDefinitionKey())) {
                infoDto = taskTimeInfo.get(hti.getTaskDefinitionKey());
            } else {
                infoDto = new BaseDto();
            }
            java.util.Date endTime = hti.getEndTime() == null ? new Date() : hti.getEndTime();
//            int consumeTime = atool.getWorkMinutes(hti.getStartTime(), endTime, hti.getAssignee());
            infoDto.put("taskKey", hti.getTaskDefinitionKey());
            infoDto.put("taskName", hti.getName());
            Integer hiConsumeTime = infoDto.getAsInteger("consumeTime");
            infoDto.put("consumeTime", (hiConsumeTime == null ? 0 : hiConsumeTime) + 0);
            taskTimeInfo.put(hti.getTaskDefinitionKey(), infoDto);
        }
        return taskTimeInfo;
    }

    /**
     * 添加流程变量
     *
     * @param porcInstId
     * @param key
     * @param value
     * @throws Exception
     */
    public void saveVarInstByAll(String key, Object value) throws Exception {
        Dto dto = new BaseDto();
        dto.put("start", 0);
        dto.put("limit", 9999999);
        List<Dto> list = generalDao.queryForPage("workFlow.findRunningProcess", dto);
        int count = list.size();
        String porcInstId;
        for (int i = 0; i < count; i++) {
            porcInstId = list.get(i).getAsString("proc_inst_id_");
            saveVarInstByPorcInstId(porcInstId, key, value);
        }
    }

    /**
     * 获取流程变量
     *
     * @param taskId
     * @return
     */
    public Map<String, Object> findVarInstByTaskId(String taskId) {
        Map<String, Object> varInst = taskService.getVariables(taskId);
        return varInst;
    }

    /**
     * 获取流程变量
     *
     * @param taskId
     * @param varKey
     * @return
     */
    public Object findVarInstByTaskId(String taskId, String varKey) {
        return taskService.getVariable(taskId, varKey);
    }

    /**
     * 获取流程变量
     *
     * @param procInstId
     * @param varKey
     * @return
     */
    public Object findVarInstByProcInstId(String procInstId, String varKey) {
        //return runtimeService.getVariable(procInstId, varKey);
        Object var = runtimeService.getVariable(procInstId, varKey);
        if (G4Utils.isEmpty(var)) {
            HistoricVariableInstance his = historyService.createHistoricVariableInstanceQuery().processInstanceId(procInstId).variableName(varKey).singleResult();
            if (G4Utils.isEmpty(his)) {
                return null;
            }
            var = his.getValue();
        }
//        List list = new ArrayList();
//        list = historyService.createHistoricVariableInstanceQuery().processInstanceId(procInstId).variableName(varKey).list();
//        if(list.size()!=0){
//            return list;
//        }
//          return list;
        return var;
    }

//    @Override
//    public void CallBack(String taskId, Map<String, Object> variables,String destinationTaskKey) {
//        taskService.complete(taskId,variables,destinationTaskKey);
//    }


    /**
     * @param procInstId
     * @param varKey
     * @return
     */
    public Object findHiVarInstByProcInstId(String procInstId, String varKey) {
//        return runtimeService.getVariable(procInstId, varKey);
        List<HistoricVariableInstance> list = new ArrayList();
        Object assignee = null;
        list = historyService.createHistoricVariableInstanceQuery().processInstanceId(procInstId).variableName(varKey).list();
        if (list.size() != 0) {
            assignee = list.get(0).getValue();
        }
        return assignee;
    }


    /**
     * 保存流程变量
     *
     * @param taskId
     * @param varKey
     * @param varValue
     */
    public void saveVarInstByTaskId(String taskId, String varKey, Object varValue) {
        taskService.setVariable(taskId, varKey, varValue);
    }

    /**
     * 移除流程变量
     *
     * @param procInstId
     * @param varKey
     */
    public void removeVarInstByProcInstId(String procInstId, String varKey) {
        runtimeService.removeVariable(procInstId, varKey);
    }

    /**
     * 保存流程变量
     *
     * @param porcInstId
     * @param varKey
     * @param varValue
     */
    public void saveVarInstByPorcInstId(String porcInstId, String varKey, Object varValue) {
        runtimeService.setVariable(porcInstId, varKey, varValue);
        //taskService.setVariable(taskId, varKey, varValue);
    }

    /**
     * 根据KEY和值获取流程变量记录
     *
     * @param key
     * @param value
     * @return
     */
    public List<HistoricVariableInstance> findVarIntsByKeyAndValue(String key, Object value) {
        return historyService.createHistoricVariableInstanceQuery().variableValueEquals(key, value).list();
    }

    /**
     * 获取流程定义资源文件
     *
     * @param resourceType
     * @param processInstanceId
     * @return
     */
    public InputStream loadByProcessInstance(String resourceType, String processInstanceId) throws Exception {
        InputStream resourceAsStream = null;
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(processInstance.getProcessDefinitionId())
                .singleResult();

        String resourceName = "";
        if (resourceType.equals("image")) {
            resourceName = processDefinition.getDiagramResourceName();
        } else if (resourceType.equals("xml")) {
            resourceName = processDefinition.getResourceName();
        }
        resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), resourceName);

        return resourceAsStream;
    }

    /**
     * 统计一个人，每个流程节点耗时
     *
     * @param procInstId
     * @return
     */
    public Map<String, Dto> TaskTimeStatisticsByPorcInstIdEveryOne(String procInstId) {
        List<HistoricTaskInstance> hiTaskList = historyService.createHistoricTaskInstanceQuery().processInstanceId(procInstId).list();
        Map<String, Dto> taskTimeInfo = new HashMap<String, Dto>();
//        int count = hiTaskList.size();
//        int x=0;
//        Dto infoDto = new BaseDto();
//        Dto nameDto = new BaseDto();
//        for (int i = 0; i < count; i++) {
//            HistoricTaskInstance hti = hiTaskList.get(i);
//            java.util.Date endTime = hti.getEndTime() == null ? new Date() : hti.getEndTime();
////            int consumeTime = atool.getWorkMinutes(hti.getStartTime(), endTime, hti.getAssignee());
////            int useTime = atool.returnTaskTime(hti.getProcessDefinitionId(),hti.getTaskDefinitionKey(),procInstId);
//            if(useTime<0){
//                System.err.println("获取所使用时间数据出错");
//            }
//            if(useTime>0){
//            if(consumeTime>useTime){
//            if(infoDto.isEmpty()||!infoDto.containsKey(hti.getAssignee())){
//                List list = new ArrayList();
//                list.add(hti.getName()+":"+(consumeTime-useTime));
//                infoDto.put(hti.getAssignee(),list);
//                nameDto.put(x++,hti.getAssignee());
//            }else {
//                List old = infoDto.getAsList(hti.getAssignee());
//                old.add(hti.getName()+":"+(consumeTime-useTime));
//                infoDto.put(hti.getAssignee(),old);
//            }
//            }
//        }
//        }
//        taskTimeInfo.put("alllUserTime",infoDto);
//        taskTimeInfo.put("userName",nameDto);
        return taskTimeInfo;
    }


    /**
     * 判断任务是否处于会签状态
     *
     * @param taskId
     * @return
     */
    public boolean taskIsJoin(String taskId) throws Exception {
        return super.taskIsJoin(taskId);
    }

    /**
     * 流程跟踪图
     *
     * @param processInstanceId 流程实例ID
     * @return 封装了各种节点信息
     */
    public List<Dto> traceProcess(String processInstanceId) throws Exception {
        return super.traceProcess(processInstanceId);
    }

    /**
     * 根据流程实例ID获取流程所有环节信息
     *
     * @param procInstId
     * @return
     */
    public List<ActivityImpl> findActivityByProcInstId(String procInstId) {
        return super.findActivityByProcInstId(procInstId);
    }

    /**
     * 根据流程定义ID获取流程所有环节信息
     *
     * @param procDefId
     * @return
     */
    public List<ActivityImpl> findActivityByProcDefId(String procDefId) {
        return super.findActivityByProcDefId(procDefId);
    }

    /**
     * 根据流程定义ID获取流程所有环节信息
     *
     * @param procDefId
     * @return
     */
    public List<ActivityImpl> findActivityByProcDefIdWhereUserTask(String procDefId) {
        List<ActivityImpl> list = super.findActivityByProcDefId(procDefId);
        int count = list.size();
        for (int i = count - 1; i >= 0; i--) {
            if (!list.get(i).getActivityBehavior().getClass().equals(UserTaskActivityBehavior.class)) {
                list.remove(i);
            }
        }
        return list;
    }

    /**
     * 根据指定流程实例ID和环节定义ID获取历史环节操作人
     *
     * @param procId
     * @param taskKey
     * @return
     * @throws NullPointerException
     */
    public List<HistoricTaskInstance> findHistoricTaskByProcIdAndTaskKey(String procId, String taskKey) throws NullPointerException {
        return historyService.createHistoricTaskInstanceQuery().taskDefinitionKey(taskKey).processInstanceId(procId).orderByHistoricTaskInstanceEndTime().desc().list();
    }

    /**
     * 根据bussinekey查找流程实例ID
     *
     * @param businessKey
     * @return
     * @throws NullPointerException
     */
    public String findProcInstIdByBusinessKey(String businessKey, String pro_Def_Key) throws NullPointerException {

        String PROC_INST_ID_ = "";
        List<HistoricProcessInstance> list = historyService.createHistoricProcessInstanceQuery().processDefinitionKey(pro_Def_Key).processInstanceBusinessKey(businessKey).list();
        if (list.size() != 0) {
            if (list.get(0).getSuperProcessInstanceId() == null) {
                PROC_INST_ID_ = list.get(0).getId();
            } else {
                PROC_INST_ID_ = list.get(0).getSuperProcessInstanceId();
            }

        }
        return PROC_INST_ID_;
    }

    /**
     * 通过ProcInstId查找businesskey
     *
     * @param businessKey
     * @param pro_Def_Key
     * @return
     * @throws NullPointerException
     */
    public String findBusinessKeyByProcInstIdAndProDefId(String ProcInstId, String proDefId) throws NullPointerException {

        String BusinessKey = "";
//        List<HistoricProcessInstance> list=historyService.createHistoricProcessInstanceQuery().processDefinitionKey(pro_Def_Key).processInstanceBusinessKey(businessKey).list();
        List<ProcessInstance> list = runtimeService.createProcessInstanceQuery().processInstanceId(ProcInstId).processDefinitionId(proDefId).list();

        if (list.size() != 0) {
            BusinessKey = list.get(0).getBusinessKey();
        }
        return BusinessKey;
    }


    /**
     * 根据流程定义ID和业务Key判断流程是否发起过
     *
     * @param businessKey
     * @param procDefKey
     * @return
     */
    public boolean IsExistByBusinessKeyAndProcDefKey(String businessKey, String procDefKey) {
        List list = historyService.createHistoricProcessInstanceQuery().processDefinitionKey(procDefKey).processInstanceBusinessKey(businessKey).list();
        if (list != null && list.size() > 0) {
            return true;
        }
        return false;
    }

    /**
     * 修改流程历史操作人（更改默认人使用）
     *
     * @return
     */
    public void changeAssignee(String proIsId, String taskId, String changeAccount) {
        Dto dto = new BaseDto();
        dto.put("proIsId", proIsId);
        dto.put("taskId", taskId);
        dto.put("changeAccount", changeAccount);
        generalDao.update("workFlow.changeAssignee", dto);

    }

    /**
     * 获取流程根据流程命以及环节id
     *
     * @param taskId
     * @param processId
     * @return
     */
    @Override
    public List getTaskByTaskIdAndProcessId(String taskId, String processId) {
        Dto varDto = new BaseDto();
        varDto.put("taskId", taskId);
        varDto.put("processId", processId);
        List list = generalDao.queryForList("workFlow.getTaskByTaskIdAndProcessId", varDto);
        return list;  //To change body of implemented methods use File | Settings | File Templates.
    }


    public IProcessAdvance getDefaultProcessAdvance() {
        return defaultProcessAdvance;
    }

    public void setDefaultProcessAdvance(IProcessAdvance defaultProcessAdvance) {
        this.defaultProcessAdvance = defaultProcessAdvance;
    }

    public IProcessAdvance getAskProcessAdvance() {
        return askProcessAdvance;
    }

    public void setAskProcessAdvance(IProcessAdvance askProcessAdvance) {
        this.askProcessAdvance = askProcessAdvance;
    }

    public IProcessAdvance getRatifyProcessAdvance() {
        return ratifyProcessAdvance;
    }

    public void setRatifyProcessAdvance(IProcessAdvance ratifyProcessAdvance) {
        this.ratifyProcessAdvance = ratifyProcessAdvance;
    }

    //    @Override
//    public Comment jumpActivit(String executionId, String activityId) {
//        for (TaskEntity taskEntity : Context.getCommandContext().getTaskManager().findTasksByExecutionId(executionId)) {
//            Context.getCommandContext().getTaskManager().deleteTask(taskEntity, "jump", false);
//        }
//        ExecutionEntity executionEntity = Context.getCommandContext().getExecutionManager().findExecutionById(executionId);
//        ProcessDefinitionImpl processDefinition = executionEntity.getProcessDefinition();
//        ActivityImpl activity = processDefinition.findActivity(activityId);
//        executionEntity.executeActivity(activity);
//        return null;  //To change body of implemented methods use File | Settings | File Templates.
//    }
    @Override
    public List<Dto> findProcessExcuteIdEx(Dto dto) {
        List<Dto> list = generalDao.queryForList("workFlow.findProcessExcuteIdEx", dto);
        return list;
    }
}
