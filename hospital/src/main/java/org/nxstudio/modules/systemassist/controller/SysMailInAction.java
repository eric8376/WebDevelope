package org.nxstudio.modules.systemassist.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.ISysMailInService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统内部邮件管理】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/SysMailInAction")
public class SysMailInAction extends BaseAction {
    @Autowired
    // 内部邮件服务类
    private ISysMailInService mailInService;

    /**
     * 存入草稿邮件
     */
    @RequestMapping(params = "reqCode=saveDraft")
    public String saveDraft(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("last_save_date", new Date());

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("send_user", userId);

        // service
        Dto outDto = mailInService.saveDraft(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 发送新邮件
     */
    @RequestMapping(params = "reqCode=sendMail")
    public String sendMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("send_date", new Date());

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("send_user", userId);

        // service
        Dto outDto = mailInService.sendMail(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 发送草稿邮件
     */
    @RequestMapping(params = "reqCode=sendDraft")
    public String sendDraft(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = mailInService.sendDraft(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 将发件移入历史匣子
     */
    @RequestMapping(params = "reqCode=deletesendMail")
    public String deletesendMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = mailInService.deletesendMail(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 将收件移入历史匣子
     */
    @RequestMapping(params = "reqCode=deleteRecMail")
    public String deleteRecMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = mailInService.deleteRecMail(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 将草稿件删除
     */
    @RequestMapping(params = "reqCode=deleteDraft")
    public String deleteDraft(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = mailInService.deleteDraft(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 获取邮件内容（文件阅读状态将会变化） 收件箱的邮件状态如果为0则上升状态 历史匣子的邮件状态如果为0则上升状态
     */
    @RequestMapping(params = "reqCode=getContent")
    public String getContent(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = mailInService.getContent(pDto);

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);
        setOkTipMsg(jsonString, response);

        return null;
    }

    /**
     * 获取发件箱邮件
     */
    @RequestMapping(params = "reqCode=getSendMail")
    public String getSendMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("userid", userId);

        // service
        List list = g4Reader.queryForPage("sysMailIn.queryT_SB_MAILIN_SENDS",
                pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysMailIn.countT_SB_MAILIN_SENDS", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 获取收件箱邮件
     */
    @RequestMapping(params = "reqCode=getRecMail")
    public String getRecMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("userid", userId);

        // service
        List list = g4Reader.queryForPage(
                "sysMailIn.queryT_SB_MAILIN_RECEIVES", pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysMailIn.countT_SB_MAILIN_RECEIVES", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 获取草稿箱邮件
     */
    @RequestMapping(params = "reqCode=getDraftMail")
    public String getDraftMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("userid", userId);

        // service
        List list = g4Reader.queryForPage("sysMailIn.queryT_SB_MAILIN_DRAFTS",
                pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysMailIn.countT_SB_MAILIN_DRAFTS", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 获取历史匣子邮件
     */
    @RequestMapping(params = "reqCode=getHisMail")
    public String getHisMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("userid", userId);

        // service
        List list = g4Reader.queryForPage(
                "sysMailIn.queryT_SB_MAILIN_HISTORYS", pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysMailIn.countT_SB_MAILIN_HISTORYS", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 获取收件箱【新邮件】
     */
    @RequestMapping(params = "reqCode=getNewMail")
    public String getNewMail(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获取当前登录人
        String userId = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("userid", userId);

        // service
        List list = g4Reader.queryForList("sysMailIn.queryT_SB_MAILIN_RECEIVES2", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 获取所有用户的ID和名字(用于在客户端解析 名字)
     */
    @RequestMapping(params = "reqCode=getAllUser")
    public String getAllUser(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // service
        List<Dto> list = g4Reader.queryForList("EAOrg.queryEaUser1");
        //转换成一个仿索引对象
        Dto indexDto = new BaseDto();
        for (int i = 0; i < list.size(); i++) {
            Dto tmpDto = list.get(i);
            indexDto.put("ID" + tmpDto.getAsString("userid"), tmpDto.getAsString("username"));
        }

        // 转换
        String jsonString = JsonHelper.encodeObject2Json(indexDto);
        super.write(jsonString, response);

        return null;
    }


}
