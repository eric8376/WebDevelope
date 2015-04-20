package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.modules.systemassist.service.ITaskService;
import org.nxstudio.service.quartz.listeners.SchedulerListener;
import org.nxstudio.service.quartz.listeners.TriggerListener;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.quartz.*;
import org.quartz.impl.StdScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务调度平台】
 * 时间: 2013-06-10 下午4:36
 */
@Component
public class TServer {

    // 数据库服务类
    @Autowired
    private ITaskService service;
    //是否已启动过
    private static boolean isStart = false;
    //调度器
    @Autowired
    @Qualifier("quartzScheduler")
    private StdScheduler scheduler;
    //解决调度器不共享一份的问题
    private static StdScheduler scheduler_;


    /**
     * 启动
     */
    @PostConstruct
    public void start() {
        if (TServer.scheduler_ != null) {
            scheduler.shutdown();
            scheduler = TServer.scheduler_;
        } else {
            TServer.scheduler_ = scheduler;
        }

        //如果启动过了则返回
        if (isStart) {
            return;
        }

        try {
            // 启动
            scheduler.addSchedulerListener(new SchedulerListener());
            scheduler.addGlobalTriggerListener(new TriggerListener());
            scheduler.start();

            //进行同步上次结束时运行的任务
            syncST();
            syncCT();
            isStart = true;
        } catch (Exception e) {
            System.err.println("\n======================");
            System.err.println(" ===任务调度平台未成功启动===");
            System.err.println("======================");
            e.printStackTrace();
        }
    }

    /**
     * 关闭
     */
    public void shutdown() {
        //如果关闭过了则返回
        if (!isStart) {
            System.err.println("系统尝试关闭TServer-----------------=============>>>>>>>>>>>>>>>>>>>>>" + isStart);
            return;
        }

        try {
            scheduler.shutdown();
            //设置可以恢复
            if (TServer.scheduler_ == null) {
                isStart = false;
            }
        } catch (Exception e) {
            System.err.println("\n======================");
            System.err.println("===任务调度平台未成功关闭===");
            System.err.println("======================");
            e.printStackTrace();
        }
    }


    /**
     * 同步SimplerTrigger
     */
    public void syncST() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //获取所有的当前一般任务
        List queList = service.getCurrentSTQue();
        Dto pDto = new BaseDto();

        //恢复一般任务
        for (int i = 0; i < queList.size(); i++) {
            Dto tmpDto = (Dto) queList.get(i);

            //配置参数
            pDto.put("serial", tmpDto.getAsString("serial"));
            List paramList = service.getParamsBySerial(pDto);
            Map map = new BaseDto();
            for (int j = 0; j < paramList.size(); j++) {
                Dto tmpDto2 = (Dto) paramList.get(j);
                map.put(tmpDto2.getAsString("p_key"), tmpDto2.getAsString("p_value"));
            }
            map.put("serial", pDto.getAsString("serial"));
            JobDataMap jdm = new JobDataMap(map);

            //注册任务
            Date begin_datetime = new Date();
            try {
                begin_datetime = sdf.parse(tmpDto.getAsString("begin_datetime"));
            } catch (Exception e) {
                e.printStackTrace();
            }
            createST(tmpDto.getAsString("serial"), begin_datetime, tmpDto.getAsInteger("repeat_count"), tmpDto.getAsLong("repeat_interval"), tmpDto.getAsString("class_name"), jdm);
        }

        System.out.println("【任务调度平台】：同步一般任务成功!");
    }

    /**
     * 同步CronTrigger
     */
    public void syncCT() throws Exception {
        //获取所有的当前一般任务
        List queList = service.getCurrentCTQue();
        Dto pDto = new BaseDto();

        //恢复一般任务
        for (int i = 0; i < queList.size(); i++) {
            Dto tmpDto = (Dto) queList.get(i);

            //配置参数
            pDto.put("serial", tmpDto.getAsString("serial"));
            List paramList = service.getParamsBySerial(pDto);
            Map map = new BaseDto();
            for (int j = 0; j < paramList.size(); j++) {
                Dto tmpDto2 = (Dto) paramList.get(j);
                map.put(tmpDto2.getAsString("p_key"), tmpDto2.getAsString("p_value"));
            }
            map.put("serial", pDto.getAsString("serial"));
            JobDataMap jdm = new JobDataMap(map);

            //注册任务      serialNow, className, map, cronExp
            createCT(tmpDto.getAsString("serial"), tmpDto.getAsString("class_name"), jdm, tmpDto.getAsString("cron_exp"));
        }
        System.out.println("【任务调度平台】：同步高级任务成功!");
    }


    /**
     * 创建SimplerTrigger(新增一般任务)
     */
    public int createST(Date startTime, int repeatCount, long Interval, String className, JobDataMap map, String explain) throws Exception {

        //创建
        String serialNow = getSerial();
        boolean res = createST(serialNow, startTime, repeatCount, Interval, className, map);

        if (res) {
            //同步数据库
            Dto dto = new BaseDto();
            dto.put("serial", serialNow);
            dto.put("begin_datetime", startTime);
            dto.put("repeat_count", repeatCount);
            dto.put("repeat_interval", Interval);
            dto.put("class_name", className);
            dto.put("explain", explain);
            dto.put("jdm", map);
            service.addSTQue(dto);
            return 1;
        }

        return 0;
    }

    /**
     * 创建SimplerTrigger(内部使用(包括序列号)
     */
    private boolean createST(String theSerail, Date startTime, int repeatCount, long Interval, String className, JobDataMap map) throws Exception {
        //创建任务
        JobDetail job = new JobDetail("j" + theSerail, "st", loadClass(className));
        job.setJobDataMap(map);

        //创建触发器
        SimpleTrigger st = new SimpleTrigger("t" + theSerail, "st");
        st.setStartTime(startTime);
        st.setRepeatCount(repeatCount);
        st.setRepeatInterval(Interval == 0 ? 1000 : Interval);

        try {
            //注册执行
            scheduler.scheduleJob(job, st);
            return true;
        } catch (Exception e) {
            System.err.println("【任务调度平台】：OH MY God!!!创建SimplerTrigger出现了异常...");
            throw e;
        }
    }

    /**
     * 创建CronTrigger
     */
    public void createCT(String className, JobDataMap map, String cronExp, String explain) throws Exception {
        String serialNow = getSerial();
        createCT(serialNow, className, map, cronExp);

        //同步数据库
        Dto dto = new BaseDto();
        dto.put("serial", serialNow);
        dto.put("cron_exp", cronExp);
        dto.put("class_name", className);
        dto.put("explain", explain);
        dto.put("jdm", map);
        service.addCTQue(dto);

    }

    /**
     * 创建CronTrigger (内部使用(包括序列号)
     */
    private void createCT(String serial, String className, JobDataMap map, String cronExp) throws Exception {
        //创建任务
        JobDetail job = new JobDetail("j" + serial, "ct", loadClass(className));
        job.setJobDataMap(map);

        //创建触发器
        CronTrigger ct = new CronTrigger("t" + serial, "ct", cronExp);

        //注册执行
        scheduler.scheduleJob(job, ct);
    }


    /**
     * 终止SimplerTrigger
     *
     * @param endType 结束类型 1:自然结束 2web端强制结束 3事件结束 4其它结束
     */
    public boolean stopST(String theSerial, int endType) {

        try {
            boolean res = scheduler.deleteJob("j" + theSerial, "st");

            //同步数据库
            Dto pDto = new BaseDto();
            pDto.put("serial", theSerial);
            pDto.put("endType", endType);
            service.delSTQueToHistory(pDto);

            return res;
        } catch (Exception e) {
            System.err.println("【任务调度平台】：OH MY God!!!终止SimplerTrigger时出现了异常...");
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 终止CronTrigger
     *
     * @param endType 结束类型 1:自然结束 2web端强制结束 3事件结束 4其它结束
     */
    public boolean stopCT(String theSerial, int endType) {
        try {
            boolean res = scheduler.deleteJob("j" + theSerial, "ct");

            //同步数据库
            Dto pDto = new BaseDto();
            pDto.put("serial", theSerial);
            pDto.put("endType", endType);
            service.delCTQueToHistory(pDto);

            return res;
        } catch (Exception e) {
            System.err.println("【任务调度平台】：OH MY God!!!终止SimplerTrigger时出现了异常...");
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 修改SimplerTrigger配置
     */
    public boolean resetST(int theSerial, Date startTime, int repeatCount, long Interval, String className, JobDataMap map, String explain) {

        try {
            //设置job
            JobDetail job = scheduler.getJobDetail("j" + theSerial, "st");
            job.setJobDataMap(map);
            job.setJobClass(loadClass(className));

            //设置trigger
            SimpleTrigger tri = (SimpleTrigger) scheduler.getTrigger("t" + theSerial, "st");
            tri.setStartTime(startTime);
            tri.setRepeatCount(repeatCount);
            tri.setRepeatInterval(Interval);

            //重新注册
            scheduler.rescheduleJob("j" + theSerial, "st", tri);

            //同步数据库
            Dto dto = new BaseDto();
            dto.put("serial", theSerial);
            dto.put("begin_datetime", startTime);
            dto.put("repeat_count", repeatCount);
            dto.put("repeat_interval", Interval);
            dto.put("class_name", className);
            dto.put("explain", explain);
            service.updSTQue(dto);

            return true;
        } catch (Exception e) {
            System.err.println("【任务调度平台】：OH MY God!!!修改SimplerTrigger配置时出现了异常...");
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 修改CronTrigger配置
     */
    public boolean resetCT(String theSerial, String className, JobDataMap map, String cronExp, String explain) {
        try {
            //设置job
            JobDetail job = scheduler.getJobDetail("j" + theSerial, "ct");
            job.setJobDataMap(map);
            job.setJobClass(loadClass(className));

            //设置trigger
            CronTrigger tri = (CronTrigger) scheduler.getTrigger("t" + theSerial, "ct");
            tri.setCronExpression(cronExp);

            //重新注册
            scheduler.rescheduleJob("j" + theSerial, "ct", tri);

            //同步数据库
            Dto dto = new BaseDto();
            dto.put("serial", theSerial);
            dto.put("cron_exp", cronExp);
            dto.put("class_name", className);
            dto.put("explain", explain);
            service.updCTQue(dto);

            return true;
        } catch (Exception e) {
            System.err.println("【任务调度平台】：OH MY God!!!修改CronTrigger配置时出现了异常...");
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 根据类全名加载该类
     */
    private Class loadClass(String className) {
        //return Class.forName(className);
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        try {
            Class tmp = loader.loadClass(className);
            return tmp;
        } catch (ClassNotFoundException e) {
            System.err.println("【任务调度平台】：" + className + "未成功加载...");
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 获取Serial
     */
    public String getSerial() {
        return IDHelper.getCodeID();
    }


    //--------------------------getter&setter--------------------------------
    public ITaskService getService() {
        return service;
    }

    public void setService(ITaskService service) {
        this.service = service;
    }

    public StdScheduler getScheduler() {
        return scheduler;
    }

    public void setScheduler(StdScheduler scheduler) {
        this.scheduler = scheduler;
    }

    public static StdScheduler getScheduler_() {
        return scheduler_;
    }

    public static void setScheduler_(StdScheduler scheduler_) {
        TServer.scheduler_ = scheduler_;
    }
}
