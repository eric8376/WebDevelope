package org.nxstudio.modules.systemassist.service.impl;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemassist.common.MsgResult;
import org.nxstudio.modules.systemassist.common.SimpleMsgApi;
import org.nxstudio.modules.systemassist.common.springMailConfig;
import org.nxstudio.modules.systemassist.dao.SysMailInDao;
import org.nxstudio.modules.systemassist.service.ISysMailInService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统内部邮件 实现类】
 * 时间: 2013-06-10 下午4:36
 * 修改者：吴为超
 * 时间：2014-08-12
 */
@Service("mailInService")
public class SysMailInService implements ISysMailInService {

    private static Logger logger = Logger.getLogger(SysMailInService.class);
    @Autowired
    private SysMailInDao sysMailInDao;

    @Autowired
    private springMailConfig springMailConfig; // spring xml 中定义

    /**
     * 统一使用UTF-8格式发送邮件
     */
    private static final String ENCODING = "utf-8";

    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Autowired
    private MailSender mailSender;

    @Autowired
    private SimpleMailMessage simpleMailMessage;

    @Autowired
    private SimpleMsgApi simpleMsgApi;

    private PropertiesHelper helper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);

    /**
     * 存入草稿邮件
     */
    public Dto saveDraft(Dto pDto) {
        // id不存在则创建
        if (pDto.getAsString("draft_no").equals("")
                || pDto.getAsString("draft_no") == null) {
            // 创建邮件
            String mail_no = IDHelper.getCodeID();
            pDto.put("mail_no", mail_no);
            sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_MAILINFO", pDto);

            // 创建草稿
            String draft_no = IDHelper.getCodeID();
            pDto.put("draft_no", draft_no);
            sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_DRAFTS", pDto);
        }
        // id存在则保存
        else {
            // 保存邮件
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_MAILINFO", pDto);
            // 保存草稿
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_DRAFTS", pDto);
        }

        return pDto;
    }

    /**
     * 发送新邮件
     */
    public Dto sendMail(Dto pDto) {
        //存储如果有回复的回复编号
        String rec_no_Tmp = pDto.getAsString("rec_no");

        // 创建邮件
        String mail_no = IDHelper.getCodeID();
        pDto.put("mail_no", mail_no);
        sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_MAILINFO", pDto);

        // 创建新 发件
        String send_no = IDHelper.getCodeID();
        pDto.put("send_no", send_no);
        sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_SENDS", pDto);

        // 遍历收件人存至收件箱
        pDto.put("rec_date", new Date());
        pDto.put("status", 0);
        String[] receipts = pDto.getAsString("receipts").split(",");
        for (int i = 0; i < receipts.length; i++) {
            // 创建收件
            String rec_no = IDHelper.getCodeID();
            pDto.put("rec_no", rec_no);
            pDto.put("receipts", receipts[i]);
            sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_RECEIVES", pDto);
        }

        // 改变需要改变状态的收件
        if (!rec_no_Tmp.equals("")) {
            pDto.put("status", 2);//已回复状态
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_RECEIVES", pDto);
        }

        return pDto;
    }

    /**
     * 发送草稿邮件
     */
    public Dto sendDraft(Dto pDto) {

        // 获取草稿邮件
        Dto draftDto = (Dto) sysMailInDao.queryForObject(
                "sysMailIn.selectT_SB_MAILIN_DRAFTS", pDto);

        //存储如果有回复的回复编号
        String rec_no_Tmp = draftDto.getAsString("rec_no");

        // 存入新邮件
        if (draftDto == null) {
            return pDto;
        }

        //加入发件箱
        String send_no = draftDto.getAsString("draft_no");
        draftDto.put("send_no", send_no);
        draftDto.put("send_date", new Date());
        sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_SENDS", draftDto);

        // 遍历收件人存至收件箱
        draftDto.put("rec_date", new Date());
        draftDto.put("status", 0);
        String[] receipts = draftDto.getAsString("receipts").split(",");
        for (int i = 0; i < receipts.length; i++) {
            // 创建收件
            String rec_no = IDHelper.getCodeID();
            draftDto.put("rec_no", rec_no);
            draftDto.put("receipts", receipts[i]);
            sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_RECEIVES", draftDto);
        }

        // 删除草稿邮件
        sysMailInDao.delete("sysMailIn.deleteT_SB_MAILIN_DRAFTS", pDto);
        // 改变需要改变状态的收件
        if (!rec_no_Tmp.equals("")) {
            pDto.put("status", 2);//已回复状态
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_RECEIVES", draftDto);
        }

        return draftDto;
    }

    /**
     * 将发件移入历史匣子
     */
    public Dto deletesendMail(Dto pDto) {
        // 查询该发件
        Dto sendDto = (Dto) sysMailInDao.queryForObject(
                "sysMailIn.selectT_SB_MAILIN_SENDS", pDto);

        // 增加记录至历史匣子
        sendDto.put("his_no", sendDto.getAsString("send_no"));
        sendDto.put("belong_user", sendDto.getAsString("send_user"));
        sendDto.put("s_r_type", 1);
        sendDto.put("s_r_date", sendDto.getAsDate("send_date"));
        sendDto.put("abandon_date", new Date());
        sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_HISTORYS", sendDto);

        // 删除该发件信息
        sysMailInDao.delete("sysMailIn.deleteT_SB_MAILIN_SENDS", pDto);

        return sendDto;
    }

    /**
     * 将收件移入历史匣子
     */
    public Dto deleteRecMail(Dto pDto) {
        // 查询该收件
        Dto recDto = (Dto) sysMailInDao.queryForObject(
                "sysMailIn.selectT_SB_MAILIN_RECEIVES", pDto);

        // 增加记录至历史匣子
        recDto.put("his_no", recDto.getAsString("rec_no"));
        recDto.put("belong_user", recDto.getAsString("receipts"));
        recDto.put("s_r_type", 2);
        recDto.put("s_r_date", recDto.getAsDate("rec_date"));
        recDto.put("abandon_date", new Date());
        sysMailInDao.insert("sysMailIn.insertT_SB_MAILIN_HISTORYS", recDto);

        // 删除该收件信息
        sysMailInDao.delete("sysMailIn.deleteT_SB_MAILIN_RECEIVES", pDto);

        return recDto;
    }

    /**
     * 将草稿件直接删除
     */
    public Dto deleteDraft(Dto pDto) {
        // 获取草稿件
        Dto draftDto = (Dto) sysMailInDao.queryForObject(
                "sysMailIn.selectT_SB_MAILIN_DRAFTS", pDto);

        // 删除邮件
        sysMailInDao.delete("sysMailIn.deleteT_SB_MAILIN_MAILINFO", draftDto);

        // 删除该草稿信息
        sysMailInDao.delete("sysMailIn.deleteT_SB_MAILIN_DRAFTS", pDto);

        return draftDto;
    }

    /**
     * 获取邮件内容（文件阅读状态将会变化） 收件箱的邮件状态如果为0则上升状态 历史匣子的邮件状态如果为0则上升状态
     */
    public Dto getContent(Dto pDto) {
        // 获取收件更改状态
        if (pDto.getAsInteger("type") == 1) {
            // 改变需要改变状态的收件
            pDto.put("rec_no", pDto.getAsString("the_no"));
            pDto.put("read_date", new Date());
            pDto.put("status", 1);
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_RECEIVES", pDto);
        }
        // 获取历史需要更改状态的
        else if (pDto.getAsInteger("type") == 2) {
            // 改变需要改变状态的收件
            pDto.put("his_no", pDto.getAsString("the_no"));
            pDto.put("read_date", new Date());
            pDto.put("status", 1);
            sysMailInDao.update("sysMailIn.updateT_SB_MAILIN_HISTORYS", pDto);
        }

        Dto mailDto = (Dto) sysMailInDao.queryForObject("sysMailIn.queryT_SB_MAILIN_MAILINFO", pDto);
        return mailDto;
    }


    /**
     * 发送邮件
     *
     * @param subject
     * @param text
     * @param destination
     * @return
     */
    @Override
    public boolean sendMail(String subject, String text, String destination) {
        boolean sendresult = true;
        Dto dto = new BaseDto();
        dto.put("msg_info", "[Them]:" + subject + "[Text]:" + text);
        dto.put("is_success", "COM00102");
        dto.put("send_time", simpleDateFormat.format(new Date()));
        dto.put("send_peo", simpleMailMessage.getFrom());
        dto.put("receive_peo", destination);
        dto.put("msg_type", 0);
        String codeID = sysMailInDao.saveMessageInfo(dto);
        try {
            simpleMailMessage.setText(text);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setTo(destination);
            mailSender.send(simpleMailMessage);
            dto.put("record_id", codeID);
            sysMailInDao.updateMessageStatu(dto);
        } catch (Exception e) {
            sendresult = false;
        }
        return sendresult;
    }


    /**
     * 发送短信
     *
     * @param mobile
     * @param content
     * @param userId
     * @return
     */
    @Override
    public boolean sendMsg(String mobile, String content, String userId) {
//        HttpServletRequest request =  ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String send_sms = helper.getValue("SEND_SMS");
        logger.info("当前短信发送开关为：" + send_sms);
        if ("1".equals(send_sms)) {
            Dto dto = new BaseDto();
            dto.put("msg_info", content);
            dto.put("is_success", "COM00102");
            dto.put("send_time", simpleDateFormat.format(new Date()));
            dto.put("send_peo", userId);
            dto.put("receive_peo", mobile);
            dto.put("msg_type", 1);
            String codeID = sysMailInDao.saveMessageInfo(dto);
            if (G4Utils.isEmpty(mobile) || G4Utils.isEmpty(content)) {
                return false;
            }
            mobile = StringUtils.deleteWhitespace(mobile);
//        content = StringUtils.trim(content).concat("详询").concat(UnionConfig.CONTACT).concat("【").concat(UnionConfig.BRAND).concat("】");
            MsgResult result = simpleMsgApi.sendSms(mobile, StringUtils.trim(content).concat("【").concat("迈微").concat("】"));
            if ("0".equals(result.getState())) {
                dto.put("record_id", codeID);
                sysMailInDao.updateMessageStatu(dto);
                return true;
            }
        }
        return false;
    }


}
