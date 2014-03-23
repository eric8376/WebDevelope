package com.microwill.framework.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

	public void sessionCreated(HttpSessionEvent httpSessionEvent) {
		// LogFactory.getLog(this.getClass()).info("----sessionCreated----"+httpSessionEvent.getSession().getId());
	}

	public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
		// LogFactory.getLog(this.getClass()).info("----sessionDestroyed----"+httpSessionEvent.getSession().getId()+"----"+(httpSessionEvent.getSession().getAttribute(CommonConstant.USER_CONTEXT)==null));
	}
}