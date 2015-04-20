package org.nxstudio.modules.systemmanager.privilege.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
import org.nxstudio.modules.systemmanager.privilege.service.UserService;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 用户管理与授权
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-04-21
 */
@Controller
@RequestMapping("/user")
public class UserAction extends BaseAction {
    @Autowired
    private UserService userService;

    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private RoleService roleService;

    /**
     * 用户管理与授权页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=userInit")
    public String userInit(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "deptid");
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        request.setAttribute("login_account", userInfoVo.getAccount());
        return "/arm/manageUser";
    }

    /**
     * 部门管理树初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=departmentTreeInit")
    public String departmentTreeInit(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        dto.put("parentid", nodeid);
        Dto outDto = organizationService.queryDeptItems(dto);
        write(outDto.getAsString("jsonString"), response);
        return null;
    }

    /**
     * 查询用户列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryUsersForManage")
    public String queryUsersForManage(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String deptid = request.getParameter("deptid");
        if (G4Utils.isNotEmpty(deptid)) {
            setSessionAttribute(request, "deptid", deptid);
        }
        if (!G4Utils.isEmpty(request.getParameter("firstload"))) {
            dto.put("deptid", super.getSessionContainer(request).getUserInfo().getDeptid());
        } else {
            dto.put("deptid", super.getSessionAttribute(request, "deptid"));
        }
        dto.put("usertype", ArmConstants.USERTYPE_ADMIN);
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        if (WebUtils.getParamValue("DEFAULT_ADMIN_ACCOUNT", request).equals(userInfoVo.getAccount())) {
            dto.remove("usertype");
        }
        if (WebUtils.getParamValue("DEFAULT_DEVELOP_ACCOUNT", request).equals(userInfoVo.getAccount())) {
            dto.remove("usertype");
        }
        List userList = g4Reader.queryForPage("User.queryUsersForManage", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("User.queryUsersForManageForPageCount", dto);
        String jsonString = JsonHelper.encodeList2PageJson(userList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 查询用户列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryUsers")
    public String queryUsers(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        dto.put("usertype", ArmConstants.USERTYPE_ADMIN);
        if (dto.containsKey("notShowSelf")) {
            UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
            dto.put("ex_userid", userInfoVo.getUserid());
        }
        List userList = g4Reader.queryForPage("User.queryUsers", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("User.queryUsersForPageCount", dto);
        String jsonString = JsonHelper.encodeList2PageJson(userList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 保存用户
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveUserItem")
    public String saveUserItem(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        if (inDto.getAsString("empower").equals("on")) {
            List<Dto> role = roleService.queryEaroleBySql(new BaseDto("rolename", "手卫记录员"));
            if (G4Utils.isNotEmpty(role) && role.size() == 1) {
                inDto.put("roleid", role.get(0).getAsString("roleid"));
            } else {
                inDto.put("error", "手卫记录员角色不存在");
                inDto.put("msg", "手卫记录员角色不存在");
                inDto.put("success", new Boolean(false));
                inDto.put("contextPath", request.getContextPath());
                String jsonString = JsonHelper.encodeObject2Json(inDto);
                write(jsonString, response);
                return null;
            }
        }
        Dto outDto = userService.saveUserItem(inDto);
        outDto.put("contextPath", request.getContextPath());
        String jsonString = JsonHelper.encodeObject2Json(outDto);
        write(jsonString, response);
        return null;
    }

    /**
     * 删除用户
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteUserItems")
    public String deleteUserItems(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        String result = userService.deleteUserItems(inDto);
        setOkTipMsg(result, response);
        return null;
    }

    /**
     * 修改用户
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateUserItem")
    public String updateUserItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        List<Dto> role = roleService.queryEaroleBySql(new BaseDto("rolename", "手卫记录员"));
        if (G4Utils.isNotEmpty(role) && role.size() == 1) {
            inDto.put("roleid", role.get(0).getAsString("roleid"));
        } else {
            inDto.put("error", "手卫记录员角色不存在");
            inDto.put("msg", "手卫记录员角色不存在");
            inDto.put("success", new Boolean(false));
            inDto.put("contextPath", request.getContextPath());
            String jsonString = JsonHelper.encodeObject2Json(inDto);
            write(jsonString, response);
            return null;
        }
        Dto result = userService.updateUserItem(inDto);
        setOkTipMsg(result.getAsString("success"), response);
        return null;
    }

    /**
     * 用户授权页面初始化:选择角色
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=userGrantInit")
    public String userGrantInit(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "USERID_USERACTION");
        String userid = request.getParameter("userid");
        super.setSessionAttribute(request, "USERID_USERACTION", userid);
        return "/arm/selectRoleTree";
    }

    /**
     * 用户授权页面初始化:选择菜单
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=selectMenuInit")
    public String selectMenuInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/arm/selectMenuTree";
    }

    /**
     * 保存用户角色关联信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveSelectedRole")
    public String saveSelectedRole(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Dto inDto = new BaseDto();
        inDto.put("roleid", request.getParameter("roleid"));
        inDto.put("userid", super.getSessionAttribute(request, "USERID_USERACTION"));
        userService.saveSelectedRole(inDto);
        setOkTipMsg("您选择的人员角色关联数据保存成功", response);
        return null;
    }

    /**
     * 保存用户菜单关联信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveSelectedMenu")
    public String saveSelectedMenu(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Dto inDto = new BaseDto();
        inDto.put("menuid", request.getParameter("menuid"));
        inDto.put("userid", super.getSessionAttribute(request, "USERID_USERACTION"));
        userService.saveSelectedMenu(inDto);
        setOkTipMsg("您选择的人员菜单关联数据保存成功", response);
        return null;
    }

    /**
     * 用户账户重复性检测
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=checkAccount")
    public String checkAccount(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        Integer count = userService.checkAccount(dto);
        String jsonString = new BaseDto("count", count).toJson();
        write(jsonString, response);
        return null;
    }
}
