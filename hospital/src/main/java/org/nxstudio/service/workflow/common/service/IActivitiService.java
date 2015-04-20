package org.nxstudio.service.workflow.common.service;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.nxstudio.core.model.Dto;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-6-13
 * Time: 上午11:34
 * =================================
 * 工作流服务接口
 */
public interface IActivitiService {
    /**
     * 部署流程
     *
     * @param fileName        文件名
     * @param fileInputStream 文件流
     * @return
     */
    public void doDeployProcess(String fileName, InputStream fileInputStream) throws Exception;

    /**
     * 获取已部署的流程信息
     *
     * @return
     */
    public List<Dto> processList();

    /**
     * 推进流程
     *
     * @param inDto
     * @throws Exception
     */
    public ProcessInstance doProcessAdvance(Dto inDto) throws Exception;

    /**
     * 保存流程意见
     *
     * @param inDto
     */
    public void saveProcessSuggestion(Map<String, Object> dto, String taskId);

    /**
     * 获取待办任务
     *
     * @param userId
     * @param pageIndex
     * @param limit
     * @return
     */
    public List<Task> findTodoTasks(String userId, int pageIndex, int limit);

    /**
     * 流程提交
     *
     * @param taskId
     * @param variables
     */
    public ProcessInstance doSubmitWorkFlow(String taskId, Map<String, Object> variables, Map<String, Object> inDto) throws Exception;

    /**
     * 启动流程
     *
     * @param processKey
     * @param businessKey
     * @param variables
     * @return
     */
    public ProcessInstance doStartWorkflow(String processKey, String businessKey, Map<String, Object> variables) throws Exception;

    /**
     * 获取流程下一环节
     *
     * @param processKey
     * @param activitiId
     * @return
     */
    public List<Dto> findNextTaskByProcKey(String processKey, String activitiId) throws Exception;

    /**
     * 获取流程下一环节
     *
     * @param procInstanceId
     * @param taskId
     * @return
     */
    public List<Dto> findNextTask(String procInstanceId, String taskId) throws Exception;

    public ActivityImpl findActivityImpl(List<ActivityImpl> activitiList, String activitiId);

    /**
     * 根据流程key获取指定环节的操作人
     *
     * @param processKey
     * @param activitiId
     * @return
     * @throws Exception
     */
    public Dto findAssigneeByProcessKey(String processKey, String activitiId) throws Exception;

    /**
     * 根据任务ID获取环节可选操作人
     *
     * @param taskId
     * @return
     * @throws Exception
     */
    public Dto findAssigneeByTaskId(String procInstanceId, String activitiId) throws Exception;

    /**
     * 获取运行中的流程
     *
     * @return
     */
    public List<Dto> findRunning();

    /**
     * 任务转办
     *
     * @param taskId
     * @param assignee
     * @param desc
     */
    public void doProcessTransferAssignee(String taskId, String assignee, String desc);

    /**
     * 获取已结束的流程
     *
     * @return
     */
    public List<Dto> findEndProcess();

    /**
     * 挂起或激活流程
     *
     * @param dto
     */
    public void updateProcessState(String proc_inst_id_, String state);

    /**
     * 驳回流程
     *
     * @param taskId     当前任务ID
     * @param activityId 驳回节点ID
     * @param variables  流程存储参数
     * @throws Exception
     */
    public void doBackProcess(String taskId, String activityId,
                              Map<String, Object> variables, Map<String, Object> inDto, String Description) throws Exception;

    /**
     * @param taskId     当前任务ID
     * @param variables  流程变量
     * @param activityId 流程转向执行任务节点ID<br>
     *                   此参数为空，默认为提交操作
     * @throws Exception
     */
    public ProcessInstance doCommitProcess(String taskId, Map<String, Object> variables, Map<String, Object> inDto,
                                           String activityId) throws Exception;


    /**
     * 中止流程(特权人直接审批通过等)
     *
     * @param taskId
     */
    public ProcessInstance doEndProcess(String taskId) throws Exception;

    /**
     * 根据当前任务ID，查询可以驳回的任务节点
     *
     * @param taskId 当前任务ID
     */
    public List<ActivityImpl> findBackAvtivity(String taskId) throws Exception;

    /**
     * 根据任务ID获取对应的流程实例
     *
     * @param taskId 任务ID
     * @return
     * @throws Exception
     */
    public ProcessInstance findProcessInstanceByTaskId(String taskId)
            throws Exception;

    /**
     * 根据流程ID获取对应的流程实例
     *
     * @param ProcInstId 流程ID
     * @return
     * @throws Exception
     */
    public ProcessInstance findProcessInstanceByProcInstId(String ProcInstId)
            throws Exception;

    /**
     * 转办流程
     *
     * @param taskId   当前任务节点ID
     * @param userCode 被转办人Code
     */
    public void doTransferAssignee(String taskId, String userCode);

    /**
     * 统计一个流程实例的环节耗时
     *
     * @param procInstId
     * @return
     */
    public Map<String, Dto> TaskTimeStatisticsByPorcInstId(String procInstId);

    /**
     * 获取流程变量
     *
     * @param taskId
     * @return
     */
    public Map<String, Object> findVarInstByTaskId(String taskId);

    /**
     * 获取流程变量
     *
     * @param taskId
     * @param varKey
     * @return
     */
    public Object findVarInstByTaskId(String taskId, String varKey);

    /**
     * 获取流程变量
     *
     * @param procInstId
     * @param varKey
     * @return
     */
    public Object findVarInstByProcInstId(String procInstId, String varKey);

    /**
     * 获取历史流程变量
     *
     * @param procInstId
     * @param varKey
     * @return
     */
    public Object findHiVarInstByProcInstId(String procInstId, String varKey);

    /**
     * 保存流程变量
     *
     * @param taskId
     * @param varKey
     * @param varValue
     */
    public void saveVarInstByTaskId(String taskId, String varKey, Object varValue);

    /**
     * 保存流程变量
     *
     * @param porcInstId
     * @param varKey
     * @param varValue
     */
    public void saveVarInstByPorcInstId(String porcInstId, String varKey, Object varValue);

    /**
     * 移除流程变量
     *
     * @param procInstId
     * @param varKey
     */
    public void removeVarInstByProcInstId(String procInstId, String varKey);

    public HistoryService getHistoryService();

    public TaskService getTaskService();

    public RuntimeService getRuntimeService();

    /**
     * 获取流程定义资源文件
     *
     * @param resourceType
     * @param processInstanceId
     * @return
     * @throws Exception
     */
    public InputStream loadByProcessInstance(String resourceType, String processInstanceId) throws Exception;

    /**
     * 判断任务是否处于会签状态
     *
     * @param taskId
     * @return
     */
    public boolean taskIsJoin(String taskId) throws Exception;

    /**
     * 流程跟踪图
     *
     * @param processInstanceId 流程实例ID
     * @return 封装了各种节点信息
     */
    public List<Dto> traceProcess(String processInstanceId) throws Exception;

    /**
     * 根据流程实例ID获取流程所有环节信息
     *
     * @param procInstId
     * @return
     */
    public List<ActivityImpl> findActivityByProcInstId(String procInstId);

    /**
     * 根据流程定义ID获取流程所有环节信息
     *
     * @param procDefId
     * @return
     */
    public List<ActivityImpl> findActivityByProcDefId(String procDefId);

    /**
     * 根据流程定义ID获取流程所有环节信息
     *
     * @param procDefId
     * @return
     */
    public List<ActivityImpl> findActivityByProcDefIdWhereUserTask(String procDefId);

    /**
     * 根据指定流程实例ID和环节定义ID获取历史环节操作人
     *
     * @param procId
     * @param taskKey
     * @return
     * @throws NullPointerException
     */
    public List<HistoricTaskInstance> findHistoricTaskByProcIdAndTaskKey(String procId, String taskKey) throws NullPointerException;


    /**
     * 统计一个人，每个流程节点耗时
     *
     * @param procInstId
     * @return
     */
    public Map<String, Dto> TaskTimeStatisticsByPorcInstIdEveryOne(String procInstId);


    /**
     * 添加流程变量
     *
     * @param porcInstId
     * @param key
     * @param value
     * @throws Exception
     */
    public void saveVarInstByAll(String key, Object value) throws Exception;


    /**
     * 通过bussinessKey查找流程实例ID
     *
     * @param businessKey
     * @return
     * @throws NullPointerException
     */
    public String findProcInstIdByBusinessKey(String businessKey, String pro_Def_Key) throws NullPointerException;

    /**
     * 根据流程定义ID和业务Key判断流程是否发起过
     *
     * @param businessKey
     * @param procDefKey
     * @return
     */
    public boolean IsExistByBusinessKeyAndProcDefKey(String businessKey, String procDefKey);

    /**
     * 修改流程操作人
     *
     * @return
     */
    public void changeAssignee(String proIsId, String taskId, String changeAccount);

//    /**
//     * 自由流转
//     * @param taskId
//     * @param variables
//     * @param destinationTaskKey
//     */
//    public void CallBack(String taskId, Map<String, Object> variables,String destinationTaskKey);

    /**
     * 获取流程
     */
    public List getTaskByTaskIdAndProcessId(String taskId, String processId);

    /**
     * 通过流程ProcInstIdAndpro_Def_Key
     *
     * @param ProcInstId
     * @param pro_Def_Key
     * @return
     * @throws NullPointerException
     */
    public String findBusinessKeyByProcInstIdAndProDefId(String ProcInstId, String pro_Def_Key) throws NullPointerException;

    /**
     * 自由跳转
     * @param executionId
     * @param activityId
     * @return
     */
//    public Comment jumpActivit(String executionId, String activityId);

    /**
     * 根据KEY和值获取流程变量记录
     *
     * @param key
     * @param value
     * @return
     */
    public List<HistoricVariableInstance> findVarIntsByKeyAndValue(String key, Object value);

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

    /**
     * 查找流程执行id
     *
     * @param dto
     * @return
     */
    public List<Dto> findProcessExcuteIdEx(Dto dto);

    /**
     * 任务签收
     *
     * @param taskId
     * @param assignee
     */
    public void dotaskClaim(String taskId, String assignee);
}
