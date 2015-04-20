package org.nxstudio.service.workflow.common.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.nxstudio.core.model.Dto;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-12-28
 * Time: 上午11:08
 * =================================
 * 拦截下一个任务环节选择方法，用于设置扩展任务名
 */
public interface ITaskSekectIntercept {
    /**
     * 确认流程名
     *
     * @param pjp
     * @throws Throwable
     */
    public List<Dto> TaskNameAscertain(ProceedingJoinPoint pjp) throws Throwable;
}
