package org.nxstudio.modules.systemassist.controller;

import org.nxstudio.modules.systemassist.service.IMessageTplService;
import org.nxstudio.util.dao.ConditionQuery;
import org.nxstudio.util.dao.OrderBy;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.core.model.T_SB.MessageTpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【发送信息模板控制器】
 * 时间: 2013-06-11 下午4:00
 */
@Controller
@RequestMapping("/MessageTplAction")
public class MessageTplAction extends BaseAction {
    @Autowired
    private IMessageTplService messageTplService;

    /**
     * 增加一条模板
     */
    @RequestMapping(params = "reqCode=addTpl")
    public String addTpl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("create_date", new Date());

        //service
        MessageTpl tpl = messageTplService.save(pDto);
        if (tpl != null) {
            setOkTipMsg("已添加!", response);
        } else {
            setOkTipMsg("添加失败!", response);
        }

        return null;
    }

    /**
     * 根据id删除一条模板信息
     */
    @RequestMapping(params = "reqCode=delTpl")
    public String delTpl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        //service
        messageTplService.deleteObject(pDto);
        setOkTipMsg("已删除!", response);

        return null;
    }

    /**
     * 修改某一条模板信息
     */
    @RequestMapping(params = "reqCode=updTpl")
    public String updTpl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        //service
        messageTplService.update(pDto);
        setOkTipMsg("已更新!", response);

        return null;
    }

    /**
     * 查询某一条模板信息
     */
    @RequestMapping(params = "reqCode=getTpl")
    public String getTpl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        //service
        messageTplService.get(MessageTpl.class, pDto.getAsString("id"));
        setOkTipMsg("已更新!", response);

        return null;
    }

    /**
     * 根据条件查询所有模板信息(具有searchKey)
     */
    @RequestMapping(params = "reqCode=listTpl")
    public String listTpl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        //查询
        Page<MessageTpl> page = messageTplService.listAll(pDto);

        //转换
        String jsonString = JsonHelper.encodeList2PageJson(page.getItems(), page.getContext().getTotal(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return null;
    }
}
