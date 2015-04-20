package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;

import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程催促服务】
 * 时间: 2013-06-10 下午4:36
 */
public interface IFlowUrgeService {

    /**
     * 增加流程
     */
    public Dto addFlow(Dto pDto);

    /**
     * 删除流程
     */
    public Dto delFlow(Dto pDto);

    /**
     * 修改流程
     */
    public Dto updFlow(Dto pDto);


    /**
     * 增加催促设置
     */
    public Dto addUrge(Dto pDto);

    /**
     * 删除催促设置
     */
    public Dto delUrge(Dto pDto);

    /**
     * 修改催促设置
     */
    public Dto updUrge(Dto pDto);


    /**
     * 获取某个环节的设置信息
     */
    public List<Dto> getFlow(String flowNo, String point_no);

    /**
     * 获取某个环节的催促信息
     */
    public List<Dto> getUrge(Long urgeNo);
}
