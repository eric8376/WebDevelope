package org.nxstudio.modules.systemassist.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.IFlowUrgeService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程催促Action】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/FlowUrgeAction")
public class FlowUrgeAction extends BaseAction {
    @Autowired
    private IFlowUrgeService flowService;

    /**
     * 查询流程
     */
    @RequestMapping(params = "reqCode=getFlows")
    public String getFlows(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 查询
        List list = g4Reader.queryForPage("flowUrge.queryT_SB_FLOW_URGE", pDto);
        int total = (Integer) g4Reader.queryForObject(
                "flowUrge.countT_SB_FLOW_URGE", pDto);

        // 以24小时制格式化时间
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询某个流程的催办设置
     */
    @RequestMapping(params = "reqCode=getUrges")
    public String getUrges(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 查询
        List list = g4Reader.queryForList("flowUrge.queryT_SB_FLOW_URGE_MX",
                pDto);

        // json转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 增加流程
     */
    @RequestMapping(params = "reqCode=addFlow")
    public String addFlow(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.addFlow(pDto);

        if (outDto.getAsBoolean("success")) {
            setOkTipMsg(outDto.getAsString("msg"), response);
        } else {
            setErrTipMsg(outDto.getAsString("msg"), response);
        }

        return "null";
    }

    /**
     * 删除流程
     */
    @RequestMapping(params = "reqCode=delFlow")
    public String delFlow(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.delFlow(pDto);

        setOkTipMsg("已删除!", response);

        return "null";
    }

    /**
     * 修改流程
     */
    @RequestMapping(params = "reqCode=updFlow")
    public String updFlow(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.updFlow(pDto);

        setOkTipMsg("已保存!", response);

        return "null";
    }


    /**
     * 添加催促设置
     */
    @RequestMapping(params = "reqCode=addUrge")
    public String addUrge(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.addUrge(pDto);

        setOkTipMsg("已删除!", response);

        return "null";
    }

    /**
     * 删除催促设置
     */
    @RequestMapping(params = "reqCode=delUrge")
    public String delUrge(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.delUrge(pDto);

        setOkTipMsg("已删除!", response);

        return "null";
    }

    /**
     * 修改催促设置
     */
    @RequestMapping(params = "reqCode=updUrge")
    public String updUrge(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        Dto outDto = flowService.updUrge(pDto);

        setOkTipMsg("已保存!", response);

        return "null";
    }

    /**
     * 获取所有用户的登录帐号和名字(用于下拉框选择)
     */
    @RequestMapping(params = "reqCode=getAllUserForCombo")
    public String getAllUserForCombo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // service
        List<Dto> list = g4Reader.queryForList("EAOrg.queryEaUser2");

        // 转换
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

}
