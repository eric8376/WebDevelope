package org.nxstudio.modules.systemmanager.base.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.base.service.ResourceService;
import org.nxstudio.core.constant.ArmConstants;
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
import java.util.List;

/**
 * 资源模型
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-01-31
 */
@Controller
@RequestMapping("/resource")
public class ResourceAction extends BaseAction {
    @Autowired
    private ResourceService resourceService;

    /**
     * 菜单资源管理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=menuResourceInit")
    public String menuResourceInit(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "menuid");
        Dto dto = (Dto) g4Reader.queryForObject("Resource.queryEamenuByMenuID", "01");
        request.setAttribute("rootMenuName", dto.getAsString("menuname"));
        return "arm/manageMenuResource";
    }

    /**
     * 查询菜单项目 生成菜单树
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryMenuItems")
    public String queryMenuItems(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        dto.put("parentid", nodeid);
        List menuList = g4Reader.queryForList("Resource.queryMenuItemsByDto", dto);
        Dto menuDto = new BaseDto();
        for (int i = 0; i < menuList.size(); i++) {
            menuDto = (BaseDto) menuList.get(i);
            if (menuDto.getAsString("leaf").equals(ArmConstants.LEAF_Y))
                menuDto.put("leaf", new Boolean(true));
            else
                menuDto.put("leaf", new Boolean(false));
            if (menuDto.getAsString("id").length() == 4)
                // ID长度为4的节点自动展开
                menuDto.put("expanded", new Boolean(true));
        }
        write(JsonHelper.encodeObject2Json(menuList), response);
        return null;
    }

    /**
     * 查询菜单项目 - 菜单管理
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryMenuItemsForManage")
    public String queryMenuItemsForManage(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String menuid = request.getParameter("menuid");
        if (G4Utils.isNotEmpty(menuid)) {
            super.setSessionAttribute(request, "menuid", menuid);
        }
        dto.put("menuid", super.getSessionAttribute(request, "menuid"));
        List menuList = g4Reader.queryForPage("Resource.queryMenuItemsForManage", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Resource.queryMenuItemsForManageForPageCount", dto);
        String jsonString = JsonHelper.encodeList2PageJson(menuList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 保存菜单
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveMenuItem")
    public String saveMenuItem(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        resourceService.saveMenuItem(inDto);

        setOkTipMsg("菜单数据新增成功", response);
        return null;
    }

    /**
     * 修改菜单
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateMenuItem")
    public String updateMenuItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        resourceService.updateMenuItem(inDto);
        setOkTipMsg("菜单数据修改成功", response);
        return null;
    }

    /**
     * 删除菜单项
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteMenuItems")
    public String deleteMenuItems(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        String type = request.getParameter("type");
        String menuid = request.getParameter("menuid");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        inDto.put("type", type);
        inDto.put("menuid", menuid);
        resourceService.deleteMenuItems(inDto);
        setOkTipMsg("菜单数据删除成功", response);
        return null;
    }

    /**
     * 代码表管理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=codeTableInit")
    public String codeTableInit(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "arm/manageCodeTable";
    }

    /**
     * 查询代码表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryCodeItems")
    public String queryCodeItems(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        List codeList = g4Reader.queryForPage("Resource.getCodeListForPage", inDto);
        Integer totalCount = (Integer) g4Reader.queryForObject("Resource.getCodeListForPageCount", inDto);
        String jsonStrList = JsonHelper.encodeList2PageJson(codeList, totalCount, null);
        write(jsonStrList, response);
        return null;
    }

    /**
     * 保存代码表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveCodeItem")
    public String saveCodeItem(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        Dto outDto = resourceService.saveCodeItem(inDto);
        String jsonString = JsonHelper.encodeObject2Json(outDto);
        write(jsonString, response);
        return null;
    }

    /**
     * 删除代码表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteCodeItem")
    public String deleteCodeItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        resourceService.deleteCodeItem(inDto);
        setOkTipMsg("字典数据删除成功", response);
        return null;
    }

    /**
     * 修改代码表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateCodeItem")
    public String updateCodeItem(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        resourceService.updateCodeItem(inDto);
        setOkTipMsg("字典数据修改成功", response);
        return null;
    }

    /**
     * 字典内存同步
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=synMemory")
    public String synMemory(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        List codeList = g4Reader.queryForList("Resource.getCodeViewList");
        servletContext.removeAttribute("EACODELIST");
        servletContext.setAttribute("EACODELIST", codeList);
        setOkTipMsg("内存同步成功", response);
        return null;
    }

    /**
     * 系统图标页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=iconInit")
    public String iconInit(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        return "arm/manageIcon";
    }

    /**
     * 查询系统图标
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryIconItems")
    public String queryIconItems(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        List iconList = g4Reader.queryForPage("Resource.queryIconsForManage", inDto);
        String subPath = "./resource/image/ext/";
        for (int i = 0; i < iconList.size(); i++) {
            Dto dto = (BaseDto) iconList.get(i);
            dto.put("accesspath", subPath + dto.getAsString("filename"));
            dto.put("previewpath", subPath + dto.getAsString("filename"));
        }
        Integer pageCount = (Integer) g4Reader.queryForObject("Resource.queryIconsForManageForPageCount", inDto);
        String jsonString = JsonHelper.encodeList2PageJson(iconList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 调色板页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=colorPaletteInit")
    public String colorPaletteInit(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        return "arm/colorPalette";
    }
}
