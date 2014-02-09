package com.microwill.framework.syslog;

import java.util.TimerTask;
import java.util.concurrent.LinkedBlockingDeque;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.microwill.framework.ApplicationContextHelper;
import com.microwill.framework.service.SysLogService;

public class Worker extends TimerTask {
	
	protected final static Log log = LogFactory.getLog(Worker.class);
	
	private final LinkedBlockingDeque<Element> syslogDeque;
	
	public Worker(LinkedBlockingDeque<Element> syslogDeque) {
		this.syslogDeque = syslogDeque;
	}
	
	public void run() {
		if(syslogDeque.isEmpty()) {
			return;
		}
		try {
			SysLogService sysLogService=ApplicationContextHelper.getBean( SysLogService.class );
			sysLogService.addLog(syslogDeque);
		}catch (Exception e) {
			log.error("将系统日志信息写入数据库出错！", e);
		}
	}
}
