package org.nxstudio.modules.demo.panel.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 常用UI组件标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-30
 */
@Controller
@RequestMapping("/commonUiDemo")
public class CommonUiAction extends BaseAction {

    /**
     * 面板页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=panelDemo1Init")
    public String panelDemo1Init(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/commonui/panelDemo1";
    }

    /**
     * 窗口页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=windowDemo1Init")
    public String windowDemo1Init(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        return "/demo/commonui/windowDemo1";
    }

    /**
     * TabPanel标签卡页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=tabPanelDemo1Init")
    public String tabPanelDemo1Init(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        return "/demo/commonui/tabPanelDemo1";
    }

    /**
     * ViewPort布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=viewportLayoutInit")
    public String viewportLayoutInit(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {

        return "/demo/commonui/viewportLayout";
    }

    /**
     * ViewPort嵌套复杂布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=viewportComplexLayoutInit")
    public String viewportComplexLayoutInit(HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        return "/demo/commonui/viewportComplexLayout";
    }
}
