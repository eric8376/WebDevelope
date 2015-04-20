package org.nxstudio.service.workflow.common.service;

import org.activiti.engine.task.Task;
import org.aspectj.lang.ProceedingJoinPoint;
import org.nxstudio.core.model.Dto;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-8-7
 * Time: 上午10:07
 * =================================
 */
public interface IRTXInform {
    /**
     * 发送流程达到通知
     *
     * @param pjp
     * @throws Throwable
     */
    public void TaskArriveWarn(ProceedingJoinPoint pjp) throws Throwable;

    /**
     * 发送任务到达提醒
     *
     * @param task
     */
    void doTaskWarn(String taskId, String assignee) throws Exception;

    /**
     * 获取当前流程任务信息
     *
     * @param porc_inst_id_
     * @return
     */
    public List<Dto> findCurrentTaskInfoByPorcInstId(String porc_inst_id_);

    /**
     * 发送任务被结束提醒
     *
     * @param task
     * @throws Exception
     */
    public void doTaskEnd(Task task) throws Exception;

    /**
     * 发送任务被结束提醒
     *
     * @param task
     * @throws Exception
     */
    public void doTaskEnd(String taskId, String cause) throws Exception;
}
