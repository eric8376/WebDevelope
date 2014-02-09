package com.microwill.framework.syslog;

import java.util.Map;

import com.microwill.framework.enums.SysLogEnum;

public interface ISysLogger {

	/**
	 * 记录系统日志
	 * @param token		令牌
	 * @param event		事件
	 * @param params	Controller方法调用的参数(Model不需要)
	 */
	public void log(Map<String,Object>  token, SysLogEnum event, Map<String, Object> params);

}
