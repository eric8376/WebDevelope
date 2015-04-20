package org.nxstudio.core.controller;

import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.util.base.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【Ext4主页跳转与处理】
 * 时间: 2013-06-26 11:00
 */
@Controller
@RequestMapping("/Home")
public class HomeAction extends BaseAction {

    /**
     * Ext4主页面跳转
     */
    @RequestMapping(params = "reqCode=execute")
    public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //获取js类全名
        String jsClassPath = (String) request.getParameter("jsClassPath");
        request.setAttribute("jsClassPath", jsClassPath);

        //设置标题
        request.setAttribute("webTitle", "迈微·手卫生检查系统");

        //设置当前登录人
        UserInfoVo userInfoVo = WebUtils.getSessionContainer(request).getUserInfo();
        if (userInfoVo != null) {
            request.setAttribute("loginUserId", userInfoVo.getUserid());
        }

        //web根目录路径
        String contextPath = request.getContextPath();
        request.setAttribute("webContext", contextPath);

        return "/sunShine/jsp/home";
    }
}
