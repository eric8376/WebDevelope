package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;

/**
 * 系统交互服务(Email外发、短信、RTX)
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统交互服务(Email外发、短信、RTX)】
 * 时间: 2013-06-10 下午4:36
 */
public interface ISysComunicateService {

    /**
     * 发送一条短信
     */
    public Dto sendMessage(Dto pDto);


    /**
     * 发送一条RTX通知
     */
    public Dto sendRTX(Dto pDto);

    /**
     * 根据角色发送信息或rtx
     *
     * @param pDto
     * @param sentype 0表示发送发送短信，1表示发送rtx
     * @param mes     要发送的信息内容
     */
    public void senMessageOrRtxByRoleName(Dto pDto, int sentype, String mes);
}
