package org.nxstudio.modules.tool.service;

import org.nxstudio.core.model.Dto;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【驱动Service,集中管理Service】
 * 时间: 2013-06-21 上午9:58
 */

public interface IDriveService {
    /**
     * 代理执行本Service的某个方法
     *
     * @param method 方法名
     * @param pDto   参数统一放在dto里
     * @return
     */
    public Dto dobatch(String method, Dto pDto) throws Exception;

    /**
     * 获取成功返回时的Ext Json 形式
     *
     * @param success 是否成功
     */
    public Dto getResDto(boolean success);

    /**
     * 获取成功返回时的Ext Json 形式
     *
     * @param success 是否成功
     * @param msg     返回的消息
     */
    public Dto getResDto(boolean success, String msg);

    /**
     * 获取成功返回时的 Ext Json 形式  （表单形式）
     *
     * @param success 是否成功
     * @param data    返回的消息
     */
    public Dto getDataDto(boolean success, Object data);

    /**
     * 获取成功返回时的 Ext Json 形式  （表格形式）
     *
     * @param data 返回的消息
     */
    public Dto getGridDto(Object data);
}
