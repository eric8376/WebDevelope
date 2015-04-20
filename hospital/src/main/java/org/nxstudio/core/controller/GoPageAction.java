package org.nxstudio.core.controller;

import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【专门用于页面跳转】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/GoPageAction")
public class GoPageAction extends BaseAction {

    /**
     * 跳转到页面（页面信息在xml里面注释)
     * 需要参数p返回p
     */
    @RequestMapping(params = "reqCode=go")
    public String go(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        String page_id = (String) request.getParameter("id");
        return page_id;
    }

    @RequestMapping(params = "reqCode=email")
    public String email(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        UserInfoVo userinfovo = super.getSessionContainer(request)
                .getUserInfo();
        Dto dto = new BaseDto();
        dto.put("account", userinfovo.getAccount().toLowerCase());
        dto.put("password", G4Utils.decryptBasedDes(userinfovo.getPassword()));
        String str = JsonHelper.encodeObject2Json(dto);
        super.write(str, response);
        return null;
    }


}
