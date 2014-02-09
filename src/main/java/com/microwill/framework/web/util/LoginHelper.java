/**
 * 
 */
package com.microwill.framework.web.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Administrator
 * 
 */
public class LoginHelper {
	public static final String TOKEN = "token";

	public static void doLogout(HttpServletRequest request) {
		request.getSession().invalidate();
	}

	public static void initSession(HttpServletRequest request, Map token) {
		token.put("relativeInernalContext", getSystemRootPath(request));//相对项目上下文如/BGM
		token.put("wholeIneralContext", getRootPathOfContext(request));//绝对项目上下文如http://localhost:8080/hospital/BGM
		request.getSession().setAttribute(LoginHelper.TOKEN, token);

	}
	public static Map getToken(HttpServletRequest request) {
		return (Map) request.getSession().getAttribute(
				LoginHelper.TOKEN);
	}
	/**
	 * 从请求的URL中截取其应用的根地址（一般是登录页面.
	 * 比如请求的URL是
	 * http://localhost:8080/hospital/bureau/workbench.spr
	 * 返回的是
	 * http://localhost:8080/hospital/bureau/
	 * @param request
	 * @return
	 */
	public static String getRootPathOfContext(HttpServletRequest request) {
		String wholeURL = request.getRequestURL().toString();
		String wholeIneralContext = wholeURL.substring(0,
				wholeURL.indexOf(request.getServletPath()));
		wholeIneralContext = wholeIneralContext
				+ getSystemRootPath(request);
		return wholeIneralContext;
	}

	/**
	 * 获取URL的Servelt Path
	 * 比如
	 * http://localhost:8080/hospital/bureau/workbench.spr
	 * 返回的是hospital
	 * http://localhost:8080/bureau/workbench.spr
	 * 返回的是“”
	 * 
	 * @param request
	 * @return
	 */
	public static String getSystemRootPath(HttpServletRequest request) {
		String[] contexts = request.getServletPath().split("/");
		String relativeInernalContext = "";
		if (contexts.length > 1) {
			relativeInernalContext = "/" + contexts[1];
		}
		return relativeInernalContext;
	}
}
