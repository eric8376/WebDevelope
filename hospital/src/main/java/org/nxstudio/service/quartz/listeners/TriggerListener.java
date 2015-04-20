package org.nxstudio.service.quartz.listeners;

import org.nxstudio.modules.systemassist.service.impl.TServer;
import org.nxstudio.util.spring.SpringContextUtil;
import org.quartz.JobExecutionContext;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【未命题】
 * 时间: 2013-06-16 下午8:47
 */
public class TriggerListener implements org.quartz.TriggerListener {
    private String name;
    /**
     * 是否打印消息
     */
    private boolean isPrintMessage = false;

    //任务调度服务
    @Autowired
    private TServer tServer;

    public TriggerListener() {
        name = "globTriggerListener";
    }

    public TriggerListener(String name) {
        this.name = name;
    }

    /**
     * 获取名字
     */
    public String getName() {
        return this.name;
    }

    /**
     * 触发器销毁
     */
    public void triggerFired(Trigger trigger, JobExecutionContext jobExecutionContext) {
        printRed("【任务调台平台】:Trigger[name:" + trigger.getName() + ",group:" + trigger.getGroup() + "]已经销毁...");
        //回收一般 触发器
        if (trigger instanceof SimpleTrigger) {
            SimpleTrigger tempTrigger = (SimpleTrigger) trigger;
            if (tempTrigger.getTimesTriggered() > tempTrigger.getRepeatCount()) {
                String strTmp = trigger.getName().substring(1);
                tServer.stopST(strTmp, 1);
            }
        }
    }

    /**
     * 是否抛出禁止Job异常
     */
    public boolean vetoJobExecution(Trigger trigger, JobExecutionContext jobExecutionContext) {
        return false;
    }

    /**
     * 触发器销毁前
     */
    public void triggerMisfired(Trigger trigger) {
        printRed("【任务调台平台】:Trigger[name:" + trigger.getName() + ",group:" + trigger.getGroup() + "]即将销毁!");
    }

    /**
     * trigger执行
     */
    public void triggerComplete(Trigger trigger, JobExecutionContext jobExecutionContext, int i) {
        printRed("【任务调台平台】:Trigger[name:" + trigger.getName() + ",group:" + trigger.getGroup() + "]触发了!");
    }

    /**
     * 后台打印红字
     */
    private void printRed(String msg) {
        if (isPrintMessage)
            printRed(msg);
    }
}
