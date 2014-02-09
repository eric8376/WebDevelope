package com.microwill.framework.syslog;

import java.util.Map;
import java.util.Timer;
import java.util.concurrent.LinkedBlockingDeque;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.microwill.framework.enums.SysLogEnum;



@Component
public class Logger implements ISysLogger{
    	
    	
	protected final static Log log = LogFactory.getLog(Logger.class);

	private final LinkedBlockingDeque<Element> syslogDeque;

	private final Worker worker;

	private final Timer timer;

	public Logger() {
		syslogDeque = new LinkedBlockingDeque();
		worker = new Worker(syslogDeque);
		timer = new Timer("系统日志入库线程");
		timer.schedule(worker, 1000, 1000);
	}

	@Override
	public void log(Map<String,Object>  token, SysLogEnum event, Map<String, Object> params){
		if(token == null) {
			log.warn("没有登录用户的Token信息(token)！");
		}
		if(event == null) {
			log.warn("没有系统日志的时间信息(event)，无法写入系统日志！");
			return;
		}
		try {
			syslogDeque.put(new Element(token, event, params));
		}catch (Exception e) {
			log.warn("将系统日志信息加入等待队列时出错！", e);
		}
	}
}
