package org.nxstudio.core.tag.html;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.service.ArmTagSupportService;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.FileTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.constant.TagConstant;
import org.nxstudio.core.tag.util.TagHelper;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.spring.SpringContextHolder;

/**
 * HTML标签
 *
 * @author XiongChun
 * @since 2010-01-30
 */
public class HtmlTag extends TagSupport {

    ArmTagSupportService armTagSupportService = SpringContextHolder.getBean("armTagSupportService");

    //private ArmTagSupportService armTagSupportService = (ArmTagSupportService)SpringContextHolder.getBean("armTagSupportService");

    private static Log log = LogFactory.getLog(HtmlTag.class);
    private String extDisabled;
    private String title;
    private String jqueryEnabled;
    private String showLoading;
    private String uxEnabled = "true";
    private String fcfEnabled = "false";
    private String doctypeEnable = "false";  //带有时分秒选择的控件的页面需要设置为:true
    private String exportParams = "false";
    private String exportUserinfo = "false";
    private String isSubPage = "true";
    private String urlSecurity2 = "true";
    private String exportExceptionWindow = "false";

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        UserInfoVo userInfo = WebUtils.getSessionContainer(request).getUserInfo();
        String contextPath = request.getContextPath();
        request.setAttribute("webContext", contextPath);
        Dto dto = new BaseDto();
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.G4);
        String micolor = pHelper.getValue("micolor", "blue");
        dto.put("micolor", micolor);
        String urlSecurity = pHelper.getValue("urlSecurity", "1");
        //则直接访问JSP页面会出现非法请求提示被重定向到登录页面，如果为0则不检查JSP页面。Action请求只对匹配.ered的请求进行安全验证的处理。
        dto.put("urlSecurity", urlSecurity);
        dto.put("urlSecurity2", urlSecurity2);
        dto.put("userInfo", userInfo);
        dto.put("ajaxErrCode", G4Constants.Ajax_Timeout);
        dto.put("requestURL", request.getRequestURL());
        dto.put("contextPath", contextPath);
        dto.put("doctypeEnable", doctypeEnable);
        dto.put("extDisabled", G4Utils.isEmpty(extDisabled) ? "false" : extDisabled);
        dto.put("title", G4Utils.isEmpty(title) ? "eRedG4" : title);
        dto.put("jqueryEnabled", G4Utils.isEmpty(jqueryEnabled) ? "false" : jqueryEnabled);
        dto.put("showLoading", G4Utils.isEmpty(showLoading) ? "true" : showLoading);
        dto.put("uxEnabled", uxEnabled);
        dto.put("exportExceptionWindow", exportExceptionWindow);
        dto.put("fcfEnabled", fcfEnabled);
        dto.put("exportParams", exportParams);
        dto.put("exportUserinfo", exportUserinfo);
        dto.put("isSubPage", isSubPage);
        dto.put("pageLoadMsg", WebUtils.getParamValue("PAGE_LOAD_MSG", request));
        String titleIcon = WebUtils.getParamValue("TITLE_ICON", request);
        dto.put("titleIcon", G4Utils.isEmpty(titleIcon) ? "eredg4.ico" : titleIcon);
        if (exportParams.equals("true")) {
            dto.put("paramList", WebUtils.getParamList(request));
        }
        //String agent = request.getHeader("user-agent");
        //dao.put("firefox", agent.indexOf("Firefox") == -1 ? "false" : "true");
        // 关闭  by chenqiaoming
        PropertiesHelper p = PropertiesFactory.getPropertiesHelper(PropertiesFile.G4);
        dto.put("extMode", p.getValue("extMode", TagConstant.Ext_Mode_Run));
        dto.put("runMode", p.getValue("runMode", TagConstant.RUN_MODE_NORMAL));
        Dto themeDto = new BaseDto();
        Dto resultDto = new BaseDto();
        if (G4Utils.isNotEmpty(userInfo)) {
            themeDto.put("userid", userInfo.getUserid());
            resultDto = armTagSupportService.getEauserSubInfo(themeDto);
        }
        String theme = null;
        if (G4Utils.isNotEmpty(resultDto))
            theme = resultDto.getAsString("theme");
        String defaultTheme = WebUtils.getParamValue("SYS_DEFAULT_THEME", request);
        theme = G4Utils.isEmpty(theme) ? defaultTheme : theme;
        dto.put("theme", theme);
        TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new FileTemplate();
        template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
        StringWriter writer = engine.mergeTemplate(template, dto);
        try {
            pageContext.getOut().write(writer.toString());
        } catch (IOException e) {
            log.error(G4Constants.Exception_Head + e.getMessage());
            e.printStackTrace();
        }
        return super.EVAL_BODY_INCLUDE;
    }

    /**
     * 标签结束
     */
    public int doEndTag() throws JspException {
        try {
            pageContext.getOut().write("</html>");
        } catch (IOException e) {
            log.error(G4Constants.Exception_Head + e.getMessage());
            e.printStackTrace();
        }
        return super.EVAL_PAGE;
    }

    /**
     * 释放资源
     */
    public void release() {
        extDisabled = null;
        title = null;
        jqueryEnabled = null;
        uxEnabled = null;
        fcfEnabled = null;
        doctypeEnable = null;
        exportParams = null;
        exportUserinfo = null;
        isSubPage = null;
        urlSecurity2 = null;
        super.release();
    }

    public void setExtDisabled(String extDisabled) {
        this.extDisabled = extDisabled;
    }

    public void setJqueryEnabled(String jqueryEnabled) {
        this.jqueryEnabled = jqueryEnabled;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setShowLoading(String showLoading) {
        this.showLoading = showLoading;
    }

    public void setUxEnabled(String uxEnabled) {
        this.uxEnabled = uxEnabled;
    }

    public String getFcfEnabled() {
        return fcfEnabled;
    }

    public void setFcfEnabled(String fcfEnabled) {
        this.fcfEnabled = fcfEnabled;
    }

    public void setDoctypeEnable(String doctypeEnable) {
        this.doctypeEnable = doctypeEnable;
    }

    public void setExportParams(String exportParams) {
        this.exportParams = exportParams;
    }

    public void setExportUserinfo(String exportUserinfo) {
        this.exportUserinfo = exportUserinfo;
    }

    public void setIsSubPage(String isSubPage) {
        this.isSubPage = isSubPage;
    }

    public void setUrlSecurity2(String urlSecurity2) {
        this.urlSecurity2 = urlSecurity2;
    }

    public void setExportExceptionWindow(String exportExceptionWindow) {
        this.exportExceptionWindow = exportExceptionWindow;
    }
}
