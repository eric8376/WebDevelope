package org.nxstudio.modules.systemassist.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.ISystemBaseService;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【Ext4主页跳转与处理】
 * 时间: 2013-06-26 11:00
 */
@Controller
@RequestMapping("/SystemBaseAction")
public class SystemBaseManageAction extends BaseAction {
    @Autowired
    private ISystemBaseService systembaseservice;

    /**
     * 跳转到页面（页面信息在xml里面注释)
     * 需要参数p返回p
     */
    @RequestMapping(params = "reqCode=UserRelactionPageInit")
    public String UserRelactionPageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/systembase/jsp/UserRelactionPage";
    }

    /**
     * 跳转到页面（页面信息在xml里面注释)
     * 需要参数p返回p
     */
    @RequestMapping(params = "reqCode=LeaveUserTaskManagePageInit")
    public String LeaveUserTaskManagePageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/systembase/jsp/LeaveUserTaskManage";
    }

    /**
     * 查询最上级的人员及下级人员
     */
    @RequestMapping(params = "reqCode=queryUserRelationData")
    public String queryUserRelationData(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String nodeid = pDto.getAsString("node");
        // dao
        List list = new ArrayList();
        Integer count = new Integer(0);
        // 转换成json
        String jsonString = "";
        if (nodeid.equals("root")) {
            pDto.put("isroot", "true");
        } else {
            if (G4Utils.isNotEmpty(nodeid)) {
                pDto.put("p_user_id", nodeid);
            }
        }
        if (pDto.containsKey("limit")) {
            list = g4Reader.queryForPage("SysBase.queryUserRelationData", pDto);
            count = (Integer) g4Reader.queryForObject("SysBase.queryUserRelationDataCount", pDto);

        } else {
            list = g4Reader.queryForList("SysBase.queryUserRelationData", pDto);
        }

        if (pDto.containsKey("limit")) {
            // 转换成json
            jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        } else {

            if (G4Utils.isNotEmpty(list)) {
                // 转换成树数据...
                for (int i = 0; i < list.size(); i++) {
                    Dto dto = (Dto) list.get(i);
                    String curnodeid = pDto.getAsString("curnodeid");
                    if (G4Utils.isNotEmpty(curnodeid)) {
                        if (dto.getAsString("user_id").equals(curnodeid)) {
                            dto.put("isselectednode", true);
                        }
                    }
                    dto.put("id", dto.getAsString("user_id"));
                    dto.put("text", dto.getAsString("username"));
                    dto.put("expanded", true);
                    dto.put("leaf", dto.getAsInteger("sub") > 0 ? false : true);
                    dto.put("iconCls", dto.getAsInteger("sub") > 0 ? "group_addIcon" : "userIcon");
                }
            }
            // 转换成json
            jsonString = JsonHelper.encodeObject2Json(list);
        }
        super.write(jsonString, response);

        return "null";
    }

    @RequestMapping(params = "reqCode=saveOrUpdateOrDelUserRelation")
    public String saveOrUpdateOrDelUserRelation(HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {

        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        Integer notifytype = null;
        if (pDto.containsKey("RTX") && pDto.containsKey("PhoneMSG")) {
            notifytype = 2;
        } else if (pDto.containsKey("RTX")) {
            notifytype = 0;
        } else if (pDto.containsKey("PhoneMSG")) {
            notifytype = 1;
        }
        pDto.put("notifytype", notifytype);
        String jsonString = systembaseservice.saveOrUpdateOrDelUserRelation(pDto, user);
        super.write(jsonString, response);
        return null;
    }


    /**
     * 人员关系表内存同步
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=synMemory")
    public String synMemory(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        List userrelactionlist = g4Reader.queryForList("SysBase.synMemory");
        servletContext.removeAttribute("USERRELACTIONLIST");
        servletContext.setAttribute("USERRELACTIONLIST", userrelactionlist);
        setOkTipMsg("内存同步成功", response);
        return null;
    }

    /**
     * 更新离职用户的任务
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveLeaveUserTask")
    public String saveLeaveUserTask(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String jsonString = "";
        //校验该用户是否已离职过
        Integer count = (Integer) g4Reader.queryForObject("SysBase.verifyLeavelUser", pDto);
        if (count > 0) {
            jsonString = new BaseDto("error", "该用户已离职过").toJson();
        } else {
            jsonString = systembaseservice.saveLeaveUserTask(pDto);
        }
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询离职用户历史
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getAllLeaveUsers")
    public String getAllLeaveUsers(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("SysBase.getAllLeaveUsers", pDto);
        Integer count = (Integer) g4Reader.queryForObject("SysBase.getAllLeaveUsersCount", pDto);
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
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
