package org.nxstudio.service.quartz.job;

import org.nxstudio.core.model.T_SB.MessageTpl;
import org.nxstudio.service.quartz.ParamsCollection;
import org.nxstudio.service.quartz.service.TestService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/*
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【测试周期性任务-JOB】
 * 时间: 2013-06-10 下午4:36
 */
@Component
public class testJob extends ParamsCollection implements Job {

    //公共Service(获取模板设置)
    @Autowired
    private TestService testService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        System.err.println("我是测试Job，我被执行了....");
        for (int i = 0; i < 100; i++) {
//             MessageTpl mesTpl= testService.get(MessageTpl.class, Long.parseLong("10091833400"));//获取信息模板
        }

    }
}


