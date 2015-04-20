package org.nxstudio.modules.systemassist.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.ISysComunicateService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统交互Action】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/SysComunicateAction")
public class SysComunicateAction extends BaseAction {

    /**
     * 查询所有短信发送历史
     */
    @RequestMapping(params = "reqCode=getSendMesHis")
    public String getSendMesHis(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        List<Dto> list = g4Reader.queryForPage(
                "sysComunicate.queryT_SB_MESSAGE", pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysComunicate.countT_SB_MESSAGE", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 查询所有RTX通知发送历史
     */
    @RequestMapping(params = "reqCode=getRTXNotifyHis")
    public String getRTXNotifyHis(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        List<Dto> list = g4Reader.queryForPage(
                "sysComunicate.queryT_SB_RTX_NOTIFY", pDto);
        int total = (Integer) g4Reader.queryForObject(
                "sysComunicate.countT_SB_RTX_NOTIFY", pDto);

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }
}
