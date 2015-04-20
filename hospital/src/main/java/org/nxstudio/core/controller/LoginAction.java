package org.nxstudio.core.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.cxf.common.i18n.Exception;
import org.nxstudio.core.listeners.SessionListener;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemassist.service.impl.SysMailInService;
import org.nxstudio.modules.systemmanager.monitor.service.MonitorService;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.util.RandomNumUtil;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 登录页面Action
 *
 * @author XiongChun
 * @see BaseAction
 * @since 2010-01-13
 */
@Controller
@RequestMapping("/login")
public class LoginAction extends BaseAction {

    private static Log log = LogFactory.getLog(LoginAction.class);
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private MonitorService monitorService;


    /**
     * 登陆页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=init")
    public String init(HttpServletRequest request,
                       HttpServletResponse response) throws java.lang.Exception {
//        File file=new File("C:\\Users\\Administrator\\Desktop\\MyProcess.bpmn");
//        FileInputStream fis=new FileInputStream(file);
//        repositoryService.createDeployment().addInputStream("mypors.bpmn20.xml",fis).deploy();

        //Dto dto = XmlHelper.parseXml2DtoBasedNode("<root><groupNo>456</groupNo><verList type=\"list\"><item type=\"map\"><oldVer>350581199007193033</oldVer><newVer>3505811990071930334</newVer><verType>TI00103</verType></item></verList></root>");

        String bannerPath = getParamValue("LOGIN_WINDOW_BANNER", request);
        bannerPath = request.getContextPath() + bannerPath;
        request.setAttribute("bannerPath", bannerPath);
        request.setAttribute("sysTitle", getParamValue("SYS_TITLE", request));

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        String xml = "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>\n" +
                "<msg>\n" +
                "  <comm_head>\n" +
                "    <ver_no>1.0</ver_no>\n" +
                "    <snd_chnl_no>1</snd_chnl_no>\n" +
                "    <chnl_dt>20140815</chnl_dt>\n" +
                "    <chnl_tm>102847</chnl_tm>\n" +
                "    <chnl_seq>" + simpleDateFormat.format(new Date()) + "</chnl_seq>\n" +
                "    <busicode>UV000001</busicode>\n" +
                "  </comm_head>\n" +
                "  <main_data>\n" +
                "    <order_no>5396</order_no>\n" +
                "    <group_no>123TtT456</group_no>\n" +
                "    <verify>\n" +
                "      <verify_type>TI00104</verify_type>\n" +
                "      <original_verify_value></original_verify_value>\n" +
                "      <new_verify_value>12345678910</new_verify_value>\n" +
                "    </verify>\n" +
                "  </main_data>\n" +
                "</msg>";
//        OrderInfoVo orderInfoVo = new OrderInfoVo();
//       String str= XMLUtil.BeanToXMLString(orderInfoVo,"UTF-8");
//       List<OrderTicketInfoData> list=new ArrayList<OrderTicketInfoData>();
//        OrderTicketInfoData orderTicketInfoData=new OrderTicketInfoData();
//        orderTicketInfoData.setProduct_no("asass");
//        list.add(orderTicketInfoData);
//        orderInfoVo.getMaindata().setOrderticketinfodata(list);
//          TicketModifyVo ticketModifyVo = XMLUtil.XMLStringToBean(TicketModifyVo.class, xml);
//        DataPacket dataPacket = messageRuntime.run(ticketModifyVo);
//        ibmMqMessageRead.Follow(dataPacket,dataPacket);


        return "login";
    }

    /**
     * 登陆身份验证
     *
     * @param
     * @return
     */

    @RequestMapping(params = "reqCode=login")
    public String login(HttpServletRequest request,
                        HttpServletResponse response) throws IOException {
        Dto jsonDto = new BaseDto();
        String account = request.getParameter("account");
        String password = request.getParameter("password");
        password = G4Utils.encryptBasedDes(password);
        log.info("帐户[" + account + "]正尝试登陆系统...");
        Dto dto = new BaseDto();
        dto.put("account", account);
        Dto outDto = organizationService.getUserInfo(dto);
        UserInfoVo userInfo = (UserInfoVo) outDto.get("userInfo");

        if (G4Utils.isEmpty(userInfo)) {
            jsonDto.put("success", new Boolean(false));
            jsonDto.put("msg", "帐号输入错误,请重新输入!");
            jsonDto.put("errorType", "1");
            log.warn("帐户[" + account + "]登陆失败.(失败原因：不存在此帐户)");
            write(jsonDto.toJson(), response);
            return "";
        }
        if (!password.equals(userInfo.getPassword())) {
            jsonDto.put("success", new Boolean(false));
            jsonDto.put("msg", "密码输入错误,请重新输入!");
            jsonDto.put("errorType", "2");
            log.warn(userInfo.getUsername() + "[" + userInfo.getAccount() + "]" + "登录系统失败(失败原因：密码输入错误)");
            write(jsonDto.toJson(), response);
            return "";
        }
        String multiSession = WebUtils.getParamValue("MULTI_SESSION", request);
        if ("0".equals(multiSession)) {
            Integer sessions = (Integer) g4Reader.queryForObject("Organization.countHttpSessions", account);
            if (sessions.intValue() > 0) {
                jsonDto.put("success", new Boolean(false));
                jsonDto.put("msg", "此用户已经登录,系统不允许建立多个会话连接!");
                jsonDto.put("errorType", "3");
                log.warn(userInfo.getUsername() + "[" + userInfo.getAccount() + "]"
                        + "登录系统失败(失败原因：此用户已经登录,系统参数配置为不允许一个用户建立多个连接)");
                write(jsonDto.toJson(), response);
                return "";
            }
        }
        userInfo.setSessionID(request.getSession().getId());
        userInfo.setSessionCreatedTime(G4Utils.getCurrentTime());
        userInfo.setLoginIP(request.getRemoteAddr());
        userInfo.setExplorer(G4Utils.getClientExplorerType(request));
        if (!checkMultiUser(userInfo, request)) {
            jsonDto.put("success", new Boolean(false));
            jsonDto.put("msg", "不允许在同一客户端上同时以不同帐户登录系统,请先退出你已经登录的帐户后再尝试登录!");
            jsonDto.put("errorType", "1");
            log.warn("帐户[" + account + "]登陆失败.(失败原因：不允许在同一客户端上同时以不同帐户登录系统.请先退出你已经登录的帐户后再尝试登录)");
            write(jsonDto.toJson(), response);
            return "";
        }
        super.getSessionContainer(request).setUserInfo(userInfo);
        log.info(userInfo.getUsername() + "[" + userInfo.getAccount() + "]" + "成功登录系统!创建了一个有效Session连接,会话ID:["
                + request.getSession().getId() + "]" + G4Utils.getCurrentTime());
        SessionListener.addSession(request.getSession(), userInfo); // 保存有效Session
        if (g4PHelper.getValue("requestMonitor", "0").equals("1")) {
            saveLoginEvent(userInfo, request);
        }
        jsonDto.put("success", new Boolean(true));
        jsonDto.put("userid", userInfo.getUserid());
        write(jsonDto.toJson(), response);
        return "";
    }

//    /**
//     * 回写Cookie
//     *
//     * @param userInfoVo
//     * @param request
//     */
//    private void writeCookie2Client(UserInfoVo userInfoVo, HttpServletRequest request) {
//
//    }

    /**
     * 不允许在同一客户端上不同帐户同时以同种浏览器登录系统<br>
     * 规避同一客户端同时以不同账户使用同种浏览器登录系统窜账户的情况
     *
     * @return
     */
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

    /**
     * 退出登录
     *
     * @param
     * @return
     */
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
        init(request, response);
        return "login";
    }

    /**
     * 保存登录事件
     *
     * @param userInfo
     */
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

    /**
     * 保存退出事件
     *
     * @param userInfo
     */
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


}
