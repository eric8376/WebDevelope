/**
 * 
 */
package com.microwill.framework.web.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.ErrorHelper;
import com.microwill.framework.vo.mobile.MobileResult;

/**
 * @author lizhen
 *
 */
public class WebUtil {
    private static  Logger log = LoggerFactory.getLogger(WebUtil.class);
    public static boolean isDebugMode(HttpServletRequest request){
	Boolean debugMode=(Boolean)WebUtil.getSessionAttribute(request, CommonConstant.SESSION_KEY_DEBUGMODE);
        return debugMode==null?false:debugMode;
    }
    /**
     * 获取报文数据
     * 
     * @return
     * @throws Exception
     */
    public static String getRawPostBody(HttpServletRequest request) throws Exception {
	StringBuffer info = new java.lang.StringBuffer();
	InputStream in = request.getInputStream();
	BufferedInputStream buf = new BufferedInputStream(in);
	byte[] buffer = new byte[1024];
	int iRead;
	while ((iRead = buf.read(buffer)) != -1) {
	    info.append(new String(buffer, 0, iRead, "UTF-8"));
	}
	log.info("从请求中获取传入的json：{}" + info.toString());
	return info.toString();
    }
    /**
     * @param request
     * @param name
     * @return
     */
    public static Object getSessionAttribute(HttpServletRequest request,String name) {
   	HttpSession session = request.getSession(false);
   	return (session != null ? session.getAttribute(name) : null);
    }
    /**
     * @param request
     * @param name
     * @param obj
     */
    public static void setSessionAttribute(HttpServletRequest request, String name,
	    Object obj) {
	HttpSession session = request.getSession();
	session.setAttribute(name, obj);
    }


    
    /**
     * @param request
     * @param name
     */
    public static void removeSessionAttribute(HttpServletRequest request,String name) {
	HttpSession session = request.getSession(false);
	if (session != null) {
	    session.removeAttribute(name);
	}

    }
    
    /**
     * @param request
     */
    public static void invalidateSession(HttpServletRequest request) {
	HttpSession session = request.getSession(false);
	if (session != null) {
	    session.invalidate();
	}

    }
    /**
     * @param key
     * @param value
     * @param response
     */
    public static void createCookie(String key, String value,
	    HttpServletResponse response) {
	Cookie cookie = new Cookie(key, URLEncoder.encode(value));
	cookie.setMaxAge(365 * 24 * 60 * 60);
	cookie.setPath("/");
	response.addCookie(cookie);
    }

    /**
     * @param key
     * @param response
     */
    public static void removeCookie(String key, HttpServletResponse response) {
	Cookie cookie = new Cookie(key, null);
	cookie.setMaxAge(0);
	cookie.setPath("/");
	response.addCookie(cookie);
    }
    /**
     * @param key
     * @return
     */
    public static String getCookie(HttpServletRequest request,String key) {
  	Cookie[] cookies = request.getCookies();
  	if (cookies != null && cookies.length > 0) {
  	    for (int i = 0; i < cookies.length; i++) {
  		if (cookies[i].getName().equals(key)) {
  		    return URLDecoder.decode(cookies[i].getValue());
  		}
  	    }
  	}
  	return null;
      }
//    /**
//     * @param response
//     * @param msg
//     */
//    public static void outputAppErrorResult(HttpServletResponse response, String msg) {
//   	Map<String, Object> map = new HashMap<String, Object>();
//   	MobileResult result = new MobileResult();
//   	result.setCode(101);
//   	result.setError(msg);
//   	WebUtil.ouputWithJson(response, result);
//       }
//    /**
//     * @param response
//     * @param responseObject
//     */
//    public static void ouputWithJson(HttpServletResponse response,
//	    Object responseObject) {
//	JSONObject responseJSONObject = JSONObject.fromObject(responseObject);
//	response.setCharacterEncoding("UTF-8");
//	response.setContentType("application/json; charset=utf-8");
//	PrintWriter out = null;
//	try {
//	    out = response.getWriter();
//	    out.append(responseJSONObject.toString());
//	} catch (IOException e) {
//	    log.error(ErrorHelper.debugException(e));
//	} finally {
//	    if (out != null) {
//		out.close();
//	    }
//	}
//    }
    /**
     * @param response
     * @param url
     * @throws Exception
     */
    public static void outputJSRedirect(HttpServletResponse response, String url)
	    throws Exception {
	response.setContentType("text/html");
	response.getWriter().print(
		"<script>top.location.href='" + url + "';</script>");
    }
    
    /**
     * @param request
     * @return
     */
    public static boolean isAsync(HttpServletRequest request) {
   	String toUrl = request.getRequestURL().toString();
   	return toUrl.indexOf(".json") > 0;
       }
    
    /**
     * @param request
     * @return
     */
    public static Map<String, String[]> getRequestParam(HttpServletRequest request){
	return new HashMap<>(
		    request.getParameterMap());
    }
    /**
     * @param request
     * @param keyList
     * @return
     */
    public static Map<String,String> getHeaderMap(HttpServletRequest request,List<String> keyList) {
	Map<String,String> headerMap=new HashMap<String,String>();
	Enumeration<String> enumeration=request.getHeaderNames();
	while(enumeration.hasMoreElements()){
	    String headerKey=enumeration.nextElement();
	    if (keyList.contains(headerKey)) {
		headerMap.put(headerKey, request.getHeader(headerKey));
	    }
	}
	return headerMap;
    }
    /**
     * 如果有的话过滤掉spring的redirect指令，并加上绝对路径
     * @param url
     * @return
     */
    public static String getFullUrl(String url,HttpServletRequest request){
	String contextPath = request.getContextPath();
	if (url.indexOf(":") < 0) {
	    return contextPath + url;
	}
	return contextPath + url.split(":")[1];
    }
    /**
     * 判断URL是否匹配支持占位符
     * @param urlList
     * @param givenUrl
     * @return
     */
    public static boolean isUrlListContain(List<String> urlList,String givenUrl){
	
	for(String toMatch:urlList){
	   
	    if(toMatch.equals(givenUrl)){
		//log.info("url:{}匹配:{}",givenUrl,toMatch);
		return true;
	    }else if(toMatch.contains("{")&&toMatch.contains("}")){
		String prefix=toMatch.split("\\{")[0];
		String suffix=toMatch.split("\\}")[1];
		boolean isMatch=givenUrl.contains(prefix)&&givenUrl.contains(suffix);
		if(isMatch){
		//log.info("url:{}占位匹配:{};前缀:{};后缀:{}",new Object[]{givenUrl,toMatch,prefix,suffix});
		return true;
		}
		
	    }
	}
	log.debug("对url:{}进行匹配,失败.",givenUrl);
	return false;
    }
    public static String getURI(HttpServletRequest request){
    	String uri=request.getRequestURI();
    	if(request.getRequestURI().startsWith(request.getContextPath())){
    		int begin=request.getRequestURI().indexOf(request.getContextPath())+request.getContextPath().length();
    		uri=uri.substring(begin);
    	}
	return uri;
    }
    
}
