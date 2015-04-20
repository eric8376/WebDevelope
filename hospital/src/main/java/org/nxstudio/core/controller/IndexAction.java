package org.nxstudio.core.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.UserService;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.plugin.report.fcf.FcfDataMapper;
import org.nxstudio.plugin.report.fcf.GraphConfig;
import org.nxstudio.plugin.report.fcf.Set;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 首页Action
 *
 * @author XiongChun
 * @see BaseAction
 * @since 2010-01-13
 */
@Controller
@RequestMapping("/index")
public class IndexAction extends BaseAction {


    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private UserService userService;


    /**
     * 首页初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=indexInit")
    public String indexInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
//        System.err.println(G4Utils.decryptBasedDes("nkNkviNCuV8Mba0K881Jmg=="));
        request.setAttribute("sysTitle", getParamValue("SYS_TITLE", request));
        request.setAttribute("westTitle", getParamValue("WEST_NAVIGATE_TITLE", request));
        return "index";
    }


    /**
     * 欢迎页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=preferencesInit")
    public String preferencesInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "arm/welcome";
    }

    /**
     * 保存用户自定义主题
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveUserTheme")
    public String saveUserTheme(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        String theme = request.getParameter("theme");
        dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
        dto.put("theme", theme);
        Dto outDto = organizationService.saveUserTheme(dto);
        String jsonString = JsonHelper.encodeObject2Json(outDto);
        write(jsonString, response);
        return null;
    }

    /**
     * 加载当前登录用户信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=loadUserInfo")
    public String loadUserInfo(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        Dto inDto = new BaseDto();
        G4Utils.copyPropFromBean2Dto(userInfoVo, inDto);
        Dto outDto = (BaseDto) g4Reader.queryForObject("User.getUserInfoByKey", inDto);
        outDto.remove("password");
        String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 修改当前登录用户信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateUserInfo")
    public String updateUserInfo(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        //UserService dao = (UserService)getService("userService");
        Dto indDto = cForm.getParamAsDto(request);
        Dto outDto = new BaseDto(G4Constants.TRUE);
        outDto.put("flag", G4Constants.SUCCESS);
        String password = G4Utils.encryptBasedDes(indDto.getAsString("password2"));
        if (password.equals(userInfoVo.getPassword())) {
            userService.updateUserItem4IndexPage(indDto);
            outDto.put("flag", G4Constants.SUCCESS);
            userInfoVo.setPassword(G4Utils.encryptBasedDes(indDto.getAsString("password1")));
            getSessionContainer(request).setUserInfo(userInfoVo);
        } else {
            outDto.setSuccess(G4Constants.FALSE);
            outDto.put("flag", G4Constants.FAILURE);
        }
        write(outDto.toJson(), response);
        return null;
    }

    /**
     * 解锁系统
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=unlockSystem")
    public String unlockSystem(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        Dto indDto = cForm.getParamAsDto(request);
        String password = G4Utils.encryptBasedDes(indDto.getAsString("password"));
        Dto outDto = new BaseDto(G4Constants.TRUE);
        if (password.equals(userInfoVo.getPassword())) {
            outDto.put("flag", G4Constants.SUCCESS);
        } else {
            outDto.put("flag", G4Constants.FAILURE);
        }
        write(outDto.toJson(), response);
        return null;
    }


}
