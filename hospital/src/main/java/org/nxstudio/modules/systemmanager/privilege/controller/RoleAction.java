package org.nxstudio.modules.systemmanager.privilege.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 角色管理与授权
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-04-21
 */
@Controller
@RequestMapping("/role")
public class RoleAction extends BaseAction {
    @Autowired
    private RoleService roleService;
    @Autowired
    private OrganizationService organizationService;


    /**
     * 角色管理与授权页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=roleInit")
    public String roleInit(HttpServletRequest request,
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
        return "/arm/manageRole";
    }

    /**
     * 部门树初始化
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
     * 查询角色列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryRolesForManage")
    public String queryRolesForManage(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String deptid = request.getParameter("deptid");
        if (G4Utils.isNotEmpty(deptid)) {
            super.setSessionAttribute(request, "deptid", deptid);
        }
        if (!G4Utils.isEmpty(request.getParameter("firstload"))) {
            dto.put("deptid", super.getSessionContainer(request).getUserInfo().getDeptid());
        } else {
            dto.put("deptid", super.getSessionAttribute(request, "deptid"));
        }
        dto.put("roletype", ArmConstants.ROLETYPE_ADMIN);
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        if (WebUtils.getParamValue("DEFAULT_ADMIN_ACCOUNT", request).equals(userInfoVo.getAccount())) {
            dto.remove("roletype");
        }
        if (WebUtils.getParamValue("DEFAULT_DEVELOP_ACCOUNT", request).equals(userInfoVo.getAccount())) {
            dto.remove("roletype");
        }
        List roleList = g4Reader.queryForPage("Role.queryRolesForManage", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Role.queryRolesForManageForPageCount", dto);
        String jsonString = JsonHelper.encodeList2PageJson(roleList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 保存角色
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveRoleItem")
    public String saveRoleItem(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        roleService.saveRoleItem(inDto);
        setOkTipMsg("角色新增成功", response);
        return null;
    }

    /**
     * 删除角色
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteRoleItems")
    public String deleteRoleItems(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        roleService.deleteRoleItems(inDto);
        setOkTipMsg("角色删除成功", response);
        return null;
    }

    /**
     * 修改角色
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateRoleItem")
    public String updateRoleItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        roleService.updateRoleItem(inDto);
        setOkTipMsg("角色修改成功", response);
        return null;
    }

    /**
     * 操作权限授权初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=operatorTabInit")
    public String operatorTabInit(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "ROLEID_ROLEACTION");
        String roleid = request.getParameter("roleid");
        super.setSessionAttribute(request, "ROLEID_ROLEACTION", roleid);
        return "arm/grantroletab/operatorTab";
    }

    /**
     * 选择人员初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=selectUserTabInit")
    public String selectUserTabInit(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {

        return "/arm/grantroletab/selectUserTab";
    }

    /**
     * 管理权限授权初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=managerTabInit")
    public String managerTabInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        return "/arm/grantroletab/managerTab";
    }

    /**
     * 保存角色授权信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveGrant")
    public String saveGrant(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        Dto inDto = new BaseDto();
        inDto.put("menuid", request.getParameter("menuid"));
        inDto.put("authorizelevel", request.getParameter("key"));
        inDto.put("roleid", super.getSessionAttribute(request, "ROLEID_ROLEACTION"));
        roleService.saveGrant(inDto);
        String msg = "";
        if (inDto.getAsString("authorizelevel").equals(ArmConstants.AUTHORIZELEVEL_ACCESS))
            msg = "经办权限授权成功";
        if (inDto.getAsString("authorizelevel").equals(ArmConstants.AUTHORIZELEVEL_ADMIN))
            msg = "管理权限授权成功";
        setOkTipMsg(msg, response);
        return null;
    }

    /**
     * 保存角色用户关联信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveUser")
    public String saveUser(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        Dto inDto = new BaseDto();
        inDto.put("userid", request.getParameter("userid"));
        inDto.put("roleid", super.getSessionAttribute(request, "ROLEID_ROLEACTION"));
        roleService.saveSelectUser(inDto);
        setOkTipMsg("您选择的角色人员关联数据保存成功", response);
        return null;
    }

}
