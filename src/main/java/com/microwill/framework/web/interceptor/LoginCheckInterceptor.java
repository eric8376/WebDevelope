/**
 * 
 */
package com.microwill.framework.web.interceptor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.annotation.NotLogin;
import com.microwill.framework.web.util.LoginHelper;

/**
 * @author Administrator
 * 
 */
public class LoginCheckInterceptor implements HandlerInterceptor {

	private Logger log = Logger.getLogger(LoginCheckInterceptor.class);

	public LoginCheckInterceptor() {
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
		    if(method.getMethodAnnotation(NotLogin.class) != null){
				return true;
			    }
		    }
		Map loginedUser = (Map) request.getSession().getAttribute(LoginHelper.TOKEN);
		if (null==loginedUser) {
			outputJSRedirect(response, LoginHelper.getWholeInternalContext(request));
			return false;

		}
		return true;
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