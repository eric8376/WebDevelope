/**
 * 
 */
package com.microwill.framework.web.interceptor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsonorg.JsonOrgModule;
import com.microwill.framework.CommonConstant;
import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.util.MD5;
import com.microwill.framework.web.AppBaseController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.framework.web.util.WebUtil;

/**
 * 访问拦截器
 * @author Administrator
 * 
 */
public class AccessInterceptor implements HandlerInterceptor {

	 protected Logger log = LoggerFactory.getLogger(this.getClass());

	public AccessInterceptor() {
		// TODO Auto-generated constructor stub
	}

	private String mappingURL;// 利用正则映射到需要拦截的路径

	public void setMappingURL(String mappingURL) {
		this.mappingURL = mappingURL;
	}

	/**
	 * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
	 * 
	 * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
	 * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
	 */

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
	
		if (handler instanceof HandlerMethod) {
		    HandlerMethod method = (HandlerMethod) handler;
		  //APP的数据预处理
		    if(isAppController(method)){
			doExtractDatagram(request);
		    }
		    if(method.getMethodAnnotation(NotLogin.class) != null){
				return true;
			    }
		    
		    }
		
		Map loginedUser = (Map) request.getSession().getAttribute(LoginHelper.TOKEN);
		if (null==loginedUser) {
			outputJSRedirect(response, LoginHelper.getRootPathOfContext(request));
			return false;

		}
		return true;
	}
	 private boolean isAppController(HandlerMethod method) {
			Object controller = method.getBean();
			if (controller != null && controller instanceof AppBaseController) {
			    return true;
			}
			return false;

	 }
	private void doExtractDatagram(HttpServletRequest request) {
		//获取报文体
		String datagrams = "";
		JSONObject obj = null;
		try {
		    datagrams = WebUtil.getRawPostBody(request);
		} catch (Exception e) {
		    log.warn("报文获取失败，无法从输入流中获取报文.");
		}
		
		try {
		  //校验报文
				String hashCode=request.getHeader(CommonConstant.HEADER_KEY_MOBILE_HASHCODE);
		        if(false&&!hashCode.equals(MD5.convertSHA(datagrams+"gigamore"))){
			    log.warn("报文哈希校验错误,非法报文.请求哈希值为{}",hashCode);
			}else{
			    ObjectMapper om=new ObjectMapper();
			    om.registerModule(new JsonOrgModule());
			    obj=om.readValue(datagrams, JSONObject.class);
			   // obj = JSONObject.fromString(datagrams);
			}
		} catch (Exception e) {
		    // 报文出错
		    log.warn("报文格式转换出错，报文内容["+datagrams+"].");

		}
		request.setAttribute(CommonConstant.MOBILE_DATAGRAM, obj);
		//从头部中取得版本号
		Integer intVersionOfHeader=null;
		String versionOfHeader=request.getHeader(CommonConstant.HEADER_KEY_MOBILE_VERSION);
	  	if(StringUtils.isEmpty(versionOfHeader)){
	  	    log.error("APP 请求中头部的版本号错误.版本号:{}.不能为空.",versionOfHeader);
	  	}
	  	try{
	  	   intVersionOfHeader=Integer.valueOf(versionOfHeader);
	  	}catch(NumberFormatException e){
	  	  log.error("APP 请求中头部的版本号错误.版本号:{}.必须是整形字符串",versionOfHeader);
	  	}
		request.setAttribute(CommonConstant.MOBILE_HEADER_VERSION, intVersionOfHeader);

	    }
	private void outputJSRedirect(HttpServletResponse response, String site)
			throws Exception {
		response.setContentType("text/html");
		response.getWriter().print(
				"<script>top.location.href='" + site + "';</script>");
	}

	// 在业务处理器处理请求执行完成后,生成视图之前执行的动作

	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		preHandle(request,response,handler);

	}

	/**
	 * 在DispatcherServlet完全处理完请求后被调用
	 * 
	 * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()
	 */

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}