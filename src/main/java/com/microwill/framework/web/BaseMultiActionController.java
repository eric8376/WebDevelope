/*
 * @(#)com.microwill.pipeline.web.BaseMultiActionController.java
 * Date:  06-Sep-2010
 * Copyright 2010  中兴软创版权所有 违者必究 
 */

package com.microwill.framework.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.ui.Model;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.ErrorHelper;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.framework.web.util.ResponseUtil;

/**
 * @author <a href=""></a>
 * @version 1.0 06-Sep-2010
 */
public class BaseMultiActionController extends MultiActionController {

	private ResourceBundleMessageSource messageSource;

	protected Logger log = LoggerFactory.getLogger(this.getClass());

	protected static final String ACT_TYPE_ADD = "add";
	protected static final String ACT_TYPE_DELETE = "delete";
	protected static final String ACT_TYPE_UPDATE = "update";
	protected static final String ACT_TYPE = "actType";

	public BaseMultiActionController() {

	}

	public void setMessageSource(ResourceBundleMessageSource messageSource) {
		this.messageSource = messageSource;
	}

	/**
	 * Method to flush a String as response.
	 * 
	 * @param response
	 * @param responseContent
	 * @throws IOException
	 */
	protected void flushResponse(HttpServletResponse response,
			String responseContent) throws IOException {
		// response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=utf-8");
		PrintWriter writer = response.getWriter();
		// response.setContentLength(responseContent.length());
		writer.write(responseContent);
		writer.flush();
		writer.close();
	}

	/**
	 * 输出XML文档
	 * 
	 * @param response
	 *            `
	 * @param xml
	 * @throws Exception
	 */
	public void outputXML(HttpServletResponse response, String xml)
			throws Exception {

		response.setContentType("text/xml; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.write(xml);
		out.flush();
		out.close();
	}

	public void outputJSON(HttpServletResponse response, String json)
			throws Exception {

		ResponseUtil.outputJSON(response, json);
	}

	public void responseOutWithJson(HttpServletResponse response,
			Object responseObject) {

		ResponseUtil.responseOutWithJson(response, responseObject);
	}

	protected Map getToken(HttpServletRequest request) {
		return (Map) request.getSession().getAttribute(LoginHelper.TOKEN);
	}

	protected HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
	}

	public void setSessionAttribute(String name, Object obj) {
		HttpSession session = getRequest().getSession();
		session.setAttribute(name, obj);
	}

	public Object getSessionAttribute(String name) {
		HttpSession session = getRequest().getSession(false);
		return (session != null ? session.getAttribute(name) : null);
	}

	public void removeSessionAttribute(String name) {
		HttpSession session = getRequest().getSession(false);
		if (session != null) {
			session.removeAttribute(name);
		}

	}

	public void invalidateSession() {
		HttpSession session = getRequest().getSession(false);
		if (session != null) {
			session.invalidate();
		}

	}
	 /**
     * 获取web项目根路径
     * 
     * @return
     */
    protected String getWebRoot() {
	HttpServletRequest request = this.getRequest();
	// 得到协议如：http
	String scheme = request.getScheme();
	// 得到服务器名称如：127.0.0.1
	String serverName = request.getServerName();
	// 得到端口号如8080
	String serverPort = request.getServerPort() == 80 ? "" : (":" + request
		.getServerPort());
	// 得到当前上下文路径，也就是安装后的文件夹位置。
	String contextPath = request.getContextPath().equals("/") ? ""
		: request.getContextPath();
	// 连起来拼成完整的url
	String webRoot = scheme + "://" + serverName + serverPort + contextPath
		+ "/";
	return webRoot;
    }
    public void error(Exception e,Model model,Object result){
    	if(result==null&&model!=null){//页面渲染类方法
    	    //虽然ServiceException已经取过一次消息，但是一般异常没有处理，所以统一在处理一次
    	    model.addAttribute(CommonConstant.ERROR_CODE_KEY,
    	                 "系统异常");
    	}else if(result instanceof Result){
    	    ((Result) result).setSuccess(false);
    	    ((Result) result).setMsg("系统异常");
    	    
    	}else{
    	    log.error("[result error]Unsupport result type.");
    	}
    	 log.error(ErrorHelper.debugException(e));
        }
}
