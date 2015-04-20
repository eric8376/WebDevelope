package org.nxstudio.modules.systemmanager.privilege.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 组织机构控制器
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-04-10
 */
@Controller
@RequestMapping("/organization")
public class OrganizationAction extends BaseAction {
    @Autowired
    private OrganizationService organizationService;


    /**
     * 部门管理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=departmentInit")
    public String departmentInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "deptid");
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        return "/arm/manageDepartment";
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
     * 部门管理树初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=departmentTreeManage")
    public String departmentTreeManage(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        dto.put("parentid", nodeid);
        Dto outDto = organizationService.queryDeptItems(dto);
        write(outDto.getAsString("jsonString"), response);
        return null;
    }

    /**
     * 查询部门列表信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryDeptsForManage")
    public String queryDeptsForManage(HttpServletRequest request,
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
        List menuList = g4Reader.queryForPage("Organization.queryDeptsForManage", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Organization.queryDeptsForManageForPageCount", dto);
        String jsonString = encodeList2PageJson(menuList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 获取部门信息
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getDept")
    public String getDept(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List deptList = g4Reader.queryForList("Organization.getDept", dto);
        String jsonString = JsonHelper.encodeObject2Json(deptList);
        write(jsonString, response);
        return null;
    }

    /**
     * 保存部门
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveDeptItem")
    public String saveDeptItem(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        organizationService.saveDeptItem(inDto);
        setOkTipMsg(inDto.containsKey("error") ? inDto.getAsString("error") : "部门数据新增成功", response);
        return null;
    }

    /**
     * 修改部门
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateDeptItem")
    public String updateDeptItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        organizationService.updateDeptItem(inDto);
        setOkTipMsg("部门数据修改成功", response);
        return null;
    }

    /**
     * 删除部门项
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteDeptItems")
    public String deleteDeptItems(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        String type = request.getParameter("type");
        String deptid = request.getParameter("deptid");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        inDto.put("type", type);
        inDto.put("deptid", deptid);
        organizationService.deleteDeptItems(inDto);
        setOkTipMsg("部门数据删除成功", response);
        return null;
    }

    /**
     * 根据用户所属部门编号查询部门对象<br>
     * 用于构造组织机构树的根节点
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryDeptinfoByDeptid")
    public String queryDeptinfoByDeptid(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        String jsonString = JsonHelper.encodeObject2Json(outDto);
        write(jsonString, response);
        return null;
    }

    /**
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryDeptManagerByDeptid")
    public String queryDeptManagerByDeptid(HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        List<Dto> list = g4Reader.queryForList("Organization.queryDeptManagerByDeptId", inDto);
        String jsonString = JsonHelper.encodeObject2Json(list);
        write(jsonString, response);
        return null;
    }

    @RequestMapping(params = "reqCode=saveDeptManager")
    public String saveDeptManager(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        organizationService.saveDeptManager(inDto);
        write("{success:true,data:{msg:'保存成功'}}", response);
        return null;
    }

}
