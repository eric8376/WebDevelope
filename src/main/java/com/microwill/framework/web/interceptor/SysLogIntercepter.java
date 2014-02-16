package com.microwill.framework.web.interceptor;



import static com.microwill.framework.CommonConstant.EXTEND_SYS_LOG;
import static com.microwill.framework.CommonConstant.HTTP_REQUEST_HEADER;
import static com.microwill.framework.CommonConstant.HTTP_REQUEST_IP;
import static com.microwill.framework.CommonConstant.HTTP_REQUEST_PARAM;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.SystemBuffer;
import com.microwill.framework.annotation.SysLog;
import com.microwill.framework.enums.SysLogEnum;
import com.microwill.framework.web.util.LoginHelper;


/**
 * <pre>
 * 操作日志拦截记录器.
 * <p>
 * 
 * 
 * </pre>
 * 
 * @author lizhen
 */
public class SysLogIntercepter extends HandlerInterceptorAdapter {

    private Log log = LogFactory.getLog(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request,
	    HttpServletResponse response, Object handler) throws Exception {
	return super.preHandle(request, response, handler);
    }
    @Override
    public void postHandle(HttpServletRequest request,
	    HttpServletResponse response, Object handler,
	    ModelAndView modelAndView) throws Exception {
	if (handler instanceof HandlerMethod) {
	    try {

		HandlerMethod method = (HandlerMethod) handler;
		Map<String, Object> logContext = new HashMap<String, Object>();
		if (method.getMethodAnnotation(SysLog.class) != null) {
		    SysLog sysLog = method.getMethodAnnotation(SysLog.class);
		    SysLogEnum logEnum = sysLog.value();
		    Map<String,Object> token = LoginHelper.getToken(request);
		    Map<String, String[]> requestParam = new HashMap<>(
			    request.getParameterMap());
		    //logContext.put(EXTEND_SYS_LOG, request.getAttribute(EXTEND_SYS_LOG));
		    logContext.put(HTTP_REQUEST_PARAM, requestParam);
		    Map<String, String> requestHeader = getHeaderMap(request);
		    logContext.put(HTTP_REQUEST_HEADER, requestHeader);
		
		  
		    
		    SystemBuffer.logger.log(token, logEnum, logContext);
		}
	    } catch (Exception e) {
		log.error("日志拦截器[组装日志出错]");
		log.error(e);
	    }
	}
	

    }

   
  
    private Map<String,String> getHeaderMap(HttpServletRequest request) {
	String headerInclude="referer,cookie,user-agent";
	Map<String,String> headerMap=new HashMap<String,String>();
	Enumeration<String> enumeration=request.getHeaderNames();
	while(enumeration.hasMoreElements()){
	    String headerKey=enumeration.nextElement();
	    if (headerInclude.indexOf(headerKey) > 0) {
		headerMap.put(headerKey, request.getHeader(headerKey));
	    }
	}
	return headerMap;
    }
    private boolean isAsync(HttpServletRequest request) {
   	String toUrl = request.getRequestURL().toString();
   	return toUrl.indexOf(".json") > 0;
       }
    @Override
    public void afterCompletion(HttpServletRequest request,
	    HttpServletResponse response, Object handler, Exception ex)
	    throws Exception {

	
	super.afterCompletion(request, response, handler, ex);
    }

}
