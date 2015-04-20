package org.nxstudio.modules.systemmanager.privilege.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.PartService;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * UI组件人员授权
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2011-06-03
 */
@Controller
@RequestMapping("/userPart")
public class UserPartAction extends BaseAction {

    @Autowired
    private PartService partService;
    @Autowired
    private OrganizationService organizationService;

    /**
     * 页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=init")
    public String init(HttpServletRequest request,
                       HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "deptid");
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        Dto dto = (Dto) g4Reader.queryForObject("Resource.queryEamenuByMenuID", "01");
        request.setAttribute("rootMenuName", dto.getAsString("menuname"));
        return "/arm/userPart";
    }

    /**
     * 页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=departmentInit")
    public String departmentInit(HttpServletRequest request,
                                 HttpServletResponse response) {
        super.removeSessionAttribute(request, "deptid");
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        Dto dto = (Dto) g4Reader.queryForObject("Resource.queryEamenuByMenuID", "01");
        request.setAttribute("rootMenuName", dto.getAsString("menuname"));
        return "/arm/userPart";
    }

    /**
     * 部门管理树初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=departmentTreeInit")
    public void departmentTreeInit(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        dto.put("parentid", nodeid);
        Dto outDto = organizationService.queryDeptItems(dto);
        write(outDto.getAsString("jsonString"), response);
    }

    /**
     * 查询UI组件列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryParts")
    public void queryParts(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        CommonActionForm cForm = new CommonActionForm();
        Dto dto = cForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("Part.queryParts", dto);
        Integer countInteger = (Integer) g4Reader.queryForObject("Part.queryPartsForPageCount", dto);
        for (int i = 0; i < list.size(); i++) {
            Dto partDto = (BaseDto) list.get(i);
            dto.put("partid", partDto.getAsString("partid"));
            Dto outDto = (BaseDto) g4Reader.queryForObject("Part.queryPart4UserGrant", dto);
            if (G4Utils.isEmpty(outDto)) {
                partDto.put("partauthtype", ArmConstants.PARTAUTHTYPE_NOGRANT);
            } else {
                partDto.putAll(outDto);
            }
        }
        String jsonString = encodeList2PageJson(list, countInteger, null);
        write(jsonString, response);
    }

    /**
     * 保存UI人员授权数据
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=savePartUserGrantDatas")
    public void savePartUserGrantDatas(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm cForm = new CommonActionForm();
        List list = cForm.getGridDirtyData(request);
        Dto inDto = new BaseDto();
        inDto.setDefaultAList(list);
        partService.savePartUserGrantDatas(inDto);
        setOkTipMsg("授权数据保存成功", response);
    }
}
