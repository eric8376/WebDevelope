package org.nxstudio.service.quartz.listeners;

import org.quartz.JobDetail;
import org.quartz.SchedulerException;
import org.quartz.Trigger;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【未命题】
 * 时间: 2013-06-17 上午9:32
 */

public class SchedulerListener implements org.quartz.SchedulerListener {
    /**
     * 是否打印消息
     */
    private boolean isPrintMessage = false;

    /**
     * 注册Job
     *
     * @param trigger
     */
    public void jobScheduled(Trigger trigger) {
        printRed("【任务调台平台】:Trigger[name:" + trigger.getName() + ",group:" + trigger.getGroup() + "]注册了...!");
    }

    /**
     * 解除注册
     */
    public void jobUnscheduled(String s, String s2) {
        printRed("【任务调台平台】:Trigger[name:" + s + ",group:" + s2 + "]注册信息解除注册了...!");
    }

    //触发器从注册器移除
    public void triggerFinalized(Trigger trigger) {
        printRed("【任务调台平台】:Trigger[name:" + trigger.getName() + ",group:" + trigger.getGroup() + "]注册信息移除了...!");
    }

    /**
     * 暂停触发器
     */
    public void triggersPaused(String s, String s2) {
        printRed("【任务调台平台】:Trigger[name:" + s + ",group:" + s2 + "]暂停了...!");
    }

    /**
     * 恢复触发器
     */
    public void triggersResumed(String s, String s2) {
        printRed("【任务调台平台】:Trigger[name:" + s + ",group:" + s2 + "]恢复了...!");
    }

    /**
     * 添加了Job
     */
    public void jobAdded(JobDetail jobDetail) {
        printRed("【任务调台平台】:jobDetail[name:" + jobDetail.getName() + ",group:" + jobDetail.getGroup() + "]被 添加了...!");
    }

    /**
     * 删除Job
     */
    public void jobDeleted(String s, String s2) {
        printRed("【任务调台平台】:jobDetail[name:" + s + ",group:" + s2 + "]被 删除了...!");
    }

    /**
     * 暂停Job
     */
    public void jobsPaused(String s, String s2) {
        printRed("【任务调台平台】:jobDetail[name:" + s + ",group:" + s2 + "]暂停了...!");
    }

    /**
     * 恢复Job
     */
    public void jobsResumed(String s, String s2) {
        printRed("【任务调台平台】:jobDetail[name:" + s + ",group:" + s2 + "]恢复了...!");
    }

    /**
     * 注册器异常
     */
    public void schedulerError(String s, SchedulerException e) {
        System.err.println("【任务调度平台】出现了异常:" + s);
        e.printStackTrace();
    }

    @Override
    public void schedulerInStandbyMode() {
        printRed("schedulerInStandbyMode");
    }

    /**
     * 启动
     */
    public void schedulerStarted() {
        printRed("\n======================");
        printRed(" ====任务调度平台启动成功 ====");
        printRed("======================");
    }

    /**
     * 关闭
     */
    public void schedulerShutdown() {
        printRed("\n======================");
        printRed("=== 任务调度平台关闭成功 ===");
        printRed("======================\n");
    }

    /**
     * 关闭中...
     */
    public void schedulerShuttingdown() {
        printRed("【任务调台平台】:平台关闭中...");
    }

    /**
     * 后台打印红字
     */
    private void printRed(String msg) {
        if (isPrintMessage)
            printRed(msg);
    }
}
