package org.nxstudio.core.service;

import org.nxstudio.core.model.Dto;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程超时管理提醒升级版】
 * 时间: 2013-08-21 下午2:05
 */

public interface IFlowUrge2Service {
    /**
     * 查询某发布流程的所有环节
     */
    public Dto getAllUrge(Dto pDto) throws Exception;

    /**
     * 增加一条环节设置
     */
    public Dto saveUrge(Dto pDto) throws Exception;

    /**
     * 删除一条环节设置
     */
    public Dto deleteUrge(Dto pDto) throws Exception;

    /**
     * 删除多条环节设置
     */
    public Dto deleteUrges(Dto pDto) throws Exception;

    /**
     * 更新一条环节设置
     */
    public Dto updateUrge(Dto pDto) throws Exception;


    /**
     * 查询某环节的任务到达提醒设置
     */
    public Dto getAllUrgeMx2(Dto pDto) throws Exception;

    /**
     * 增加一条到达提醒
     */
    public Dto saveUrgeMx2(Dto pDto) throws Exception;

    /**
     * 删除一条到达提醒
     */
    public Dto deleteUrgeMx2(Dto pDto) throws Exception;

    /**
     * 删除多条到达提醒
     */
    public Dto deleteUrgeMx2s(Dto pDto) throws Exception;

    /**
     * 高级删除多条到达提醒
     */
    public Dto deleteUrgeMx2s_special(Dto pDto) throws Exception;

    /**
     * 更新一条到达提醒
     */
    public Dto updateUrgeMx2(Dto pDto) throws Exception;


    /**
     * 查询某环节的任务超时提醒设置
     */
    public Dto getAllUrgeMx(Dto pDto) throws Exception;

    /**
     * 增加一条超时提醒
     */
    public Dto saveUrgeMx(Dto pDto) throws Exception;

    /**
     * 删除一条超时提醒
     */
    public Dto deleteUrgeMx(Dto pDto) throws Exception;

    /**
     * 删除多条超时提醒
     */
    public Dto deleteUrgeMxs(Dto pDto) throws Exception;

    /**
     * 高级删除多条超时提醒
     */
    public Dto deleteUrgeMxs_special(Dto pDto) throws Exception;

    /**
     * 更新一条超时提醒
     */
    public Dto updateUrgeMx(Dto pDto) throws Exception;


    //----------------复制粘贴功能----------------

    /**
     * 粘贴到任务到达提醒
     */
    public Dto saveToUrgeMx2(Dto pDto) throws Exception;

    /**
     * 粘帖到任务超时提醒
     */
    public Dto saveToUrgeMx(Dto pDto) throws Exception;

    /**
     * 粘贴到环节设置
     */
    public Dto saveToUrge(Dto pDto) throws Exception;

    /**
     * 粘贴到流程设置
     */
    public Dto saveToFlow(Dto pDto) throws Exception;

}
