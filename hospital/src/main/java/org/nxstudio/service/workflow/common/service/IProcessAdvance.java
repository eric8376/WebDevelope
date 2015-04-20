package org.nxstudio.service.workflow.common.service;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-8-7
 * Time: 上午11:13
 * =================================
 */
public interface IProcessAdvance {
    public void doAdvance(String taskId, Map<String, Object> variables, Map<String, Object> inDto,
                          String activityId) throws Exception;
}
