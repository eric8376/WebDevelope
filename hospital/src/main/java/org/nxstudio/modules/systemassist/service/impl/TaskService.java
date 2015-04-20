package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemassist.dao.TaskDao;
import org.nxstudio.modules.systemassist.service.ITaskService;
import org.nxstudio.util.idgenerator.IDHelper;
import org.quartz.JobDataMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务管理服务实现类】
 * 时间: 2013-06-10 下午4:36
 */
@Service("taskService1")
public class TaskService implements ITaskService {


    @Autowired
    private TaskDao taskDao;

    /**
     * 往一般任务当前队列增加一条记录
     */
    public Dto addSTQue(Dto pDto) {
        //添加新任务
        taskDao.insert("taskMgr.insertT_SB_TSERVER_CURRENT_QUE_ST", pDto);

        //添加任务参数
        JobDataMap jdm = (JobDataMap) pDto.get("jdm");
        String[] keys = jdm.getKeys();
        for (int i = 0; i < keys.length; i++) {
            pDto.put("p_no", IDHelper.getCodeID());
            pDto.put("p_key", keys[i]);
            pDto.put("p_value", jdm.get(keys[i]));
            taskDao.insert("taskMgr.insertT_SB_TSERVER_QUE_PARAMS", pDto);
        }
        return pDto;
    }

    /**
     * 删除当前一般任务队列转移到历史队列
     */
    public Dto delSTQueToHistory(Dto pDto) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //获取队列信息
        List list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_ST1", pDto);
        if (list.size() == 0) {
            pDto.put("msg", "在当前队列中找不到对应的记录");
            return pDto;
        }
        Dto tmpDto = (Dto) list.get(0);

        //删除当前队列
        taskDao.delete("taskMgr.deleteT_SB_TSERVER_CURRENT_QUE_ST", pDto);

        Date begin_datetime = new Date();
        try {
            begin_datetime = sdf.parse(tmpDto.getAsString("begin_datetime"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        tmpDto.put("begin_datetime", begin_datetime);
        tmpDto.put("end_type", pDto.getAsInteger("endType"));
        tmpDto.put("end_time", new Date());
        tmpDto.put("param1", "一般任务");
        tmpDto.put("param2", tmpDto.getAsInteger("repeat_count"));
        tmpDto.put("param3", tmpDto.getAsInteger("repeat_interval"));
        tmpDto.put("param4", "");

        //加入历史队列
        taskDao.insert("taskMgr.insertT_SB_TSERVER_HISTORY_QUE", tmpDto);
        return pDto;
    }

    /**
     * 更新一般触发器
     */
    public Dto updSTQue(Dto pDto) {
        taskDao.update("taskMgr.updateT_SB_TSERVER_CURRENT_QUE_ST", pDto);
        return pDto;
    }

    /**
     * 查询一般任务当前队列中的所有记录
     */
    public List getCurrentSTQue() {
        List list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_ST");
        return list;
    }


    /**
     * 增加一条高级任务
     */
    public Dto addCTQue(Dto pDto) {
        //添加新任务
        taskDao.insert("taskMgr.insertT_SB_TSERVER_CURRENT_QUE_CT", pDto);

        //添加任务参数
        JobDataMap jdm = (JobDataMap) pDto.get("jdm");
        String[] keys = jdm.getKeys();
        for (int i = 0; i < keys.length; i++) {
            pDto.put("p_no", IDHelper.getCodeID());
            pDto.put("p_key", keys[i]);
            pDto.put("p_value", jdm.get(keys[i]));
            taskDao.insert("taskMgr.insertT_SB_TSERVER_QUE_PARAMS", pDto);
        }
        return pDto;
    }

    /**
     * 删除当前高级任务队列转移到历史队列
     */
    public Dto delCTQueToHistory(Dto pDto) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //获取队列信息
        List list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_CT1", pDto);
        if (list.size() == 0) {
            pDto.put("msg", "在当前队列中找不到对应的记录");
            return pDto;
        }
        Dto tmpDto = (Dto) list.get(0);

        //删除当前队列
        taskDao.delete("taskMgr.deleteT_SB_TSERVER_CURRENT_QUE_CT", pDto);

        Date create_date = new Date();
        try {
            create_date = sdf.parse(tmpDto.getAsString("create_date"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        tmpDto.put("begin_datetime", create_date);
        tmpDto.put("end_type", pDto.getAsInteger("endType"));
        tmpDto.put("end_time", new Date());
        tmpDto.put("param1", "高级任务");
        tmpDto.put("param2", tmpDto.getAsString("cron_exp"));
        tmpDto.put("param3", "");
        tmpDto.put("param4", "");

        //加入历史队列
        taskDao.insert("taskMgr.insertT_SB_TSERVER_HISTORY_QUE", tmpDto);
        return pDto;
    }

    /**
     * 更新高级任务
     */
    public Dto updCTQue(Dto pDto) {
        taskDao.update("taskMgr.updateT_SB_TSERVER_CURRENT_QUE_CT", pDto);
        return pDto;
    }


    /**
     * 查询高级任务当前队列中的所有记录
     */
    public List getCurrentCTQue() {
        List list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_CT");
        return list;
    }


    /**
     * 获取某任务的参数
     */
    public List getParamsBySerial(Dto pDto) {
        List list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_QUE_PARAMS", pDto);
        return list;
    }


    /**
     * 获取队列中下一个id（当前所有队列最大id+1)
     */
    public int getMaxSerial() {
        //查询当前队列中最大值
        String tmp1 = (String) taskDao.queryForObject("taskMgr.maxT_SB_TSERVER_CURRENT_QUE_ST");

        //查询历史队列中最大值
        String tmp2 = (String) taskDao.queryForObject("taskMgr.maxT_SB_TSERVER_HISTORY_QUE");

        int maxNo1 = tmp1 == null ? 1 : Integer.parseInt(tmp1) + 1;
        int maxNo2 = tmp2 == null ? 1 : Integer.parseInt(tmp2) + 1;

        int maxNo = maxNo1 > maxNo2 ? maxNo1 : maxNo2;
        return maxNo;
    }

    /**
     * 根据参数值查询某些一般任务
     */
    public List<Dto> getSTByParams(String key, String value) {
        Dto pDto = new BaseDto();
        pDto.put("key", key);
        pDto.put("value", value);
        List<Dto> list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_ST2", pDto);
        return list;
    }

    /**
     * 根据参数值查询某些一般任务(两个参数)
     */
    public List<Dto> getSTByParams(String key, String value, String key2, String value2) {
        Dto pDto = new BaseDto();
        pDto.put("key", key);
        pDto.put("value", value);
        pDto.put("key2", key2);
        pDto.put("value2", value2);
        List<Dto> list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_ST3", pDto);
        return list;
    }

    /**
     * 根据参数值查询某些高级任务
     */
    public List<Dto> getCTByParams(String key, String value) {
        Dto pDto = new BaseDto();
        pDto.put("key", key);
        pDto.put("value", value);
        List<Dto> list = taskDao.queryForList("taskMgr.queryT_SB_TSERVER_CURRENT_QUE_CT2", pDto);
        return list;
    }

}

