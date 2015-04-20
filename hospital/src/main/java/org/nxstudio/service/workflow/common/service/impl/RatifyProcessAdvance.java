package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ProcessAdvance;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-7-23
 * Time: 下午2:39
 * =================================
 */
@Service("ratifyProcessAdvance")
public class RatifyProcessAdvance extends ProcessAdvance {
    /**
     * 提交
     */
    @Override
    public void doAdvance(String taskId, Map<String, Object> variables, Map<String, Object> inDto,
                          String activityId) throws Exception {
        boolean bl = taskIsJoin(taskId);
//        atool.endFlowWorkEvent(taskId);//关闭流程催办监听

        if (inDto.containsKey("endFlowList")) {
            //atool.endFlowWorkEvent()
//            List<Dto> list = (List<Dto>)inDto.get("endFlowList");
//            for (Dto dto : list)
//            {
//                atool.endFlowWorkEvent(dto.getAsString("pid"), dto.getAsString("tkey"));
//            }
        }

        // 跳转节点为空，默认提交操作
        if (G4Utils.isEmpty(activityId)) {
            taskService.complete(taskId, variables);
        } else {// 流程转向操作
            doTurnTransition(taskId, activityId, variables);
        }
    }
}
