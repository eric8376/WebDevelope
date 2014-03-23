package com.microwill.framework.listener;

import java.lang.management.ManagementFactory;
import java.util.Iterator;
import java.util.Set;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.management.Query;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.microwill.framework.ApplicationContextHelper;
import com.microwill.framework.CommonConstant;
import com.microwill.framework.SystemBuffer;

public class WebContainerListener implements ServletContextListener {

	protected Log log = LogFactory.getLog(this.getClass());

	public WebContainerListener() {
		super();
	}

	public void contextInitialized(ServletContextEvent servletContextEvent) {
		SystemBuffer.init();

	}

	public void contextDestroyed(ServletContextEvent arg0) {

	}

	
}
