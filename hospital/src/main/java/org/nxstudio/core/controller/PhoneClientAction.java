/*
package org.nxstudio.core.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.listeners.SessionListener;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.service.IPhoneClientService;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.monitor.service.MonitorService;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

*/
/**
 * 登录页面Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-01-13
 *//*

@Controller
@RequestMapping("/PhoneClientAction")
public class PhoneClientAction extends BaseAction {

    private static Log log = LogFactory.getLog(PhoneClientAction.class);




//    */
/**
//     * 回写Cookie
//     *
//     * @param userInfoVo
//     * @param request
//     *//*

//    private void writeCookie2Client(UserInfoVo userInfoVo, HttpServletRequest request) {
//
//    }

    */
/**
     * 不允许在同一客户端上不同帐户同时以同种浏览器登录系统<br>
     * 规避同一客户端同时以不同账户使用同种浏览器登录系统窜账户的情况
     *
     * @return
     *//*

    private Boolean checkMultiUser(UserInfoVo userInfoVo, HttpServletRequest request) {
        boolean allowLogin = true;
        String cookieUserid = WebUtils.getCookieValue(request.getCookies(), "eredg4.login.userid", "");
        String sessionid = request.getSession().getId();
        HttpSession httpSession = SessionListener.getSessionByID(sessionid);
        if (G4Utils.isNotEmpty(httpSession)) {
            //UserInfoVo oldUserInfoVo = WebUtils.getSessionContainer(httpSession).getUserInfo();
            if (!cookieUserid.equals(userInfoVo.getUserid())) {
                allowLogin = false;
            }
        }
        return new Boolean(allowLogin);
    }

    */
/**
     * 退出登录
     *
     * @param
     * @return
     *//*

    @RequestMapping(params = "reqCode=logout")
    public String logout(HttpServletRequest request,
                         HttpServletResponse response) throws java.lang.Exception {
        UserInfoVo userInfo = super.getSessionContainer(request).getUserInfo();
        if (G4Utils.isNotEmpty(userInfo)) {
            if (g4PHelper.getValue("requestMonitor", "0").equals("1")) {
                saveLogoutEvent(userInfo, request);
            }
            log.info(userInfo.getUsername() + "退出了系统!");
            super.getSessionContainer(request).setUserInfo(null);
        }
        if (G4Utils.isNotEmpty(request.getSession())) {
            request.getSession().invalidate();
        }
        return "login";
    }

    */
/**
     * 保存登录事件
     *
     * @param userInfo
     *//*

    private void saveLoginEvent(UserInfoVo userInfo, HttpServletRequest request) {
        Dto dto = new BaseDto();
        dto.put("account", userInfo.getAccount());
        dto.put("activetime", G4Utils.getCurrentTimeAsNumber());
        dto.put("userid", userInfo.getUserid());
        dto.put("username", userInfo.getUsername());
        dto.put("description", "登录系统");
        dto.put("requestpath", request.getRequestURI());
        dto.put("methodname", request.getParameter("reqCode"));
        dto.put("eventid", IDHelper.getEventID());
        monitorService.saveEvent(dto);
    }

    */
/**
     * 保存退出事件
     *
     * @param userInfo
     *//*

    private void saveLogoutEvent(UserInfoVo userInfo, HttpServletRequest request) {
        Dto dto = new BaseDto();
        dto.put("account", userInfo.getAccount());
        dto.put("activetime", G4Utils.getCurrentTimeAsNumber());
        dto.put("userid", userInfo.getUserid());
        dto.put("username", userInfo.getUsername());
        dto.put("description", "退出系统");
        dto.put("requestpath", request.getRequestURI());
        dto.put("methodname", request.getParameter("reqCode"));
        dto.put("eventid", IDHelper.getEventID());
        monitorService.saveEvent(dto);
    }

    */
/**
     * 登陆身份验证
     *
     * @param
     * @return
     *//*


    @RequestMapping(params = "reqCode=queryCheckRecord")
    public String queryCheckRecord(HttpServletRequest request,
                                   HttpServletResponse response) throws IOException, SQLException {
        CommonActionForm aForm = new CommonActionForm();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        Dto pDto = aForm.getParamAsDto(request);
        boolean jsonP = false;
        String cb = request.getParameter("callback");
        if (cb != null) {
            jsonP = true;
            response.setContentType("text/javascript");
        } else {
            response.setContentType("application/x-json");
        }
        String begin_rusult = "";
        String end_rusult = "";
        if (jsonP) {
            begin_rusult = cb + "(";
            end_rusult = ");";
        }

        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        String jsonString = phoneClientService.queryCheckRecord(pDto);
        write(begin_rusult + jsonString + end_rusult, response);
        return "";
    }


}
*/
