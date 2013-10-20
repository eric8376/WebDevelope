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
		token.put("relativeInernalContext", getRelativeInternalContext(request));
		token.put("wholeIneralContext", getWholeInternalContext(request));
		request.getSession().setAttribute(LoginHelper.TOKEN, token);

	}
	public static Map getToken(HttpServletRequest request) {
		return (Map) request.getSession().getAttribute(
				LoginHelper.TOKEN);
	}
	public static String getWholeInternalContext(HttpServletRequest request) {
		String wholeURL = request.getRequestURL().toString();
		String wholeIneralContext = wholeURL.substring(0,
				wholeURL.indexOf(request.getServletPath()));
		wholeIneralContext = wholeIneralContext
				+ getRelativeInternalContext(request);
		return wholeIneralContext;
	}

	public static String getRelativeInternalContext(HttpServletRequest request) {
		String[] contexts = request.getServletPath().split("/");
		String relativeInernalContext = "";
		if (contexts.length > 1) {
			relativeInernalContext = "/" + contexts[1];
		}
		return relativeInernalContext;
	}
}
