package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ProcessAdvance;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-7-23
 * Time: 下午2:30
 * =================================
 */
@Service("askProcessAdvance")
public class AskProcessAdvance extends ProcessAdvance {
    /**
     * 提交
     */
    @Override
    public void doAdvance(String taskId, Map<String, Object> variables, Map<String, Object> inDto,
                          String activityId) throws Exception {
        boolean bl = taskIsJoin(taskId);

        // 跳转节点为空，默认提交操作
        if (G4Utils.isEmpty(activityId)) {
            taskService.complete(taskId, variables);
        } else {// 流程转向操作
            doTurnTransition(taskId, activityId, variables);
        }
    }
}
