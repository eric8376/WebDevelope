package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;

import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务管理服务】
 * 时间: 2013-06-10 下午4:36
 */
public interface ITaskService {

    /**
     * 往一般任务当前队列增加一条记录
     */
    public Dto addSTQue(Dto pDto);

    /**
     * 删除当前一般任务队列转移到历史队列
     */
    public Dto delSTQueToHistory(Dto pDto);

    /**
     * 更新一般触发器
     */
    public Dto updSTQue(Dto pDto);

    /**
     * 查询一般任务当前队列中的所有记录
     */
    public List getCurrentSTQue();

    /**
     * 增加一条高级任务
     */
    public Dto addCTQue(Dto pDto);

    /**
     * 删除当前高级任务队列转移到历史队列
     */
    public Dto delCTQueToHistory(Dto pDto);

    /**
     * 更新高级任务
     */
    public Dto updCTQue(Dto pDto);

    /**
     * 查询高级任务当前队列中的所有记录
     */
    public List getCurrentCTQue();

    /**
     * 获取某任务的参数
     */
    public List getParamsBySerial(Dto pDto);


    /**
     * 获取队列中下一个id（当前所有队列最大id+1----已废除)
     */
    public int getMaxSerial();

    /**
     * 根据参数值查询某些一般任务
     */
    public List<Dto> getSTByParams(String key, String value);

    /**
     * 根据参数值查询某些一般任务(两个参数)
     */
    public List<Dto> getSTByParams(String key, String value, String key2, String value2);

    /**
     * 根据参数值查询某些高级任务
     */
    public List<Dto> getCTByParams(String key, String value);
}
