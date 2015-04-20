package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统内部邮件】
 * 时间: 2013-06-10 下午4:36
 * 修改者：吴为超
 * 时间：2014-08-12
 */
public interface ISysMailInService {
    /**
     * 存入草稿邮件
     */
    public Dto saveDraft(Dto pDto);

    /**
     * 发送新邮件
     */
    public Dto sendMail(Dto pDto);

    /**
     * 发送草稿邮件
     */
    public Dto sendDraft(Dto pDto);

    /**
     * 将发件移入历史匣子
     */
    public Dto deletesendMail(Dto pDto);

    /**
     * 将收件移入历史匣子
     */
    public Dto deleteRecMail(Dto pDto);

    /**
     * 将草稿件移入历史匣子
     */
    public Dto deleteDraft(Dto pDto);

    /**
     * 获取邮件内容（文件阅读状态将会变化） 收件箱的邮件状态如果为0则上升状态 历史匣子的邮件状态如果为0则上升状态
     */
    public Dto getContent(Dto pDto);


    /**
     * 发送邮件
     * 吴为超　添加
     *
     * @param subject
     * @param text
     * @param destination
     * @return
     */
    public boolean sendMail(String subject, String text, String destination);

    /**
     * 发送短信
     * 吴为超　添加
     *
     * @param mobile
     * @param content
     * @param userId
     * @return
     */
    public boolean sendMsg(String mobile, String content, String userId);

}
