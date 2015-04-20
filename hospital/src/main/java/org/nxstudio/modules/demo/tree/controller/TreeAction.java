package org.nxstudio.modules.demo.tree.controller;

import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 树标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-27
 */
@Controller
@RequestMapping("/treeDemo")
public class TreeAction extends BaseAction {
    @Autowired
    private OrganizationService organizationService;
//    = (OrganizationService) super.getService("organizationService");

    /**
     * 树演示一页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo1Init")
    public String treeDemo1Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo1";
    }

    /**
     * 树演示二页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo2Init")
    public String treeDemo2Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo2";
    }

    /**
     * 树演示三页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo3Init")
    public String treeDemo3Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo3";
    }

    /**
     * 树演示四页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo4Init")
    public String treeDemo4Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo4";
    }

    /**
     * 树演示五页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo5Init")
    public String treeDemo5Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo5";
    }

    /**
     * 树演示六页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo6Init")
    public String treeDemo6Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo6";
    }

    /**
     * 树演示七页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo7Init")
    public String treeDemo7Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo7";
    }

    /**
     * 树演示八页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=treeDemo8Init")
    public String treeDemo8Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/tree/treeDemo8";
    }

    /**
     * 查询行政区域
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryAreas")
    public String queryAreas(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = new BaseDto();
        String areacode = aForm.getTreeNodeUID4Clicked(request);
        dto.put("areacode", areacode);
        dto.put("length", areacode.length() + 2);
        List list = null;
        if (areacode.equals("00")) {
            list = g4Reader.queryForList("Demo.queryAreas4Tree4FirstLevel", dto);
        } else {
            list = g4Reader.queryForList("Demo.queryAreas4Tree", dto);
        }
        for (int i = 0; i < list.size(); i++) {
            Dto node = (BaseDto) list.get(i);
            if (node.getAsString("id").length() == 6) {
                node.put("leaf", new Boolean(true));
            } else {
                node.put("leaf", new Boolean(false));
            }
        }
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询行政区域(复选树)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryAreas4CheckTree")
    public String queryAreas4CheckTree(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = new BaseDto();
        String areacode = aForm.getTreeNodeUID4Clicked(request);
        dto.put("areacode", areacode);
        dto.put("length", areacode.length() + 2);
        List list = null;
        if (areacode.equals("00")) {
            list = g4Reader.queryForList("Demo.queryAreas4Tree4FirstLevel", dto);
        } else {
            list = g4Reader.queryForList("Demo.queryAreas4Tree", dto);
        }
        for (int i = 0; i < list.size(); i++) {
            Dto node = (BaseDto) list.get(i);
            node.put("checked", new Boolean(false));
            if (node.getAsString("id").length() == 6) {
                node.put("leaf", new Boolean(true));
            } else {
                node.put("leaf", new Boolean(false));
            }
        }
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询行政区域(复选树)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryAreas4CheckTree2")
    public String queryAreas4CheckTree2(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = new BaseDto();
        String areacode = aForm.getTreeNodeUID4Clicked(request);
        dto.put("areacode", areacode);
        dto.put("length", areacode.length() + 2);
        List list = null;
        if (areacode.equals("00")) {
            list = g4Reader.queryForList("Demo.queryAreas4Tree4FirstLevel", dto);
        } else {
            list = g4Reader.queryForList("Demo.queryAreas4Tree", dto);
        }
        for (int i = 0; i < list.size(); i++) {
            Dto node = (BaseDto) list.get(i);
            node.put("checked", new Boolean(false));
            if (node.getAsString("id").length() == 4) {
                node.put("leaf", new Boolean(true));
            } else {
                node.put("leaf", new Boolean(false));
            }
        }
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询部门列表(表格树数据)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=departmentTreeInit")
    public String departmentTreeInit(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        dto.put("parentid", nodeid);
        List deptList = g4Reader.queryForList("Demo.queryDeptItemsByDto4TreeGridDemo", dto);
        Dto deptDto = new BaseDto();
        for (int i = 0; i < deptList.size(); i++) {
            deptDto = (BaseDto) deptList.get(i);
            if (deptDto.getAsString("leaf").equals(ArmConstants.LEAF_Y))
                deptDto.put("leaf", new Boolean(true));
            else
                deptDto.put("leaf", new Boolean(false));
            if (deptDto.getAsString("id").length() == 6)
                deptDto.put("expanded", new Boolean(true));
        }
        String jsonString = JsonHelper.encodeObject2Json(deptList);
        super.write(jsonString, response);
        return null;
    }

    @RequestMapping(params = "reqCode=queryMenuItems")
    public String queryMenuItems(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String nodeid = request.getParameter("node");
        boolean showCheck = Boolean.valueOf(request.getParameter("showCheck"));
        boolean checkParent = Boolean.valueOf(request.getParameter("checkParent"));

        dto.put("parentid", nodeid);
        List menuList = g4Reader.queryForList("Resource.queryMenuItemsByDto", dto);
        Dto menuDto = new BaseDto();
        for (int i = 0; i < menuList.size(); i++) {
            menuDto = (BaseDto) menuList.get(i);
            if (checkParent) {
                menuDto.put("checked", new Boolean(false));
            }
            if (menuDto.getAsString("leaf").equals(ArmConstants.LEAF_Y)) {
                menuDto.put("leaf", new Boolean(true));
                if (showCheck && !checkParent) {
                    menuDto.put("checked", new Boolean(false));
                }
            } else {
                menuDto.put("leaf", new Boolean(false));
            }
            if (menuDto.getAsString("id").length() == 4)
                // ID长度为4的节点自动展开
                menuDto.put("expanded", new Boolean(true));
        }
        write(JsonHelper.encodeObject2Json(menuList), response);
        return null;
    }

}
