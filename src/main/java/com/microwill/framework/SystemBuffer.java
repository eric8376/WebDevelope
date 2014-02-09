package com.microwill.framework;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.microwill.framework.syslog.ISysLogger;

public class SystemBuffer {
	
	protected static Log log = LogFactory.getLog(SystemBuffer.class);
	
//
	public static ISysLogger logger = null;// 异步SysLog

	

	private SystemBuffer() {
	}

	public static synchronized void init() {
	
		logger = ApplicationContextHelper.getBean(ISysLogger.class);

	
	}
	
	
}
