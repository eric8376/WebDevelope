package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemassist.dao.SysComunicateDao;
import org.nxstudio.modules.systemassist.service.ISysComunicateService;
import org.nxstudio.plugin.rtx.RTXServer;
import org.nxstudio.plugin.sms.MessageServer;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Decoder;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统交互服务(Email外发、短信、RTX)】
 * 时间: 2013-06-10 下午4:36
 */
@Service("sysComunicateService")
public class SysComunicateService implements
        ISysComunicateService {

    @Autowired
    private SysComunicateDao sysComunicateDao;

    // 外发短信服务
    MessageServer MesServer = new MessageServer();
    // RTX服务
    RTXServer RTXServer = new RTXServer();
    //读取配置文件
    private PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);

    /**
     * 发送一条普通短信
     *
     * @param pDto 1、type 短信类型（1：普通短信 2：彩信）
     *             2、send_type   发送类型(1:系统发送 2：用户发送)
     *             3、send_user和rec_user 当前操作发送人的账号和接收者的账号
     *             4、rec_phone和message 接收人手机号码与发送的短信内容
     */
    public Dto sendMessage(Dto pDto) {
        if (pDto.getAsString("rec_phone").isEmpty()) {
            return null;
        }
        // 获取账号密码
        String account = pHelper.getValue("message_server_account");
        String password = /*getFromBase64(*/pHelper.getValue("message_server_password"/*)*/);

        //发送短信
        String res_flag = MesServer.sendSms(account, password,
                pDto.getAsString("rec_phone"), pDto.getAsString("message"), "");

        pDto.put("mes_no", IDHelper.getCodeID());
        pDto.put("send_account", account);
        pDto.put("send_date", new Date());
        pDto.put("res_flag", res_flag);

        // 加入记录表
        sysComunicateDao.insert("sysComunicate.insertT_SB_MESSAGE", pDto);

        return pDto;
    }

    /**
     * 发送一条RTX通告
     */
    public Dto sendRTX(Dto pDto) {
        // 获取主机号和端口
        String host = pHelper.getValue("RTX_server_host");
        int port = Integer.parseInt(pHelper.getValue("RTX_server_port"));

        //信息转换
        Map map = new HashMap();
        map.put("title", pDto.getAsString("title"));
        map.put("msg", pDto.getAsString("msg"));
        map.put("receiver", pDto.getAsString("receiver"));
        pDto.put("notify_no", IDHelper.getCodeID());
        pDto.put("send_date", new Date());

        //发送RTX通告
        int res_flag = RTXServer.sendNotifyByHttp(host, port, map);
        pDto.put("res_flag", res_flag);

        //加入 记录表
        sysComunicateDao.insert("sysComunicate.insertT_SB_RTX_NOTIFY", pDto);

        return pDto;
    }

    /**
     * 根据角色发送信息或rtx
     *
     * @param pDto
     */
    public void senMessageOrRtxByRoleName(Dto pDto, int senttype, String mes) {
        List<Dto> users = sysComunicateDao.queryForList("tasklist.getFactoryPerson", pDto);
        for (Dto tempUserDto : users) {
            String user_phone = tempUserDto.getAsString("user_phone");
            if (user_phone == null || user_phone.isEmpty() || user_phone.equals("")) {
                continue;
            }
            String username = tempUserDto != null ? tempUserDto.getAsString("username") : "";
            String useraccount = tempUserDto != null ? tempUserDto.getAsString("account") : "";
            String userid = tempUserDto != null ? tempUserDto.getAsString("userid") : "";
            if (senttype == 0) {
                Dto mesDto = new BaseDto();
                mesDto.put("type", 1);
                mesDto.put("send_type", 1);
                mesDto.put("send_user", "system");
                mesDto.put("rec_user", userid);
                mesDto.put("rec_phone", user_phone);
                mesDto.put("message", mes);
                this.sendMessage(mesDto);
            } else if (senttype == 1) {
                Dto mesToService = new BaseDto();
                mesToService.put("type", 1);
                mesToService.put("send_user", "system");
                mesToService.put("rec_users", userid);
                mesToService.put("receiver", useraccount);//改成登录账号
                mesToService.put("msg", mes);
                this.sendRTX(mesToService);
            }

        }
    }


    // 解密
    private static String getFromBase64(String s) {
        byte[] b = null;
        String result = null;
        if (s != null) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                b = decoder.decodeBuffer(s);
                result = new String(b, "UTF-16BE");
                b = decoder.decodeBuffer(result);
                result = new String(b, "UTF-16LE");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
