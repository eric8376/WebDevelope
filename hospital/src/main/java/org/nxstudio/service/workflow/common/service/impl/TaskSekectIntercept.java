package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ActivitisManage;
import org.nxstudio.service.workflow.common.service.ITaskSekectIntercept;
import org.activiti.engine.impl.javax.el.ExpressionFactory;
import org.activiti.engine.impl.javax.el.PropertyNotFoundException;
import org.activiti.engine.impl.javax.el.ValueExpression;
import org.activiti.engine.impl.juel.ExpressionFactoryImpl;
import org.activiti.engine.impl.juel.SimpleContext;
import org.aspectj.lang.ProceedingJoinPoint;
import org.nxstudio.core.model.Dto;
import org.nfunk.jep.JEP;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-12-28
 * Time: 上午11:12
 * =================================
 */
@Service("TaskSekectIntercept")
public class TaskSekectIntercept extends ActivitisManage implements ITaskSekectIntercept {
    /**
     * 确认流程名
     *
     * @param pjp
     * @throws Throwable
     */
    @Override
    public synchronized List<Dto> TaskNameAscertain(ProceedingJoinPoint pjp) throws Throwable {
        String processKey = pjp.getArgs()[0].toString();
        String taskId = pjp.getArgs()[1].toString();
        String ProcessDefinitionId = taskService.createTaskQuery().taskId(taskId).singleResult().getProcessDefinitionId();
        Dto activitiCache = makeCacheActiviti(ProcessDefinitionId);
        List<Dto> nextTasks = (List<Dto>) pjp.proceed(pjp.getArgs());
        int count = nextTasks.size();
        JEP jep = new JEP();
        ExpressionFactory factory = new ExpressionFactoryImpl();
        SimpleContext context = new SimpleContext();
        boolean isLoadVar = false;
        if (nextTasks.size() > 1) {
            for (int i = 0; i < count; i++) {
                if ("exclusiveGateway".equals(nextTasks.get(i).getAsString("type"))) {
                    if (!isLoadVar) {
                        LoadVariable(context, factory, taskId);
                    }
                    String nextTaskName = ResolveNextTask(context, factory, activitiCache, nextTasks.get(i).getAsString("id"));
                    if (null != nextTaskName && !"".equals(nextTaskName)) {
                        nextTasks.get(i).put("name", nextTaskName);
                    }
                }
            }
        }
        return nextTasks;
    }

    /**
     * 解析下一环节
     *
     * @param jep
     * @param activitiId
     * @return
     */
    private String ResolveNextTask(SimpleContext context, ExpressionFactory factory, Dto activitiCache, String activitiId) {
        List<Dto> nextFlowTos = null;
        if (activitiCache.containsKey(activitiId)) {
            nextFlowTos = (List<Dto>) activitiCache.get(activitiId);
            int count = nextFlowTos.size();
            for (int i = 0; i < count; i++) {
                ValueExpression e = factory.createValueExpression(context, nextFlowTos.get(i).getAsString("conditionText"), boolean.class);
                try {
                    if (Boolean.parseBoolean(e.getValue(context).toString())) {
                        if ("exclusiveGateway".equals(nextFlowTos.get(i).getAsString("type"))) {
                            String nextTaskName = ResolveNextTask(context, factory, activitiCache, nextFlowTos.get(i).getAsString("id"));
                            if (null != nextTaskName && !"".equals(nextTaskName)) {
                                return nextTaskName;
                            }
                        }
                        return nextFlowTos.get(i).getAsString("name");
                    }
                } catch (PropertyNotFoundException pe) {
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * 加载流程数据
     *
     * @param jep
     */
    private void LoadVariable(SimpleContext context, ExpressionFactory factory, String taskId) {
        Map<String, Object> vars = taskService.getVariables(taskId);
        Object s[] = vars.keySet().toArray();
        int count = s.length;
        String key;
        for (int i = 0; i < count; i++) {
            key = s[i].toString();
            Object keyValue = vars.get(key);
            if (null == keyValue)
                continue;
            context.setVariable(key, factory.createValueExpression(keyValue, vars.get(key).getClass()));
        }
    }
}
