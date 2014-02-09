package com.microwill.framework;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.aop.ThrowsAdvice;

import com.microwill.framework.enums.SysLogEnum;

/**
 * @author lizhen
 *
 */
public class ExceptionHandler implements ThrowsAdvice {

	protected Log log = LogFactory.getLog(this.getClass());

	/**
	 * 对异常的处理.
	 * 
	 * @param method
	 * @param args
	 * @param target
	 * @param ex
	 * @throws Throwable
	 */
	public void afterThrowing(Method method, Object[] args, Object target,
			Exception ex) throws Throwable {
		logErrorMessage(method, args, target, ex);
	}

    /**
     * 对服务层抛出的异常进行记录
     * @param method
     * @param args
     * @param target
     * @param ex
     */
    private void logErrorMessage(Method method, Object[] args, Object target,
	    Exception ex) {
	try {
	    Map<String,Object> token = new HashMap<String,Object>();
	    HashMap<String, Object> params = new HashMap<>();
	    String msg = ex.getMessage();
	    String exceptionStack = ErrorHelper.debugException(ex);
	    params.put("ExceptionMsg", msg);
	    params.put("ExceptionStack", exceptionStack);
	    SystemBuffer.logger.log(token, SysLogEnum.ServiceException, params);
	    log.error(method.getName() + "方法出错：", ex);
	} catch (Exception e) {
	    log.error("[服务层日志记录器]-发生异常");
	    log.error(e);
	}
    }
}
